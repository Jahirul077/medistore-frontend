"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Store,
  ShieldAlert,
  FolderTree,
  UsersRound,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import useGetAdminStatsQuery from "@/hooks/Admin/useGetAdminStatsQuery";

export default function AdminDashboardPage() {
  const { data: statsResponse, isLoading } = useGetAdminStatsQuery();
  const statsData = statsResponse?.data;

  const stats = [
    {
      label: "Total Revenue",
      value: isLoading
        ? null
        : `$${Number(statsData?.totalRevenue ?? 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      change: "All time total revenue",
      icon: <DollarSign size={20} className="text-indigo-500" />,
      bg: "bg-indigo-500/10",
    },
    {
      label: "Global Orders",
      value: isLoading ? null : `${statsData?.totalOrders ?? 0} Orders`,
      change: "Total orders placed",
      icon: <ShoppingCart size={20} className="text-emerald-500" />,
      bg: "bg-emerald-500/10",
    },
    {
      label: "Active Sellers",
      value: isLoading ? null : `${statsData?.totalSellers ?? 0} Stores`,
      change: "Registered vendors",
      icon: <Store size={20} className="text-amber-500" />,
      bg: "bg-amber-500/10",
    },
    {
      label: "Registered Users",
      value: isLoading ? null : `${statsData?.totalCustomers ?? 0} Customers`,
      change: "Platform customers",
      icon: <Users size={20} className="text-sky-500" />,
      bg: "bg-sky-500/10",
    },
  ];

  const quickLinks = [
    {
      title: "Category Management",
      description: "Manage medicine categories, create new ones, and control visibility.",
      href: "/admin/categories",
      icon: <FolderTree className="text-indigo-500" size={24} />,
    },
    {
      title: "User Management",
      description: "View customer & seller profiles, monitor roles, and manage user status.",
      href: "/admin/users",
      icon: <UsersRound className="text-sky-500" size={24} />,
    },
    {
      title: "Global Order Logs",
      description: "Track all orders placed on the platform, check payments, and monitor fulfillment.",
      href: "/admin/orders",
      icon: <ShoppingBag className="text-emerald-500" size={24} />,
    },
  ];

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
            Monitor transaction volumes, platform-wide orders, categories, and user management.
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
              {isLoading ? (
                <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
              ) : (
                <h3 className="text-2xl font-semibold text-slate-850 dark:text-white">
                  {stat.value}
                </h3>
              )}
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-normal">
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Quick Management Portal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group bg-white dark:bg-slate-900 border dark:border-slate-800 p-6 rounded-2xl shadow-xs hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl w-fit mb-4 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-base font-semibold text-slate-800 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Manage</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
