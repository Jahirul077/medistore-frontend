"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, MapPin, Wallet, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";

import useCreateOrderMutation from "@/hooks/Orders/useCreateOrderMutation";
import useCreatePaymentMutation from "@/hooks/Payment/useCreatePaymentMutation";
import { clearCart } from "@/redux/slices/cartSlice";

export default function CheckoutContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const { user } = useSelector((state) => state.auth || {});

  const [paymentMethod, setPaymentMethod] = useState("card"); // "card", "cod"

  // Payment Mutation Hook
  const { mutate: createPayment, isPending: isPaymentPending } = useCreatePaymentMutation({
    onSuccess: (res) => {
      const paymentUrl = res?.data?.paymentUrl || res?.paymentUrl;
      dispatch(clearCart());
      toast.success("Order & Payment Session created! Redirecting to payment portal...");
      
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        router.push("/payment/success");
      }
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to initialize payment gateway. Please try again.");
    },
  });

  // Order Mutation Hook
  const { mutate: createOrder, isPending: isOrderPending } = useCreateOrderMutation({
    onSuccess: (res) => {
      const createdOrder = res?.data;
      const orderId = createdOrder?.id;

      if (!orderId) {
        toast.error("Order created but Order ID is missing.");
        return;
      }

      if (paymentMethod === "card") {
        const origin = window.location.origin;
        createPayment({
          orderId,
          successUrl: `${origin}/payment/success`,
          cancelUrl: `${origin}/payment/cancel`,
        });
      } else {
        dispatch(clearCart());
        toast.success(res?.message || "Order placed successfully!");
        router.push("/payment/success");
      }
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to place order. Please check item availability.");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: "",
      city: "Dhaka",
      zip: "1212",
    },
  });

  const isPending = isOrderPending || isPaymentPending;

  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const shipping = subtotal > 30 || subtotal === 0 ? 0 : 5.0;
  const total = subtotal + shipping;

  const onSubmit = (data) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty! Add products before checking out.");
      return;
    }

    const orderData = {
      shipping_Address: `${data.address}, ${data.city} - ${data.zip}`,
      items: cartItems.map((item) => ({
        SellerInventoryId: item.sellerInventoryId || item.inventories?.[0]?.id || item.id,
        quantity: Number(item.quantity || 1),
      })),
    };

    createOrder(orderData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Form */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-6">
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Shipping Address Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-teal-500" />
              Shipping Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  disabled={isPending}
                  {...register("fullName", { required: "Full name is required" })}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none transition-all ${
                    errors.fullName ? "border-rose-450 focus:border-rose-450 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:border-teal-500"
                  }`}
                />
                {errors.fullName && <span className="text-xs text-rose-500 font-semibold">{errors.fullName.message}</span>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +880 1712..."
                  disabled={isPending}
                  {...register("phone", { required: "Phone number is required" })}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none transition-all ${
                    errors.phone ? "border-rose-450 focus:border-rose-450 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:border-teal-500"
                  }`}
                />
                {errors.phone && <span className="text-xs text-rose-500 font-semibold">{errors.phone.message}</span>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Optional"
                  disabled={isPending}
                  {...register("email")}
                  className="w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none border-slate-200 dark:border-slate-800 focus:border-teal-500"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="House, Road, Block, Area"
                  disabled={isPending}
                  {...register("address", { required: "Address is required" })}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none transition-all ${
                    errors.address ? "border-rose-450 focus:border-rose-450 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:border-teal-500"
                  }`}
                />
                {errors.address && <span className="text-xs text-rose-500 font-semibold">{errors.address.message}</span>}
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka"
                  disabled={isPending}
                  {...register("city", { required: "City is required" })}
                  className="w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none border-slate-200 dark:border-slate-800 focus:border-teal-500"
                />
              </div>

              {/* ZIP */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ZIP Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1212"
                  disabled={isPending}
                  {...register("zip")}
                  className="w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none border-slate-200 dark:border-slate-800 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Wallet className="h-5 w-5 text-teal-500" />
              Payment Method
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label 
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "card" ? "border-teal-500 bg-teal-50/50 dark:bg-teal-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                {paymentMethod === "card" && <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-teal-500" />}
                <CreditCard className={`h-8 w-8 mb-2 ${paymentMethod === "card" ? "text-teal-500" : "text-slate-400"}`} />
                <span className={`text-sm font-bold ${paymentMethod === "card" ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>Online Payment (Stripe)</span>
              </label>

              <label 
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "cod" ? "border-teal-500 bg-teal-50/50 dark:bg-teal-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                {paymentMethod === "cod" && <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-teal-500" />}
                <Truck className={`h-8 w-8 mb-2 ${paymentMethod === "cod" ? "text-teal-500" : "text-slate-400"}`} />
                <span className={`text-sm font-bold ${paymentMethod === "cod" ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5 xl:col-span-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-xs sticky top-28 space-y-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Order Summary</h2>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-850 last:border-0 last:pb-0">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-455 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  ${((Number(item.price) || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span>Shipping Fee</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="pt-3 flex justify-between items-end border-t border-slate-100 dark:border-slate-800">
              <span className="text-base font-bold text-slate-900 dark:text-white">Total Amount</span>
              <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              form="checkout-form"
              variant="primary"
              disabled={isPending || cartItems.length === 0}
              icon={!isPending && <ArrowRight className="h-4 w-4" />}
              className="w-full h-12 rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              {isPending ? "Processing Order & Payment..." : "Place Order"}
            </Button>
            
            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs font-semibold text-slate-400">
              <ShieldCheck className="h-4 w-4 text-teal-500" />
              Secure 256-bit SSL Encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
