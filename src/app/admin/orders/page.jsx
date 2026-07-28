"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  ShoppingBag,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/common/Pagination";
import OrderDetailModal from "@/components/ordersPageComponents/OrderDetailModal";
import useGetAdminOrdersQuery from "@/hooks/Orders/useGetAdminOrdersQuery";

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  PLACED: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  PENDING: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  PROCESSING:
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/25 dark:text-indigo-400",
  SHIPPED: "bg-sky-50 text-sky-600 dark:bg-sky-950/25 dark:text-sky-400",
  DELIVERED:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/25 dark:text-emerald-400",
  CANCELLED:
    "bg-rose-50 text-rose-600 dark:bg-rose-950/25 dark:text-rose-400",
};

function StatusBadge({ status }) {
  const cls =
    STATUS_STYLES[status?.toUpperCase()] ??
    "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400";
  const label =
    status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase();
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-xl text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

function PaymentBadge({ status }) {
  const isPaid = status === "COMPLETED" || status === "Paid";
  return (
    <span
      className={`text-xs font-medium ${
        isPaid ? "text-emerald-500" : "text-rose-500"
      }`}
    >
      {isPaid ? "Paid" : "Pending"}
    </span>
  );
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="py-4 px-6">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-24" />
        </td>
      ))}
      <td className="py-4 px-6 text-right">
        <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-xl ml-auto" />
      </td>
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const itemsPerPage = 10;

  // Detail modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data, isLoading, isError } = useGetAdminOrdersQuery({
    page: currentPage,
    limit: itemsPerPage,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(statusFilter !== "ALL" ? { status: statusFilter } : {}),
  });

  const orders = data?.data ?? [];
  const meta = data?.meta ?? {};
  const totalPages = meta.totalPages ?? 1;
  const totalItems = meta.total ?? 0;

  const handleViewDetails = (order) => {
    setActiveOrder(order);
    setIsModalOpen(true);
  };

  // Placeholder — wire to a real mutation when the API route is available
  const handleUpdateStatus = (orderId, newStatus) => {
    // TODO: call PATCH /admin/orders/:id mutation
    console.log("Update order", orderId, "to", newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Global Order Logs
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Platform-wide transaction history, payment verification, and vendor
          shipment statuses.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by customer name, email or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Filter size={16} className="text-slate-400 dark:text-slate-500" />
          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val)}
          >
            <SelectTrigger className="h-12 w-full md:w-52 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-indigo-500 cursor-pointer">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200">
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="PLACED">Placed</SelectItem>
              <SelectItem value="PROCESSING">Processing</SelectItem>
              <SelectItem value="SHIPPED">Shipped</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-5 flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm">
          <AlertTriangle size={18} className="shrink-0" />
          <p>Failed to load orders. Please try refreshing the page.</p>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider select-none">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Items</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Total</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-16 text-center text-slate-400 dark:text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingBag size={28} className="opacity-30" />
                      <p className="text-sm">
                        No orders found matching your filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const medicines = (order.orderItems ?? [])
                    .map(
                      (oi) => oi.sellerInventory?.medicines?.title ?? "Item"
                    )
                    .join(", ");

                  const shortId = `…${order.id.slice(-8)}`;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/30 dark:hover:bg-slate-850/20 transition-colors"
                    >
                      {/* Order ID */}
                      <td className="py-4 px-6 font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {shortId}
                      </td>

                      {/* Customer */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {order.customer?.name ?? "—"}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            {order.customer?.email}
                          </span>
                        </div>
                      </td>

                      {/* Items summary */}
                      <td className="py-4 px-6">
                        <p className="text-slate-600 dark:text-slate-400 truncate max-w-[160px]">
                          {medicines || "—"}
                        </p>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {order.orderItems?.length ?? 0} item
                          {(order.orderItems?.length ?? 0) !== 1 ? "s" : ""}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="py-4 px-6">
                        <PaymentBadge status={order.paymentStatus} />
                      </td>

                      {/* Total */}
                      <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">
                        ${parseFloat(order.totalAmount ?? 0).toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <StatusBadge status={order.status} />
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleViewDetails(order)}
                          title="View Order Details"
                          className="p-2 rounded-xl border dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors"
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
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
