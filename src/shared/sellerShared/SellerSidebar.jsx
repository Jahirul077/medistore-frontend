"use client";

import React from "react";
import { LayoutDashboard, Pill, ShoppingBag, ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SellerSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/seller/dashboard",
    },
    {
      icon: <Pill size={20} />,
      label: "Inventory",
      href: "/seller/medicines",
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Orders",
      href: "/seller/orders",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border-r dark:border-slate-800 transition-colors duration-300">
      {/* Brand Logo Header */}
      <div className="p-6 flex items-center justify-between border-b dark:border-slate-800/50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Medi<span className="text-teal-500">Store</span>
            <span className="ml-1 text-[10px] bg-teal-500/10 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded font-medium uppercase tracking-wider">
              Seller
            </span>
          </span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 border w-full font-medium text-sm
                ${
                  isActive
                    ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 border-teal-500/20 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent hover:border dark:hover:border-slate-800"
                }`}
            >
              <span className={`transition-colors duration-200 ${isActive ? "text-teal-500" : "text-slate-400 dark:text-slate-500"}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / Action */}
      <div className="p-4 border-t dark:border-slate-800/50">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border dark:hover:border-slate-800 transition-all duration-200 font-medium text-sm w-full"
        >
          <ArrowLeft size={18} className="text-slate-400 dark:text-slate-500" />
          <span>Back to Shop</span>
        </Link>
      </div>
    </div>
  );
};

export default SellerSidebar;
