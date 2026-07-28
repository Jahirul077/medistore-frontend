"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreditCard, Truck, MapPin, Wallet, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";

// Mock cart items for the summary
const MOCK_CART_ITEMS = [
  { id: 1, name: "Napa Extra 500mg", qty: 2, price: 1.25 },
  { id: 2, name: "Seclo 20mg Capsule", qty: 1, price: 3.50 },
  { id: 3, name: "Orsaline-N", qty: 5, price: 0.50 },
];

export default function CheckoutContainer() {
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod", "card", "mobile"
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      zip: "",
    },
  });

  // Calculate totals
  const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 2.00;
  const total = subtotal + shipping;

  const onSubmit = (data) => {
    setIsProcessing(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsProcessing(false);
      
      const orderPayload = {
        ...data,
        paymentMethod,
        total,
        items: MOCK_CART_ITEMS,
      };
      
      console.log("Order Placed:", orderPayload);

      toast.success("Order placed successfully! Your items are on the way.", {
        icon: "🎉",
        duration: 4000,
        style: {
          borderRadius: "16px",
          background: "#0d9488",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
        },
      });
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Shipping & Payment Form */}
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
                  {...register("email", { 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none transition-all ${
                    errors.email ? "border-rose-450 focus:border-rose-450 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:border-teal-500"
                  }`}
                />
                {errors.email && <span className="text-xs text-rose-500 font-semibold">{errors.email.message}</span>}
              </div>

              {/* Address */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="House, Road, Block, Area"
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
                  {...register("city", { required: "City is required" })}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none transition-all ${
                    errors.city ? "border-rose-450 focus:border-rose-450 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:border-teal-500"
                  }`}
                />
                {errors.city && <span className="text-xs text-rose-500 font-semibold">{errors.city.message}</span>}
              </div>

              {/* ZIP */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1212"
                  {...register("zip", { required: "ZIP code is required" })}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none transition-all ${
                    errors.zip ? "border-rose-450 focus:border-rose-450 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:border-teal-500"
                  }`}
                />
                {errors.zip && <span className="text-xs text-rose-500 font-semibold">{errors.zip.message}</span>}
              </div>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Wallet className="h-5 w-5 text-teal-500" />
              Payment Method
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cash on Delivery */}
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

              {/* Credit/Debit Card */}
              <label 
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "card" ? "border-teal-500 bg-teal-50/50 dark:bg-teal-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                {paymentMethod === "card" && <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-teal-500" />}
                <CreditCard className={`h-8 w-8 mb-2 ${paymentMethod === "card" ? "text-teal-500" : "text-slate-400"}`} />
                <span className={`text-sm font-bold ${paymentMethod === "card" ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>Card (Stripe)</span>
              </label>

              {/* Mobile Banking */}
              <label 
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "mobile" ? "border-teal-500 bg-teal-50/50 dark:bg-teal-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === "mobile"} onChange={() => setPaymentMethod("mobile")} />
                {paymentMethod === "mobile" && <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-teal-500" />}
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${paymentMethod === "mobile" ? "bg-pink-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                    <span className="text-[10px] font-black tracking-tighter">bKash</span>
                  </div>
                </div>
                <span className={`text-sm font-bold ${paymentMethod === "mobile" ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>Mobile Banking</span>
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5 xl:col-span-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-xs sticky top-28 space-y-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Order Summary</h2>
          
          {/* Item List */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {MOCK_CART_ITEMS.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-850 last:border-0 last:pb-0">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-450 mt-0.5">Qty: {item.qty}</p>
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span>Shipping Fee</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="pt-3 flex justify-between items-end border-t border-slate-100 dark:border-slate-800">
              <span className="text-base font-bold text-slate-900 dark:text-white">Total Amount</span>
              <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              type="submit"
              form="checkout-form"
              variant="primary"
              disabled={isProcessing}
              icon={!isProcessing && <ArrowRight className="h-4 w-4" />}
              className="w-full h-12 rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              {isProcessing ? "Processing..." : "Place Order"}
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
