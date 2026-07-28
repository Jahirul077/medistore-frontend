"use client";

import React, { use } from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, MapPin, ShieldCheck } from "lucide-react";
import useGetOrderByIdQuery from "@/hooks/Orders/useGetOrderByIdQuery";

export default function OrderDetailsPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const { data: resData, isLoading, error } = useGetOrderByIdQuery(id);
  const order = resData?.data;

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pt-28 pb-16">
      <Container>
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-base font-bold text-slate-600 hover:text-teal-600 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1 text-teal-500" />
            Back to My Orders
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center animate-pulse space-y-4 border border-slate-100 dark:border-slate-800">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
            <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
            <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl mt-6" />
          </div>
        )}

        {/* Error / Not Found State */}
        {!isLoading && (error || !order) && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-xs space-y-4 max-w-md mx-auto">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Order Not Found
            </h3>
            <p className="text-base text-slate-500 dark:text-slate-400">
              {error ? "Failed to load order details." : "The requested order could not be found."}
            </p>
            <Link
              href="/orders"
              className="inline-block px-6 py-3 rounded-xl bg-teal-500 text-white font-bold text-base"
            >
              Back to My Orders
            </Link>
          </div>
        )}

        {/* Order Details Body */}
        {!isLoading && order && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Order Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-5">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 block uppercase tracking-wider">
                      Order Reference
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      #{order.id}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border border-teal-200 dark:border-teal-900">
                      {order.status || "PLACED"}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
                    Ordered Items ({order.orderItems?.length || 0})
                  </h3>

                  {order.orderItems?.map((item) => {
                    const medicine = item.sellerInventory?.medicines;
                    const priceVal = Number(item.price || item.sellerInventory?.price || 0);

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-5 py-4 border-b last:border-0 border-slate-100 dark:border-slate-850"
                      >
                        {medicine?.image && (
                          <div className="relative h-20 w-20 bg-slate-50 dark:bg-slate-955 rounded-2xl p-3 flex items-center justify-center border border-slate-100 dark:border-slate-850 shrink-0">
                            <Image
                              src={medicine.image}
                              alt={medicine?.title || "Medicine"}
                              width={60}
                              height={60}
                              unoptimized
                              className="object-contain max-h-14 max-w-full drop-shadow-xs"
                            />
                          </div>
                        )}

                        <div className="flex-1 space-y-1">
                          <h4 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                            {medicine?.title || "Medicine Item"}
                          </h4>
                          <p className="text-sm font-semibold text-slate-600 dark:text-slate-350">
                            {medicine?.genericName} • {medicine?.strength}
                          </p>
                          <span className="text-xs text-slate-400 block font-semibold">
                            Quantity: <span className="font-bold text-slate-800 dark:text-slate-200">{item.quantity}</span>
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xl font-black text-slate-900 dark:text-white block">
                            ${(priceVal * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold block">
                            ${priceVal.toFixed(2)} / unit
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side: Shipping & Summary Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Order Details
                </h3>

                <div className="space-y-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">
                      Delivery Address
                    </span>
                    <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-955 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-850">
                      <MapPin className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-semibold">{order.shipping_Address}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">
                      Placed On
                    </span>
                    <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-955 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-850">
                      <Clock className="h-5 w-5 text-teal-500 shrink-0" />
                      <span className="font-semibold">
                        {new Date(order.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 dark:border-slate-850 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      Total Paid Amount
                    </span>
                    <span className="text-3xl font-black text-teal-600 dark:text-teal-400">
                      ${Number(order.totalAmount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security guarantee */}
              <div className="bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-teal-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  Authentic medicines delivered with 100% safety & quality checks.
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
