"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ShoppingBag, ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";
import Button from "@/components/common/Button";
import { clearCart } from "@/redux/slices/cartSlice";
import useCreateOrderMutation from "@/hooks/Orders/useCreateOrderMutation";
import useCreatePaymentMutation from "@/hooks/Payment/useCreatePaymentMutation";

export default function CheckoutContainer() {
  const dispatch = useDispatch();
  const rawCartItems = useSelector((state) => state.cart?.cartItems);
  const cartItems = Array.isArray(rawCartItems) ? rawCartItems : [];
  const [paymentMethod, setPaymentMethod] = useState("card");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Create Order Mutation
  const { mutateAsync: createOrder, isPending: isOrdering } = useCreateOrderMutation();

  // Create Payment Mutation
  const { mutateAsync: createPayment, isPending: isPaying } = useCreatePaymentMutation();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const isPending = isOrdering || isPaying;

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      const fullShippingAddress = `${data.address}, ${data.city}${data.zip ? ` - ${data.zip}` : ""}`;
      
      const payloadItems = cartItems.map((item) => ({
        sellerInventoryId: item.sellerInventoryId || item.id,
        quantity: item.quantity,
      }));

      // Step 1: Create Order in backend
      const orderRes = await createOrder({
        shipping_Address: fullShippingAddress,
        items: payloadItems,
      });

      const orderData = orderRes?.data || orderRes;
      const orderId = orderData?.id;

      if (!orderId) {
        throw new Error(orderRes?.message || "Order creation failed.");
      }

      toast.success("Order placed successfully!");

      // Step 2: Handle Stripe Checkout redirect if payment method is "card"
      if (paymentMethod === "card") {
        toast.loading("Redirecting to Stripe payment gateway...");
        const paymentRes = await createPayment({ orderId });
        const checkoutUrl = paymentRes?.data?.url || paymentRes?.url;

        if (checkoutUrl) {
          dispatch(clearCart());
          window.location.href = checkoutUrl;
          return;
        }
      }

      // If COD or Fallback
      dispatch(clearCart());
      window.location.href = `/orders/${orderId}`;
    } catch (err) {
      toast.error(err?.message || "Checkout failed. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-5">
        <div className="h-20 w-20 bg-slate-50 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag size={36} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Your Cart is Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Add items to your cart before proceeding to checkout.
          </p>
        </div>
        <Link href="/shop" className="inline-block pt-2">
          <Button variant="primary" size="md" icon={<ArrowLeft size={16} />} className="cursor-pointer font-medium">
            Return to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Delivery Info & Payment Selection */}
      <div className="lg:col-span-7 space-y-6">
        {/* Shipping Form Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 rounded-2xl">
              <Truck size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Shipping Address</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Where should we deliver your medicine order?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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

        {/* Payment Method Selector Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 rounded-2xl">
              <CreditCard size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment Method</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select how you would like to pay for this order.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div
              onClick={() => setPaymentMethod("card")}
              className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                paymentMethod === "card"
                  ? "border-teal-500 bg-teal-50/30 dark:bg-teal-950/20"
                  : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
              }`}
            >
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-teal-500 bg-teal-500" : "border-slate-300"}`}>
                {paymentMethod === "card" && <div className="h-2 w-2 bg-white rounded-full" />}
              </div>
              <span className={`text-sm font-semibold ${paymentMethod === "card" ? "text-slate-900 dark:text-white" : "text-slate-600"}`}>Online Payment (Stripe)</span>
            </div>

            <div
              onClick={() => setPaymentMethod("cod")}
              className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                paymentMethod === "cod"
                  ? "border-teal-500 bg-teal-50/30 dark:bg-teal-950/20"
                  : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
              }`}
            >
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-teal-500 bg-teal-500" : "border-slate-300"}`}>
                {paymentMethod === "cod" && <div className="h-2 w-2 bg-white rounded-full" />}
              </div>
              <span className={`text-sm font-semibold ${paymentMethod === "cod" ? "text-slate-900 dark:text-white" : "text-slate-600"}`}>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Order Items Summary */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs sticky top-24">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Order Summary ({cartItems.length} items)
          </h3>

          {/* Cart Item Row List */}
          <div className="space-y-4 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3.5 pb-3 border-b border-slate-50 dark:border-slate-800/50">
                {item.image && (
                  <div className="h-12 w-12 bg-slate-50 dark:bg-slate-955 rounded-xl p-1 border border-slate-100 dark:border-slate-850 shrink-0 flex items-center justify-center">
                    <Image src={item.image} alt={item.title} width={44} height={44} unoptimized className="object-contain max-h-full" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{item.title}</h4>
                  <span className="text-[11px] text-slate-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Subtotal Calculations */}
          <div className="space-y-2.5 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Free</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-sm">
              <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
              <span className="font-extrabold text-teal-600 dark:text-teal-400 text-lg">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isPending}
            icon={<CheckCircle2 size={18} />}
            className="w-full h-12 rounded-2xl text-sm font-semibold shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            {isPending ? "Processing Order..." : paymentMethod === "card" ? "Proceed to Stripe Payment" : "Place Cash Order"}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-teal-500" />
            <span>256-bit Encrypted Secure Checkout</span>
          </div>
        </div>
      </div>
    </form>
  );
}
