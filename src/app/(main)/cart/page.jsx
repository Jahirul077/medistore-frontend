import React from "react";
import Container from "@/components/common/Container";
import { ShoppingBag } from "lucide-react";
import CartContainer from "@/components/cart/CartContainer";

export default function CartPage() {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-955 min-h-screen pt-28 pb-16">
      <Container>
        {/* Page Title Header */}
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <ShoppingBag className="h-8 w-8 text-teal-505" />
            Shopping Cart
          </h1>
        </div>

        {/* Client Cart Area Container */}
        <CartContainer />
      </Container>
    </div>
  );
}
