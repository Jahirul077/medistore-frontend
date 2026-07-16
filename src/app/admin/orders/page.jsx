"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Eye, ShoppingBag, Truck, Check, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/common/Pagination";
import OrderDetailModal from "@/components/ordersPageComponents/OrderDetailModal";
import toast from "react-hot-toast";

// Mock global orders database
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
    sellerName: "MediStore Dhanmondi",
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
    sellerName: "Lazz Pharma Kakrail",
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
    sellerName: "MediStore Dhanmondi",
    items: [{ name: "Metformin 850mg", qty: 5, price: 1.18 }],
    subtotal: 5.9,
    deliveryFee: 10.0,
    total: 15.9,
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
    sellerName: "MediCare Banani",
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
    customer: "Abul Kalam",
    email: "kalam.abul@example.com",
    phone: "+880 1313-112233",
    address: "Polwel Carnation, Sector 8, Uttara, Dhaka",
    date: "2 days ago",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    sellerName: "MediStore Dhanmondi",
    items: [{ name: "Ace Plus", qty: 4, price: 3.0 }],
    subtotal: 12.0,
    deliveryFee: 10.0,
    total: 22.0,
    status: "Cancelled",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Drawer modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          let updated = { ...order, status: newStatus };
          if (newStatus === "Delivered") {
            updated.paymentStatus = "Paid";
          }
          return updated;
        }
        return order;
      })
    );

    setActiveOrder((prev) => {
      if (prev && prev.id === orderId) {
        let updatedActive = { ...prev, status: newStatus };
        if (newStatus === "Delivered") {
          updatedActive.paymentStatus = "Paid";
        }
        return updatedActive;
      }
      return prev;
    });

    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sliced Page Items
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (order) => {
    setActiveOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Global Order Logs
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Platform-wide transaction history, payment verification, and vendor shipment statuses.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search Order ID, customer, seller store or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Filter size={16} className="text-slate-400 dark:text-slate-500" />
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
            <SelectTrigger className="h-12 w-full md:w-52 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-indigo-500 cursor-pointer">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider select-none">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer Details</th>
                <th className="py-4 px-6">Vendor Store</th>
                <th className="py-4 px-6">Payment Info</th>
                <th className="py-4 px-6">Total Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400 dark:text-slate-500">
                    No global orders found matching filters.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/20 transition-colors"
                  >
                    {/* Order ID */}
                    <td className="py-4 px-6 font-medium text-slate-800 dark:text-white">
                      {order.id}
                    </td>

                    {/* Customer Info */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {order.customer}
                        </span>
                        <span className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                          {order.phone}
                        </span>
                      </div>
                    </td>

                    {/* Vendor Name */}
                    <td className="py-4 px-6">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {order.sellerName}
                      </span>
                    </td>

                    {/* Payment Info */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-slate-700 dark:text-slate-200 font-normal">
                          {order.paymentMethod}
                        </span>
                        <span
                          className={`text-sm mt-0.5 font-medium ${
                            order.paymentStatus === "Paid"
                              ? "text-emerald-500"
                              : "text-rose-500"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-xl text-sm font-medium ${
                          order.status === "Pending"
                            ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            : order.status === "Processing"
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/25 dark:text-indigo-400"
                            : order.status === "Shipped"
                            ? "bg-sky-50 text-sky-600 dark:bg-sky-950/25 dark:text-sky-400"
                            : order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/25 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-950/25 dark:text-rose-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(order)}
                          title="View Invoicing Details"
                          className="p-2 rounded-xl border dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemName="orders"
      />

      {/* Invoicing Modal Details */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveOrder(null);
        }}
        activeOrder={activeOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
