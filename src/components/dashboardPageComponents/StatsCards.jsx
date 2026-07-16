"use client";

import React from "react";
import { DollarSign, Package, Clock, CheckCircle, TrendingUp, Plus } from "lucide-react";

export default function StatsCards({ pendingOrdersCount, medicinesCount, totalRevenue, completedOrdersCount }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Sales */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-200 group">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Total Revenue
          </span>
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <DollarSign size={20} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-semibold text-slate-800 dark:text-white">
            ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp size={16} />
            <span>+12.4% this month</span>
          </div>
        </div>
      </div>

      {/* Total Medicines */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-200 group">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Medicines Stocked
          </span>
          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
            <Package size={20} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-semibold text-slate-800 dark:text-white">
            {medicinesCount} Items
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-teal-600 dark:text-teal-400 font-medium">
            <Plus size={16} />
            <span>8 added this week</span>
          </div>
        </div>
      </div>

      {/* Pending Orders */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-200 group">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Pending Orders
          </span>
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
            <Clock size={20} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-semibold text-slate-800 dark:text-white">
            {pendingOrdersCount} Orders
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-amber-600 dark:text-amber-400 font-medium">
            <Clock size={16} />
            <span>Requires attention</span>
          </div>
        </div>
      </div>

      {/* Successful Orders */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-200 group">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Completed Sales
          </span>
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
            <CheckCircle size={20} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-semibold text-slate-800 dark:text-white">
            {completedOrdersCount} Orders
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
            <TrendingUp size={16} />
            <span>+98.2% fulfillment rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
