import React from "react";
import Container from "@/components/common/Container";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import CheckoutContainer from "@/components/checkout/CheckoutContainer";

export default function CheckoutPage() {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pt-28 pb-16">
      <Container>
        {/* Page Header */}
        <div className="mb-8 text-left border-b border-slate-200/50 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-2.5">
            <Link href="/" className="hover:text-teal-655 transition-colors cursor-pointer">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/cart" className="hover:text-teal-655 transition-colors cursor-pointer">
              Cart
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-teal-500">Checkout</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white md:text-4xl tracking-tight">
            Checkout
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Provide your shipping details and complete your secure payment.
          </p>
        </div>

        {/* Main Interactive Checkout Container */}
        <CheckoutContainer />
        
      </Container>
    </div>
  );
}
