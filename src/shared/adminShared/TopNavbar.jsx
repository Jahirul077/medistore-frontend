"use client";

import React from "react";
import { Search, User, Menu, LogOut, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const TopNavbar = ({ onMenuClick, onLogout }) => {
  const pathname = usePathname();

  // Determine page title based on path
  const getPageTitle = () => {
    if (pathname === "/admin") return "Admin Dashboard";
    if (pathname.includes("/admin/users")) return "User Management";
    if (pathname.includes("/admin/orders")) return "Global Orders";
    if (pathname.includes("/admin/categories")) return "Category Management";
    return "Admin Panel";
  };

  return (
    <header className="flex w-full items-center justify-between">
      {/* Page Title & Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="xl:hidden p-2 rounded-xl border dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {getPageTitle()}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            System administration & overview metrics.
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
            placeholder="Search system logs, users..."
            className="h-12 w-80 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-800 dark:text-slate-200 transition-all shadow-inner text-sm font-normal"
          />
        </div>

        {/* Profile Info Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 pl-1.5 border-l dark:border-slate-800 cursor-pointer focus:outline-none select-none">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 p-2 flex items-center justify-center border border-indigo-500/20 text-indigo-650 dark:text-indigo-400 shadow-sm hover:bg-indigo-500/20 transition-colors">
              <Shield size={18} />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-base font-medium text-slate-800 dark:text-slate-200 leading-tight">
                System Admin
              </span>
              <span className="text-sm text-slate-400 dark:text-slate-500">
                Superuser Account
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow-lg p-1.5 mt-1 text-slate-700 dark:text-slate-200">
            <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 w-full">
                <User size={15} className="text-slate-500" />
                <span>Go to Storefront</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />
            <DropdownMenuItem
              onClick={onLogout}
              className="rounded-xl px-3 py-2.5 text-sm cursor-pointer text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2"
            >
              <LogOut size={15} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNavbar;
