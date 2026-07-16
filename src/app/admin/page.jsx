"use client";

import React from "react";
import { DollarSign, ShoppingCart, Users, Store, ArrowUpRight, ShieldAlert } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
  { month: "Jul", revenue: 7800 },
];

const stats = [
  {
    label: "Total Revenue",
    value: "$24,580.00",
    change: "+12.5% vs last month",
    icon: <DollarSign size={20} className="text-indigo-500" />,
    bg: "bg-indigo-500/10",
  },
  {
    label: "Global Orders",
    value: "142 Completed",
    change: "+8.2% vs last month",
    icon: <ShoppingCart size={20} className="text-emerald-500" />,
    bg: "bg-emerald-500/10",
  },
  {
    label: "Active Sellers",
    value: "18 Stores",
    change: "+2 new this week",
    icon: <Store size={20} className="text-amber-500" />,
    bg: "bg-amber-500/10",
  },
  {
    label: "Registered Users",
    value: "842 Customers",
    change: "+48 this month",
    icon: <Users size={20} className="text-sky-500" />,
    bg: "bg-sky-500/10",
  },
];

const systemLogs = [
  {
    id: 1,
    action: "New Seller Registration",
    details: "Dhanmondi Pharma submitted registration request",
    time: "5 mins ago",
    status: "Pending Review",
    type: "warning",
  },
  {
    id: 2,
    action: "Order Fulfill Notification",
    details: "Order ORD-9821 marked as SHIPPED by seller Jahirul Islam",
    time: "20 mins ago",
    status: "Success",
    type: "success",
  },
  {
    id: 3,
    action: "System Backup Completed",
    details: "Database backup auto-saved to Cloud Storage",
    time: "1 hour ago",
    status: "System",
    type: "info",
  },
  {
    id: 4,
    action: "Seller License Verified",
    details: "Lazz Pharma License DL-339201 verified automatically",
    time: "3 hours ago",
    status: "Verified",
    type: "success",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-indigo-600 to-violet-600 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-xs">
            <ShieldAlert size={14} />
            System Administration Mode
          </div>
          <h2 className="text-2xl font-semibold">Welcome back, Super Admin!</h2>
          <p className="text-indigo-100 text-sm max-w-xl">
            Monitor transaction volumes, store registrations, platform-wide orders, and verify medicine vendor compliance.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-indigo-500/30 to-transparent opacity-50 pointer-events-none" />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between min-h-[120px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-slate-850 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-normal">
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart & System Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 p-6 lg:col-span-2 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Platform Sales Analytics
              </h3>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                Total monthly platform processing value.
              </p>
            </div>
            <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer">
              Full Report <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Activity Logs Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              System Logs & Audit
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              Live updates of platform activities.
            </p>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {systemLogs.map((log) => (
              <div key={log.id} className="text-sm border-b dark:border-slate-800 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {log.action}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                    {log.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {log.details}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium ${
                      log.type === "success"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                        : log.type === "warning"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                        : "bg-sky-50 text-sky-600 dark:bg-sky-950/20 dark:text-sky-400"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
