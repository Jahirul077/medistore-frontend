"use client";

import React, { useState } from "react";
import {
  Search,
  Eye,
  ShoppingBag,
  CheckCircle,
  Truck,
  XCircle,
  Clock,
  ArrowRight,
  Filter,
  User,
  MapPin,
  Phone,
  CreditCard,
  FileText,
} from "lucide-react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";

// Mock Orders
const initialOrders = [
  {
    id: "ORD-9821",
    customer: "Amit Hasan",
    email: "amit.hasan@example.com",
    phone: "+880 1712-345678",
    address: "House 45, Road 12, Dhanmondi, Dhaka",
    date: "10 mins ago",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    items: [
      { name: "Paracetamol 500mg", qty: 3, price: 1.5 },
      { name: "Napa Extra", qty: 2, price: 5.0 },
    ],
    subtotal: 14.5,
    deliveryFee: 10.0,
    total: 24.5,
    status: "Pending",
  },
  {
    id: "ORD-9820",
    customer: "Sarah Khan",
    email: "sarah.k@example.com",
    phone: "+880 1911-223344",
    address: "Flat 4B, Building 9, Sector 4, Uttara, Dhaka",
    date: "1 hour ago",
    paymentMethod: "SSLCommerz (Online)",
    paymentStatus: "Paid",
    items: [
      { name: "Amoxicillin 250mg", qty: 1, price: 12.0 },
      { name: "Azithromycin 500mg", qty: 1, price: 30.0 },
    ],
    subtotal: 42.0,
    deliveryFee: 0.0,
    total: 42.0,
    status: "Processing",
  },
  {
    id: "ORD-9819",
    customer: "Rafiqul Islam",
    email: "rafiq.islam@example.com",
    phone: "+880 1515-998877",
    address: "24/A East Kazipara, Mirpur, Dhaka",
    date: "3 hours ago",
    paymentMethod: "Bkash (MFS)",
    paymentStatus: "Paid",
    items: [{ name: "Metformin 850mg", qty: 5, price: 1.18 }],
    subtotal: 5.9,
    deliveryFee: 10.0,
    total: 15.90,
    status: "Delivered",
  },
  {
    id: "ORD-9818",
    customer: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+880 1819-876543",
    address: "Green Road Staff Quarter, Kalabagan, Dhaka",
    date: "Yesterday",
    paymentMethod: "SSLCommerz (Online)",
    paymentStatus: "Paid",
    items: [
      { name: "Atorvastatin 10mg", qty: 2, price: 19.0 },
      { name: "Sergel 20mg", qty: 3, price: 16.66 },
    ],
    subtotal: 88.0,
    deliveryFee: 0.0,
    total: 88.0,
    status: "Delivered",
  },
  {
    id: "ORD-9817",
    customer: "Tanvir Ahmed",
    email: "tanvir.ahmed@example.com",
    phone: "+880 1312-445566",
    address: "House 18, Block C, Banani, Dhaka",
    date: "Yesterday",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    items: [{ name: "Lantus Solostar Insulin", qty: 1, price: 54.0 }],
    subtotal: 54.0,
    deliveryFee: 10.0,
    total: 64.0,
    status: "Shipped",
  },
  {
    id: "ORD-9816",
    customer: "Mehedi Hasan",
    email: "mehedi.h@example.com",
    phone: "+880 1616-554433",
    address: "Chittagong Road, Demra, Dhaka",
    date: "2 days ago",
    paymentMethod: "Bkash (MFS)",
    paymentStatus: "Paid",
    items: [{ name: "Vitamin C Chewable", qty: 2, price: 4.5 }],
    subtotal: 9.0,
    deliveryFee: 10.0,
    total: 19.0,
    status: "Cancelled",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusTab, setSelectedStatusTab] = useState("All");
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState("All");

  // Detail Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusTab === "All" || order.status === selectedStatusTab;

    const matchesPayment =
      selectedPaymentFilter === "All" ||
      order.paymentStatus === selectedPaymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Action: Transition order status
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedOrder = { ...ord, status: newStatus };
          // If delivered, mark payment status as paid for COD
          if (newStatus === "Delivered" && ord.paymentMethod === "Cash on Delivery") {
            updatedOrder.paymentStatus = "Paid";
          }
          // Update modal detail view if currently open
          if (activeOrder && activeOrder.id === orderId) {
            setActiveOrder(updatedOrder);
          }
          return updatedOrder;
        }
        return ord;
      })
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

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
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Order Management
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">
          Process prescriptions, track shipments, and update customer request states.
        </p>
      </div>

      {/* Tabs / Filters Navigation */}
      <div className="flex flex-col gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar shrink-0">
          {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((tab) => {
            const isActive = selectedStatusTab === tab;
            const count =
              tab === "All"
                ? orders.length
                : orders.filter((o) => o.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setSelectedStatusTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer border transition-all duration-200
                  ${
                    isActive
                      ? "bg-teal-500 border-teal-500 text-white shadow-md shadow-teal-500/10"
                      : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                  }`}
              >
                <span>{tab}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold
                    ${isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Filters Controls */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by Order ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-slate-200 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <Filter size={16} className="text-slate-400 dark:text-slate-500" />
            <select
              value={selectedPaymentFilter}
              onChange={(e) => setSelectedPaymentFilter(e.target.value)}
              className="h-11 w-full md:w-48 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="All">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Grid/Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800/50">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Total
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-805/50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Order ID */}
                    <td className="py-4 px-6 text-sm font-bold text-slate-800 dark:text-slate-200">
                      {order.id}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {order.customer}
                        </span>
                        <span className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">
                          {order.phone}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-xs font-semibold text-slate-450 dark:text-slate-550">
                      {order.date}
                    </td>

                    {/* Payment Status */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">
                          {order.paymentMethod}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider
                            ${order.paymentStatus === "Paid" ? "text-emerald-500" : "text-rose-500"}`}
                        >
                          ● {order.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-6 text-sm font-extrabold text-teal-650 dark:text-teal-400">
                      ${order.total.toFixed(2)}
                    </td>

                    {/* Order Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
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
                          onClick={() => {
                            setActiveOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-teal-50/50 dark:text-slate-450 dark:hover:text-teal-400 dark:hover:bg-teal-950/20 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Fast transition dropdown / shortcuts */}
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "Processing")}
                            className="px-3 py-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-lg cursor-pointer transition-all active:scale-95 shadow-sm shadow-teal-500/10"
                          >
                            Accept
                          </button>
                        )}
                        {order.status === "Processing" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "Shipped")}
                            className="px-3 py-1.5 text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg cursor-pointer transition-all active:scale-95 shadow-sm"
                          >
                            Ship
                          </button>
                        )}
                        {order.status === "Shipped" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "Delivered")}
                            className="px-3 py-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg cursor-pointer transition-all active:scale-95 shadow-sm"
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
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
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

      {/* Order Details Receipt Modal */}
      {isModalOpen && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl w-full max-w-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-50 dark:border-slate-800/80">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  Order Details: {activeOrder.id}
                </h3>
                <span className="text-[10px] text-slate-400 font-semibold">
                  Placed on {activeOrder.date}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
              >
                <XCircle size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Details & Shipment Address */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Customer Information
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <User size={15} className="text-teal-500" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-350">
                          {activeOrder.customer}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {activeOrder.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-teal-500" />
                      <span className="text-xs font-semibold text-slate-655 dark:text-slate-400">
                        {activeOrder.phone}
                      </span>
                    </div>
                    <div className="flex gap-2.5">
                      <MapPin size={15} className="text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-450 leading-relaxed">
                        {activeOrder.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Payment Details
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CreditCard size={15} className="text-teal-500" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {activeOrder.paymentMethod}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          Transaction via merchant API
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider
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
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Order Items
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 divide-y divide-slate-100 dark:divide-slate-800/50">
                    {activeOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between py-2 ${index === 0 ? "pt-0" : ""} ${
                          index === activeOrder.items.length - 1 ? "pb-0" : ""
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            Qty: {item.qty} × ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-850 dark:text-slate-200">
                          ${(item.qty * item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary Pricing */}
                  <div className="mt-4 space-y-1.5 px-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>Subtotal</span>
                      <span>${activeOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>Delivery Fee</span>
                      <span>
                        {activeOrder.deliveryFee === 0 ? "Free" : `$${activeOrder.deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-extrabold text-slate-800 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span>Total Amount</span>
                      <span className="text-teal-650 dark:text-teal-400">
                        ${activeOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Workflow Transitions Footer in Detail Drawer */}
                <div className="pt-6 mt-6 border-t border-slate-50 dark:border-slate-800/80">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Fulfillment Controls
                    </span>
                    <div className="flex gap-2">
                      {activeOrder.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(activeOrder.id, "Cancelled")}
                            className="flex-1 py-2 text-xs font-bold bg-rose-50 text-rose-600 dark:bg-rose-955/20 dark:text-rose-455 hover:bg-rose-100 dark:hover:bg-rose-950/30 rounded-xl cursor-pointer transition-all border border-rose-100 dark:border-rose-900"
                          >
                            Reject & Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(activeOrder.id, "Processing")}
                            className="flex-1 py-2 text-xs font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-xl cursor-pointer transition-all shadow-md shadow-teal-500/10"
                          >
                            Accept & Process
                          </button>
                        </>
                      )}
                      {activeOrder.status === "Processing" && (
                        <button
                          onClick={() => handleUpdateStatus(activeOrder.id, "Shipped")}
                          className="w-full py-2.5 text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl cursor-pointer transition-all shadow-md"
                        >
                          Ship Prescription Package
                        </button>
                      )}
                      {activeOrder.status === "Shipped" && (
                        <button
                          onClick={() => handleUpdateStatus(activeOrder.id, "Delivered")}
                          className="w-full py-2.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl cursor-pointer transition-all shadow-md"
                        >
                          Confirm Delivery Complete
                        </button>
                      )}
                      {activeOrder.status === "Delivered" && (
                        <div className="w-full py-2 px-3 text-xs font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl text-center flex items-center justify-center gap-1.5 border border-emerald-100 dark:border-emerald-900">
                          <CheckCircle size={14} />
                          <span>Order Completed and Settled</span>
                        </div>
                      )}
                      {activeOrder.status === "Cancelled" && (
                        <div className="w-full py-2 px-3 text-xs font-bold bg-rose-50 text-rose-600 dark:bg-rose-955/20 dark:text-rose-455 rounded-xl text-center flex items-center justify-center gap-1.5 border border-rose-100 dark:border-rose-900">
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
      )}
    </div>
  );
}
