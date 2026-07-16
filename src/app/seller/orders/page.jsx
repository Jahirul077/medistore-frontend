"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import modular components
import OrdersTable from "@/components/ordersPageComponents/OrdersTable";
import OrderDetailModal from "@/components/ordersPageComponents/OrderDetailModal";
import Pagination from "@/components/common/Pagination";

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
    items: [{ name: "Ace Plus", qty: 4, price: 3.0 }],
    subtotal: 12.0,
    deliveryFee: 10.0,
    total: 22.0,
    status: "Cancelled",
  },
];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Detailed Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);


  // Status transitions
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          let updatedOrder = { ...order, status: newStatus };

          // Automatically mark payment as paid if order status is set to delivered
          if (newStatus === "Delivered") {
            updatedOrder.paymentStatus = "Paid";
          }

          return updatedOrder;
        }
        return order;
      })
    );

    // Sync state for open details drawer
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
      order.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Paginated List
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
      {/* Header section */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Order Management
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Process pharmacy sales, fulfill shipments, and update prescription orders.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search Order ID, Customer name or phone number..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Filter size={16} className="text-slate-400 dark:text-slate-500" />
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-12 w-full md:w-52 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-teal-500 cursor-pointer">
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
      <OrdersTable
        filteredOrders={paginatedOrders}
        onViewDetails={handleViewDetails}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemName="orders"
      />

      {/* Order Detail Modal */}
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
