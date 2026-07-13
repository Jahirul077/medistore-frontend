"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Activity, User } from "lucide-react";
import Button from "@/components/common/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add shadow and blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-md border-b border-slate-100 dark:border-slate-900"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Medi<span className="text-teal-500">Store</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-teal-600 dark:text-teal-400"
            >
              Home
            </Link>
            <Link
              href="/medicines"
              className="text-sm font-medium text-slate-650 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            >
              Medicines
            </Link>
            <Link
              href="/blogs"
              className="text-sm font-medium text-slate-650 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-sm font-medium text-slate-650 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              <span className="absolute -top-2.5 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                3
              </span>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard/overview">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="primary" size="sm" icon={<User className="h-4 w-4" />}>
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-900"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 shadow-lg dark:border-slate-900 dark:bg-slate-950 animate-slide-in">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-teal-600 bg-teal-50/50 dark:bg-teal-950/20"
            >
              Home
            </Link>
            <Link
              href="/medicines"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Medicines
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Blogs
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                3
              </span>
            </Link>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-900">
              <Link href="/dashboard/overview" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Dashboard
                </Button>
              </Link>
              <Link href="/auth/login" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="primary" size="sm" className="w-full" icon={<User className="h-4 w-4" />}>
                  Login
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
