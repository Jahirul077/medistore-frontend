"use client";

import React from "react";
import { Package, Plus } from "lucide-react";
import Link from "next/link";
import Button from "@/components/common/Button";
import StatsCards from "@/components/dashboardPageComponents/StatsCards";
import SalesChart from "@/components/dashboardPageComponents/SalesChart";
import RecentOrdersTable from "@/components/dashboardPageComponents/RecentOrdersTable";
import useGetSellerStatsQuery from "@/hooks/Seller/useGetSellerStatsQuery";

export default function SellerDashboard() {
  const { data: resData, isLoading, error } = useGetSellerStatsQuery();
  const stats = resData?.data || {};

  const medicinesCount = stats.medicinesCount || 0;
  const pendingOrdersCount = stats.pendingOrdersCount || 0;
  const completedOrdersCount = stats.completedOrdersCount || 0;
  const totalRevenue = Number(stats.totalRevenue || 0);

  const rawOrders = stats.recentOrders || [];

  const formattedRecentOrders = rawOrders.map((order) => {
    const customerName = order.customer?.name || "Customer";
    const dateStr = order.createdAt
      ? new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "Recent";

    const itemsSummary = order.orderItems
      ?.map((item) => {
        const medTitle = item.sellerInventory?.medicines?.title || "Item";
        return `${medTitle} x${item.quantity}`;
      })
      .join(", ") || "Medicine Items";

    const amountStr = `$${Number(order.totalAmount || 0).toFixed(2)}`;

    return {
      id: order.id.slice(0, 8),
      fullId: order.id,
      customer: customerName,
      date: dateStr,
      items: itemsSummary,
      amount: amountStr,
      status: order.status || "PLACED",
    };
  });

  return (
    <div className="space-y-6">
      {/* Upper Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-emerald-500/10 to-teal-500/5 dark:from-emerald-950/20 dark:to-teal-950/10 p-6 rounded-3xl border border-teal-500/10">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Pharmacy Overview & Revenue
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your pharmaceutical sales, stock alerts, and patient requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/seller/medicines">
            <Button
              variant="outline"
              size="md"
              icon={<Package size={18} />}
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 cursor-pointer font-medium animate-pulse-slow"
            >
              Inventory
            </Button>
          </Link>
          <Link href="/seller/medicines?add=true">
            <Button
              variant="primary"
              size="md"
              icon={<Plus size={18} />}
              className="cursor-pointer font-medium"
            >
              Add Medicine
            </Button>
          </Link>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      )}

      {/* Analytics Stats Grid component */}
      {!isLoading && (
        <StatsCards
          pendingOrdersCount={pendingOrdersCount}
          medicinesCount={medicinesCount}
          totalRevenue={totalRevenue}
          completedOrdersCount={completedOrdersCount}
        />
      )}

      {/* Charts Section component */}
      <SalesChart />

      {/* Recent Orders log component */}
      {!isLoading && (
        <RecentOrdersTable orders={formattedRecentOrders} />
      )}
    </div>
  );
}
