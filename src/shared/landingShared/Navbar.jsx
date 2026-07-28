"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, ShoppingCart, Activity, User, LogOut, LayoutDashboard } from "lucide-react";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import useLogoutMutation from "@/hooks/Auth/useLogoutMutation";
import { logout } from "@/redux/slices/authSlice";
import { removeLocalStorage } from "@/utils/localStorage";
import { toast } from "sonner";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartItems = useSelector((state) => state.cart.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});

  const { mutate: performLogout } = useLogoutMutation({
    onSuccess: () => {
      removeLocalStorage("MEDISTORE_ACCESS_TOKEN");
      removeLocalStorage("MEDISTORE_USER");
      dispatch(logout());
      toast.success("Logged out successfully");
      router.push("/");
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDesktopClass = (href) => {
    const isActive = pathname === href;
    return `text-base transition-colors ${
      isActive
        ? "text-teal-650 font-bold dark:text-teal-400"
        : "font-semibold text-slate-650 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
    }`;
  };

  const getMobileClass = (href) => {
    const isActive = pathname === href;
    return `rounded-lg px-3 py-2 text-base transition-colors ${
      isActive
        ? "font-bold text-teal-600 bg-teal-50/50 dark:bg-teal-950/20"
        : "font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-900"
    }`;
  };

  const dashboardPath = user?.role === "ADMIN" ? "/admin" : user?.role === "SELLER" ? "/seller" : "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-md border-b border-slate-100 dark:border-slate-900"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Medi<span className="text-teal-500">Store</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={getDesktopClass(link.href)}>
                {link.label}
              </Link>
            ))}
            {/* Cart Link */}
            <Link href="/cart" className={`relative flex items-center gap-1.5 ${getDesktopClass("/cart")}`}>
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-3 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated || user ? (
              <div className="flex items-center gap-3">
                {(user?.role === "ADMIN" || user?.role === "SELLER") && (
                  <Link href={dashboardPath}>
                    <Button variant="outline" size="md" className="text-sm h-10 px-4 cursor-pointer" icon={<LayoutDashboard className="h-4 w-4" />}>
                      Dashboard
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <User className="h-4 w-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {user?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={() => performLogout()}
                  className="p-2 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="primary" size="md" className="text-base h-10 px-5 cursor-pointer" icon={<User className="h-4 w-4" />}>
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-900 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 shadow-lg dark:border-slate-900 dark:bg-slate-950 animate-slide-in">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={getMobileClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
            {/* Cart Link */}
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between ${getMobileClass("/cart")}`}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart
              </span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-900">
              {isAuthenticated || user ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{user?.name}</span>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        performLogout();
                      }}
                      className="text-xs text-rose-600 font-bold flex items-center gap-1"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Logout
                    </button>
                  </div>
                  {(user?.role === "ADMIN" || user?.role === "SELLER") && (
                    <Link href={dashboardPath} onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="md" className="w-full text-sm h-10 mt-2 cursor-pointer">
                        Go to Dashboard
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="w-full">
                  <Button variant="primary" size="md" className="w-full text-base h-10 cursor-pointer" icon={<User className="h-4 w-4" />}>
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
