"use client";

import React from "react";
import { LayoutDashboard, Users, ShoppingBag, Grid, LogOut, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/admin" },
    { icon: <Users size={18} />, label: "Users", href: "/admin/users" },
    { icon: <ShoppingBag size={18} />, label: "Orders", href: "/admin/orders" },
    { icon: <Grid size={18} />, label: "Categories", href: "/admin/categories" },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800">
      {/* Brand Header */}
      <Link href="/" className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 shadow-md">
          <ShieldAlert size={22} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white leading-tight">
            MediStore
          </span>
          <span className="text-[11px] font-semibold text-indigo-400 tracking-wider uppercase">
            Admin Panel
          </span>
        </div>
      </Link>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 h-11 rounded-xl cursor-pointer transition-all duration-200 text-sm font-medium
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to Site */}
      <div className="p-4 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-3.5 px-4 h-11 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-200 text-sm font-medium"
        >
          <LogOut size={18} />
          <span>Exit Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
