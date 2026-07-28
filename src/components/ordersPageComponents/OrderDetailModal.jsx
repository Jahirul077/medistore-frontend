"use client";

import React from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";

export default function OrderDetailModal({
  isOpen,
  onClose,
  activeOrder,
  onUpdateStatus,
}) {
  if (!isOpen || !activeOrder) return null;

  // ── Normalise API shape → internal shape ──────────────────────────────────
  // API uses: customer{name,email,phone}, orderItems[], shipping_Address,
  //           totalAmount (string), paymentStatus ("PENDING"/"COMPLETED")
  // Legacy mock uses: customer (string), items[], address, total (number),
  //                   paymentStatus ("Paid"/"Unpaid"), paymentMethod
  const isApiShape = Array.isArray(activeOrder.orderItems);

  const customerName = isApiShape
    ? activeOrder.customer?.name
    : activeOrder.customer;
  const customerEmail = isApiShape
    ? activeOrder.customer?.email
    : activeOrder.email;
  const customerPhone = isApiShape
    ? activeOrder.customer?.phone ?? "—"
    : activeOrder.phone;
  const shippingAddress = isApiShape
    ? activeOrder.shipping_Address
    : activeOrder.address;

  // Normalise items to { name, qty, price } shape
  const items = isApiShape
    ? (activeOrder.orderItems ?? []).map((item) => ({
        name: item.sellerInventory?.medicines?.title ?? "Unknown",
        qty: item.quantity,
        price: parseFloat(item.price ?? 0),
        seller: item.sellerInventory?.seller?.name,
        strength: item.sellerInventory?.medicines?.strength,
      }))
    : activeOrder.items ?? [];

  const totalVal = parseFloat(activeOrder.totalAmount ?? activeOrder.total ?? 0);

  // Payment
  const rawPayStatus = activeOrder.paymentStatus;
  const isPaid =
    rawPayStatus === "COMPLETED" || rawPayStatus === "Paid";
  const payStatusLabel = isPaid ? "Paid" : "Pending";
  const paymentMethod = isApiShape
    ? activeOrder.transactionId
      ? "Stripe (Online)"
      : activeOrder.paymentIntentId
      ? "Stripe (Initiated)"
      : "Cash / Pending"
    : activeOrder.paymentMethod;

  // Order status — normalise PLACED → Placed for display / comparison
  const rawStatus = activeOrder.status ?? "";
  const displayStatus =
    rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

  const placedDate = activeOrder.createdAt
    ? new Date(activeOrder.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : activeOrder.date;

  // Short order ID for display
  const shortId = activeOrder.id?.length > 15
    ? `…${activeOrder.id.slice(-8)}`
    : activeOrder.id;

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
              Order Details
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {activeOrder.id}
            </span>
            <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">
              · Placed on {placedDate}
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
          {/* Left Column */}
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Customer Information
              </h4>
              <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border dark:border-slate-800/60 space-y-3">
                <div className="flex items-center gap-2.5">
                  <User size={15} className="text-teal-500" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                      {customerName}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal truncate">
                      {customerEmail}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-teal-500" />
                  <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                    {customerPhone}
                  </span>
                </div>
                <div className="flex gap-2.5">
                  <MapPin
                    size={15}
                    className="text-teal-500 shrink-0 mt-0.5"
                  />
                  <span className="text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed">
                    {shippingAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Payment Details
              </h4>
              <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border dark:border-slate-800/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <CreditCard size={15} className="text-teal-500 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                      {paymentMethod}
                    </span>
                    {activeOrder.transactionId && (
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono truncate">
                        {activeOrder.transactionId}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wider shrink-0 ${
                    isPaid
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                      : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                  }`}
                >
                  {payStatusLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Order Items ({items.length})
              </h4>
              <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border dark:border-slate-800/60 divide-y divide-slate-100 dark:divide-slate-800/50 max-h-52 overflow-y-auto custom-scrollbar">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start justify-between py-2.5 gap-3 ${
                      index === 0 ? "pt-0" : ""
                    } ${index === items.length - 1 ? "pb-0" : ""}`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                        {item.name}
                      </span>
                      {item.strength && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                          {item.strength}
                        </span>
                      )}
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                        Qty: {item.qty} × ${(item.price || 0).toFixed(2)}
                      </span>
                      {item.seller && (
                        <span className="text-xs text-indigo-500 dark:text-indigo-400 mt-0.5">
                          via {item.seller}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 shrink-0">
                      ${((item.qty || 1) * (item.price || 0)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary Pricing */}
              <div className="mt-4 space-y-1.5 px-2">
                <div className="flex items-center justify-between text-base font-semibold text-slate-800 dark:text-white pt-2 border-t dark:border-slate-800/80">
                  <span>Total Amount</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">
                    ${totalVal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Fulfillment Controls */}
            <div className="pt-6 mt-6 border-t dark:border-slate-800/80">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Fulfillment Controls
                </span>
                <div className="flex gap-2">
                  {(displayStatus === "Placed" ||
                    displayStatus === "Pending") && (
                    <>
                      <button
                        onClick={() => {
                          onUpdateStatus(activeOrder.id, "CANCELLED");
                          onClose();
                        }}
                        className="flex-1 py-2 text-sm font-medium bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/30 rounded-xl cursor-pointer transition-all border border-rose-100 dark:border-rose-900"
                      >
                        Reject &amp; Cancel
                      </button>
                      <button
                        onClick={() => {
                          onUpdateStatus(activeOrder.id, "PROCESSING");
                          onClose();
                        }}
                        className="flex-1 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-xl cursor-pointer transition-all shadow-md shadow-teal-500/10"
                      >
                        Accept &amp; Process
                      </button>
                    </>
                  )}
                  {displayStatus === "Processing" && (
                    <button
                      onClick={() => {
                        onUpdateStatus(activeOrder.id, "SHIPPED");
                        onClose();
                      }}
                      className="w-full py-2.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl cursor-pointer transition-all shadow-md"
                    >
                      Ship Prescription Package
                    </button>
                  )}
                  {displayStatus === "Shipped" && (
                    <button
                      onClick={() => {
                        onUpdateStatus(activeOrder.id, "DELIVERED");
                        onClose();
                      }}
                      className="w-full py-2.5 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl cursor-pointer transition-all shadow-md"
                    >
                      Confirm Delivery Complete
                    </button>
                  )}
                  {displayStatus === "Delivered" && (
                    <div className="w-full py-2 px-3 text-sm font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl text-center flex items-center justify-center gap-1.5 border border-emerald-100 dark:border-emerald-900">
                      <CheckCircle size={14} />
                      <span>Order Completed and Settled</span>
                    </div>
                  )}
                  {displayStatus === "Cancelled" && (
                    <div className="w-full py-2 px-3 text-sm font-medium bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl text-center flex items-center justify-center gap-1.5 border border-rose-100 dark:border-rose-900">
                      <XCircle size={14} />
                      <span>Order Cancelled &amp; Refused</span>
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
