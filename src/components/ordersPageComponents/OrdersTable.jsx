"use client";

import React from "react";
import { Eye, Clock, ShoppingBag, Truck, CheckCircle, XCircle, FileText } from "lucide-react";

export default function OrdersTable({ filteredOrders, onViewDetails, onUpdateStatus }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={14} className="text-amber-500" />;
      case "Processing":
        return <ShoppingBag size={14} className="text-sky-500" />;
      case "Shipped":
        return <Truck size={14} className="text-indigo-500" />;
      case "Delivered":
        return <CheckCircle size={14} className="text-emerald-500" />;
      case "Cancelled":
        return <XCircle size={14} className="text-rose-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b dark:border-slate-800/50">
              <th className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Order ID
              </th>
              <th className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total
              </th>
              <th className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/40 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {/* Order ID */}
                  <td className="py-4 px-6 text-base font-semibold text-slate-800 dark:text-slate-200">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-slate-800 dark:text-slate-200">
                        {order.customer}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {order.phone}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-sm font-normal text-slate-500 dark:text-slate-400">
                    {order.date}
                  </td>

                  {/* Payment Status */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {order.paymentMethod}
                      </span>
                      <span
                        className={`text-xs font-medium uppercase tracking-wider
                          ${order.paymentStatus === "Paid" ? "text-emerald-500" : "text-rose-500"}`}
                      >
                        ● {order.paymentStatus}
                      </span>
                    </div>
                  </td>

                  {/* Total Amount */}
                  <td className="py-4 px-6 text-base font-semibold text-teal-600 dark:text-teal-400">
                    ${order.total.toFixed(2)}
                  </td>

                  {/* Order Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider
                        ${
                          order.status === "Pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                            : order.status === "Processing"
                            ? "bg-sky-50 text-sky-600 dark:bg-sky-950/20 dark:text-sky-400"
                            : order.status === "Shipped"
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400"
                            : order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                        }`}
                    >
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </span>
                  </td>

                  {/* Action buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* View details */}
                      <button
                        onClick={() => onViewDetails(order)}
                        className="p-2 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-teal-50/50 dark:text-slate-400 dark:hover:text-teal-400 dark:hover:bg-teal-950/20 transition-all cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>

                      {/* Fast transition buttons */}
                      {order.status === "Pending" && (
                        <button
                          onClick={() => onUpdateStatus(order.id, "Processing")}
                          className="px-4 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-xl cursor-pointer transition-all active:scale-95 shadow-sm shadow-teal-500/10"
                        >
                          Accept
                        </button>
                      )}
                      {order.status === "Processing" && (
                        <button
                          onClick={() => onUpdateStatus(order.id, "Shipped")}
                          className="px-4 py-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl cursor-pointer transition-all active:scale-95 shadow-sm"
                        >
                          Ship
                        </button>
                      )}
                      {order.status === "Shipped" && (
                        <button
                          onClick={() => onUpdateStatus(order.id, "Delivered")}
                          className="px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl cursor-pointer transition-all active:scale-95 shadow-sm"
                        >
                          Deliver
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-12 px-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-10 w-10 text-slate-300 dark:text-slate-700" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      No orders match your filter criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
