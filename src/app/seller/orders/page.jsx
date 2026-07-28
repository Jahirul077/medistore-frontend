"use client";

import React, { useState } from "react";
import { Search, Filter, ShoppingBag } from "lucide-react";
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
import useGetSellerOrdersQuery from "@/hooks/Seller/useGetSellerOrdersQuery";

export default function SellerOrdersPage() {
  const { data: resData, isLoading } = useGetSellerOrdersQuery();
  const liveOrders = resData?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Detailed Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Format backend order data to fit UI requirements
  const formattedOrders = liveOrders.map((ord) => {
    const rawStatus = ord.status || "PROCESSING";
    // Title Case status: PROCESSING -> Processing, DELIVERED -> Delivered
    const formattedStatus =
      rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();

    return {
      id: ord.id,
      customer: ord.customer?.name || "Customer",
      email: ord.customer?.email || "N/A",
      phone: ord.customer?.phone || "N/A",
      address: ord.shipping_Address || "Address N/A",
      date: new Date(ord.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      paymentMethod: ord.paymentIntentId ? "Stripe (Online)" : "Cash on Delivery",
      paymentStatus: ord.paymentStatus === "COMPLETED" ? "Paid" : "Unpaid",
      status: formattedStatus,
      total: Number(ord.totalAmount || 0),
      items: (ord.orderItems || []).map((item) => ({
        name: item.sellerInventory?.medicines?.title || "Medicine Item",
        qty: item.quantity,
        price: Number(item.price || 0),
      })),
    };
  });

  // Status transitions
  const handleUpdateStatus = (orderId, newStatus) => {
    toast.success(`Order ${orderId.slice(0, 8)}... updated to ${newStatus}`);
  };

  // Filter Logic
  const filteredOrders = formattedOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "All" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
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
          Process pharmacy sales, fulfill shipments, and view incoming customer orders.
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

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          ))}
        </div>
      )}

      {/* Orders Table */}
      {!isLoading && (
        <OrdersTable
          filteredOrders={paginatedOrders}
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Reusable Pagination Component */}
      {!isLoading && filteredOrders.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemName="orders"
        />
      )}

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
