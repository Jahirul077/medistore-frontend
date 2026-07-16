"use client";

import React from "react";
import { Search, User, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const SellerTopNavbar = ({ onMenuClick }) => {
  const pathname = usePathname();

  // Determine page title based on path
  const getPageTitle = () => {
    if (pathname.includes("/seller/dashboard")) return "Seller Dashboard";
    if (pathname.includes("/seller/medicines")) return "Medicine Inventory";
    if (pathname.includes("/seller/orders")) return "Order Management";
    return "Seller Panel";
  };

  return (
    <header className="flex w-full items-center justify-between">
      {/* Page Title & Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="xl:hidden p-2 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-655 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium tracking-tight text-slate-900 dark:text-white">
            {getPageTitle()}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Welcome back to your pharmacy portal.
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3.5">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="h-12 w-96 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500 text-slate-800 dark:text-slate-200 transition-all shadow-inner text-base font-normal"
          />
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-3 pl-1.5 border-l border-slate-100 dark:border-slate-800">
          <div className="h-10 w-10 rounded-xl bg-teal-500/10 p-2 flex items-center justify-center border border-teal-500/20 text-teal-600 dark:text-teal-400 shadow-sm">
            <User size={18} />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-base font-medium text-slate-800 dark:text-slate-200 leading-tight">
              Jahirul Islam
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Seller Account
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SellerTopNavbar;
