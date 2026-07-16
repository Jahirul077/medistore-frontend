"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, ShoppingBag, CheckCircle, XCircle } from "lucide-react";

export default function RecentOrdersTable({ orders, onAcceptOrder }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={14} className="text-amber-500" />;
      case "Processing":
        return <ShoppingBag size={14} className="text-sky-500" />;
      case "Shipped":
        return <CheckCircle size={14} className="text-indigo-500" />;
      case "Delivered":
        return <CheckCircle size={14} className="text-emerald-500" />;
      case "Cancelled":
        return <XCircle size={14} className="text-rose-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            Recent Orders Log
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Process or accept orders instantly</p>
        </div>
        <Link
          href="/seller/orders"
          className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 flex items-center gap-1 hover:underline"
        >
          <span>View All Orders</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50 dark:border-slate-800/50">
              <th className="py-4 px-4 text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="py-4 px-4 text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-4 px-4 text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-4 px-4 text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Items
              </th>
              <th className="py-4 px-4 text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="py-4 px-4 text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-4 text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-4 px-4 text-base font-semibold text-slate-800 dark:text-slate-200">
                  {order.id}
                </td>
                <td className="py-4 px-4 text-base font-medium text-slate-700 dark:text-slate-300">
                  {order.customer}
                </td>
                <td className="py-4 px-4 text-sm font-normal text-slate-500 dark:text-slate-400">
                  {order.date}
                </td>
                <td className="py-4 px-4 text-sm font-normal text-slate-600 dark:text-slate-400 max-w-[200px] truncate">
                  {order.items}
                </td>
                <td className="py-4 px-4 text-base font-semibold text-teal-600 dark:text-teal-400">
                  {order.amount}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider
                      ${
                        order.status === "Pending"
                          ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                          : order.status === "Processing"
                          ? "bg-sky-50 text-sky-600 dark:bg-sky-950/20 dark:text-sky-400"
                          : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  {order.status === "Pending" ? (
                    <button
                      onClick={() => onAcceptOrder(order.id)}
                      className="px-4 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-xl cursor-pointer transition-all active:scale-95 shadow-sm shadow-teal-500/10"
                    >
                      Accept
                    </button>
                  ) : (
                    <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
                      Processed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
