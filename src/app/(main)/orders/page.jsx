"use client";

import React from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import Image from "next/image";
import { Package, Clock, MapPin, ChevronRight, ShoppingBag } from "lucide-react";
import Button from "@/components/common/Button";
import useGetCustomerOrdersQuery from "@/hooks/Orders/useGetCustomerOrdersQuery";

export default function MyOrdersPage() {
  const { data: resData, isLoading, error } = useGetCustomerOrdersQuery();
  const orders = resData?.data || [];

  const getStatusBadge = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900";
      case "PLACED":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900";
      case "PROCESSING":
      case "SHIPPED":
        return "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border-teal-200 dark:border-teal-900";
      default:
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900";
    }
  };

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pt-28 pb-16">
      <Container>
        {/* Page Heading */}
        <div className="mb-8 border-b border-slate-200/50 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white md:text-4xl tracking-tight">
            My Orders
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Track and view history for all your medicine purchases.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            ))}
          </div>
        )}

        {/* Error / Empty State */}
        {!isLoading && (error || orders.length === 0) && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-xs space-y-4 max-w-md mx-auto">
            <div className="h-16 w-16 bg-teal-50 dark:bg-teal-950/40 rounded-full flex items-center justify-center mx-auto text-teal-500">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No Orders Found
            </h3>
            <p className="text-base text-slate-500 dark:text-slate-400">
              {error ? "Please sign in to view your orders." : "You haven't placed any orders yet."}
            </p>
            <Link href="/shop" className="inline-block pt-2">
              <Button variant="primary" size="md" className="cursor-pointer font-bold text-sm">
                Browse Shop Catalog
              </Button>
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!isLoading && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order) => {
              const formattedDate = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Recent";

              const itemCount = order.orderItems?.length || 0;
              const totalAmount = Number(order.totalAmount || 0).toFixed(2);

              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-teal-500/30 transition-all"
                >
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-mono font-extrabold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl">
                        Order #{order.id.slice(0, 8)}
                      </span>
                      <span
                        className={`text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status || "PLACED"}
                      </span>
                    </div>

                    {/* Item Thumbnails Preview */}
                    <div className="flex items-center gap-3 overflow-x-auto py-1">
                      {order.orderItems?.map((item) => {
                        const med = item.sellerInventory?.medicines;
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-955 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-850 shrink-0"
                          >
                            {med?.image && (
                              <Image
                                src={med.image}
                                alt={med?.title || "Item"}
                                width={40}
                                height={40}
                                unoptimized
                                className="h-10 w-10 object-contain rounded-lg"
                              />
                            )}
                            <div className="text-left">
                              <span className="text-sm font-extrabold text-slate-900 dark:text-white block truncate max-w-35">
                                {med?.title || "Medicine"}
                              </span>
                              <span className="text-xs text-slate-500 font-semibold block">
                                Qty: {item.quantity}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-teal-500" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Package className="h-4 w-4 text-teal-500" />
                        <span>{itemCount} item(s)</span>
                      </div>
                      <div className="flex items-center gap-1.5 max-w-sm truncate">
                        <MapPin className="h-4 w-4 text-teal-500 shrink-0" />
                        <span className="truncate">{order.shipping_Address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-850">
                    <div className="text-left md:text-right">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        Total Amount
                      </span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        ${totalAmount}
                      </span>
                    </div>

                    <Link href={`/orders/${order.id}`}>
                      <Button
                        variant="outline"
                        size="md"
                        icon={<ChevronRight className="h-4 w-4" />}
                        className="rounded-xl text-sm font-bold h-10 px-4 border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
