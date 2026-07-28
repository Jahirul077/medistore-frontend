"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { X, LogOut } from "lucide-react";
import SellerSidebar from "@/shared/sellerShared/SellerSidebar";
import SellerTopNavbar from "@/shared/sellerShared/SellerTopNavbar";
import useLogoutMutation from "@/hooks/Auth/useLogoutMutation";
import { logout } from "@/redux/slices/authSlice";
import { removeLocalStorage } from "@/utils/localStorage";

export default function SellerLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutate: performLogout, isPending: isLoggingOut } = useLogoutMutation({
    onSuccess: () => {
      removeLocalStorage("MEDISTORE_ACCESS_TOKEN");
      removeLocalStorage("MEDISTORE_USER");
      dispatch(logout());
      setIsLogoutOpen(false);
      toast.success("Logged out successfully.");
      router.push("/auth/login");
    },
    onError: () => {
      removeLocalStorage("MEDISTORE_ACCESS_TOKEN");
      removeLocalStorage("MEDISTORE_USER");
      dispatch(logout());
      setIsLogoutOpen(false);
      toast.success("Logged out successfully.");
      router.push("/auth/login");
    },
  });

  const handleLogoutConfirm = () => {
    performLogout();
  };

  return (
    <main className="w-full h-screen flex relative bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
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
              className="absolute right-4 top-4 p-2 rounded-xl border dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
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
        <div className="w-full h-auto xl:h-[80px] flex flex-col justify-center px-6 md:px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800/80 transition-all duration-300">
          <SellerTopNavbar
            onMenuClick={() => setMobileSidebarOpen(true)}
            onLogout={() => setIsLogoutOpen(true)}
          />
        </div>

        {/* Scrollable Workspace Content */}
        <div className="w-full h-[calc(100%-80px)] overflow-auto scrollbar-gutter-stable custom-scrollbar p-6 md:p-8 relative">
          <div className="relative z-10 space-y-6">
            {children}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => !isLoggingOut && setIsLogoutOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 text-center">
            {/* Warning Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-4">
              <LogOut className="h-7 w-7 text-rose-500" />
            </div>

            {/* Header */}
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Confirm Log Out
            </h3>

            {/* Message */}
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Are you sure you want to log out from your seller portal?
            </p>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                disabled={isLoggingOut}
                onClick={() => setIsLogoutOpen(false)}
                className="cursor-pointer border dark:border-slate-800 text-slate-500 dark:text-slate-300 font-medium px-5 py-2.5 rounded-xl flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isLoggingOut}
                onClick={handleLogoutConfirm}
                className="cursor-pointer bg-rose-600 hover:bg-rose-500 text-white font-medium px-5 py-2.5 rounded-xl flex-1 transition-colors text-sm shadow-md disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Yes, Log Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
