"use client";

import React, { useState } from "react";
import { Package, Plus } from "lucide-react";
import Link from "next/link";
import Button from "@/components/common/Button";
import StatsCards from "@/components/dashboardPageComponents/StatsCards";
import SalesChart from "@/components/dashboardPageComponents/SalesChart";
import RecentOrdersTable from "@/components/dashboardPageComponents/RecentOrdersTable";

// Mock Data for Recent Orders
const initialRecentOrders = [
  {
    id: "ORD-9821",
    customer: "Amit Hasan",
    date: "10 mins ago",
    items: "Paracetamol 500mg x3, Napa Extra x2",
    amount: "$24.50",
    status: "Pending",
  },
  {
    id: "ORD-9820",
    customer: "Sarah Khan",
    date: "1 hour ago",
    items: "Amoxicillin 250mg x1, Azithromycin x1",
    amount: "$42.00",
    status: "Processing",
  },
  {
    id: "ORD-9819",
    customer: "Rafiqul Islam",
    date: "3 hours ago",
    items: "Metformin 850mg x5",
    amount: "$15.90",
    status: "Delivered",
  },
  {
    id: "ORD-9818",
    customer: "Nusrat Jahan",
    date: "Yesterday",
    items: "Atorvastatin 10mg x2, Sergel 20mg x3",
    amount: "$88.00",
    status: "Delivered",
  },
];

export default function SellerDashboard() {
  const [orders, setOrders] = useState(initialRecentOrders);

  // Quick Action: Simulate accepting a pending order
  const handleAcceptOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) =>
        ord.id === orderId ? { ...ord, status: "Processing" } : ord
      )
    );
  };

  const pendingCount = orders.filter((o) => o.status === "Pending").length;

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

      {/* Analytics Stats Grid component */}
      <StatsCards
        pendingOrdersCount={pendingCount}
        medicinesCount={184}
        totalRevenue={14245.5}
        completedOrdersCount={1104}
      />

      {/* Charts Section component */}
      <SalesChart />

      {/* Recent Orders log component */}
      <RecentOrdersTable orders={orders} onAcceptOrder={handleAcceptOrder} />
    </div>
  );
}
