"use client";

import React, { useState } from "react";
import SellerSidebar from "@/shared/sellerShared/SellerSidebar";
import SellerTopNavbar from "@/shared/sellerShared/SellerTopNavbar";
import { X } from "lucide-react";

export default function SellerLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <main className="w-full h-screen flex relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Desktop Sidebar (Sticky, hidden below xl) */}
      <div className="xl:w-[280px] h-screen xl:block hidden border-r shrink-0">
        <SellerSidebar />
      </div>

      {/* Mobile Drawer (Hidden on desktop, overlay when open) */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative flex flex-col w-[280px] h-full max-w-xs bg-white dark:bg-slate-900 shadow-2xl animate-in slide-in-from-left duration-250 z-10">
            {/* Close button inside drawer */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Close Sidebar"
            >
              <X size={18} />
            </button>
            <SellerSidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col w-full xl:w-[calc(100%-280px)] h-screen overflow-hidden">
        {/* Header TopNavbar */}
        <div className="w-full h-auto xl:h-[80px] flex flex-col justify-center px-6 md:px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-all duration-300">
          <SellerTopNavbar onMenuClick={() => setMobileSidebarOpen(true)} />
        </div>

        {/* Scrollable Workspace Content */}
        <div className="w-full h-[calc(100%-80px)] overflow-auto custom-scrollbar p-6 md:p-8 relative">
          <div className="relative z-10 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
