"use client";

import React from "react";
import { X, User, Phone, MapPin, CreditCard, CheckCircle, XCircle } from "lucide-react";

export default function OrderDetailModal({ isOpen, onClose, activeOrder, onUpdateStatus }) {
  if (!isOpen || !activeOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl w-full max-w-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b dark:border-slate-800/80">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              Order Details: {activeOrder.id}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Placed on {activeOrder.date}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Details & Shipment Address */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Customer Information
              </h4>
              <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border dark:border-slate-800/60 space-y-3">
                <div className="flex items-center gap-2.5">
                  <User size={15} className="text-teal-500" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {activeOrder.customer}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                      {activeOrder.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-teal-500" />
                  <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                    {activeOrder.phone}
                  </span>
                </div>
                <div className="flex gap-2.5">
                  <MapPin size={15} className="text-teal-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed">
                    {activeOrder.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Payment Details
              </h4>
              <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border dark:border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard size={15} className="text-teal-500" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {activeOrder.paymentMethod}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                      Transaction via merchant API
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wider
                    ${activeOrder.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20" : "bg-rose-50 text-rose-600 dark:bg-rose-950/20"}`}
                >
                  {activeOrder.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Order Receipt breakdown */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Order Items
              </h4>
              <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border dark:border-slate-800/60 divide-y divide-slate-100 dark:divide-slate-800/50">
                {activeOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-2.5 ${index === 0 ? "pt-0" : ""} ${
                      index === activeOrder.items.length - 1 ? "pb-0" : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-550 dark:text-slate-400 font-normal mt-0.5">
                        Qty: {item.qty} × ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      ${(item.qty * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary Pricing */}
              <div className="mt-4 space-y-1.5 px-2">
                <div className="flex items-center justify-between text-sm text-slate-500 font-normal">
                  <span>Subtotal</span>
                  <span>${activeOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500 font-normal">
                  <span>Delivery Fee</span>
                  <span>
                    {activeOrder.deliveryFee === 0 ? "Free" : `$${activeOrder.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold text-slate-800 dark:text-white pt-2 border-t dark:border-slate-800/80">
                  <span>Total Amount</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">
                    ${activeOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Workflow Transitions Footer in Detail Drawer */}
            <div className="pt-6 mt-6 border-t dark:border-slate-800/80">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Fulfillment Controls
                </span>
                <div className="flex gap-2">
                  {activeOrder.status === "Pending" && (
                    <>
                      <button
                        onClick={() => onUpdateStatus(activeOrder.id, "Cancelled")}
                        className="flex-1 py-2 text-sm font-medium bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/30 rounded-xl cursor-pointer transition-all border border-rose-100 dark:border-rose-900"
                      >
                        Reject & Cancel
                      </button>
                      <button
                        onClick={() => onUpdateStatus(activeOrder.id, "Processing")}
                        className="flex-1 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-xl cursor-pointer transition-all shadow-md shadow-teal-500/10"
                      >
                        Accept & Process
                      </button>
                    </>
                  )}
                  {activeOrder.status === "Processing" && (
                    <button
                      onClick={() => onUpdateStatus(activeOrder.id, "Shipped")}
                      className="w-full py-2.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl cursor-pointer transition-all shadow-md"
                    >
                      Ship Prescription Package
                    </button>
                  )}
                  {activeOrder.status === "Shipped" && (
                    <button
                      onClick={() => onUpdateStatus(activeOrder.id, "Delivered")}
                      className="w-full py-2.5 text-sm font-medium bg-emerald-50 hover:bg-emerald-600 text-white dark:text-white rounded-xl cursor-pointer transition-all shadow-md"
                    >
                      Confirm Delivery Complete
                    </button>
                  )}
                  {activeOrder.status === "Delivered" && (
                    <div className="w-full py-2 px-3 text-sm font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-955/20 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl text-center flex items-center justify-center gap-1.5 border border-emerald-100 dark:border-emerald-900">
                      <CheckCircle size={14} />
                      <span>Order Completed and Settled</span>
                    </div>
                  )}
                  {activeOrder.status === "Cancelled" && (
                    <div className="w-full py-2 px-3 text-sm font-medium bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl text-center flex items-center justify-center gap-1.5 border border-rose-100 dark:border-rose-900">
                      <XCircle size={14} />
                      <span>Order Cancelled & Refused</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
