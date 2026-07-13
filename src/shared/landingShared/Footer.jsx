import React from "react";
import Link from "next/link";
import { Activity, Mail, Phone } from "lucide-react";
import Button from "@/components/common/Button";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Company Brand Column */}
          <div className="space-y-4 md:col-span-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Medi<span className="text-teal-400">Store</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Your neighborhood digital pharmacy, providing verified medicines, vitamins, and healthcare essentials directly to your home.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/medicines" className="hover:text-teal-400 transition-colors">Medicines</Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-teal-400 transition-colors">Blogs</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="hover:text-teal-400 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-teal-400 transition-colors">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-teal-400 transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="space-y-4 md:col-span-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Stay Healthy
            </h4>
            <p className="text-sm text-slate-400 max-w-sm">
              Subscribe to get tips on wellness, discount coupons, and health updates.
            </p>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
              <Button variant="primary" size="sm" className="h-auto">
                Subscribe
              </Button>
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-teal-400" />
                <span>+880 1234 567890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-teal-400" />
                <span>support@medistore.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <p>© {new Date().getFullYear()} MediStore. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
