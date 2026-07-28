"use client";

import React, { useState, useMemo } from "react";
import Button from "@/components/common/Button";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Percent,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

export default function CartContainer() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const handleUpdateQuantity = (itemId, currentQty, change) => {
    const nextQty = currentQty + change;
    if (nextQty >= 1) {
      dispatch(updateQuantity({ id: itemId, quantity: nextQty }));
    }
  };

  const handleRemoveItem = (itemId, title) => {
    dispatch(removeFromCart(itemId));
    toast.success(`${title || "Item"} removed from cart.`);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "MEDISTORE10") {
      setDiscountPercent(10);
      setIsPromoApplied(true);
      toast.success("Promo code applied! 10% discount added.");
    } else if (code === "HEALTH20") {
      setDiscountPercent(20);
      setIsPromoApplied(true);
      toast.success("Promo code applied! 20% discount added.");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const { subtotal, deliveryFee, tax, discountAmount, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
    const disc = sub * (discountPercent / 100);
    const delivery = sub > 30 || sub === 0 ? 0 : 5.0;
    const estTax = (sub - disc) * 0.05;
    const grandTotal = sub - disc + delivery + estTax;

    return {
      subtotal: sub,
      deliveryFee: delivery,
      tax: estTax,
      discountAmount: disc,
      total: grandTotal,
    };
  }, [cartItems, discountPercent]);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12 max-w-md mx-auto space-y-6">
        <div className="h-20 w-20 bg-teal-50 dark:bg-teal-950/40 rounded-full flex items-center justify-center mx-auto text-teal-500 shadow-md">
          <ShoppingCart className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Your Cart is Empty
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Looks like you haven&apos;t added any medicines yet. Start exploring our pharmacy catalog!
          </p>
        </div>
        <Link href="/shop" className="inline-block w-full">
          <Button variant="primary" className="w-full h-11 rounded-xl text-sm font-bold cursor-pointer">
            Explore Shop Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Cart Items List */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 md:p-6 shadow-xs space-y-5">
          {cartItems.map((item) => {
            const priceVal = Number(item.price || 0);

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 py-4 first:pt-0 last:pb-0 border-b last:border-0 border-slate-100 dark:border-slate-850"
              >
                {item.image && (
                  <div className="relative h-20 w-20 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 flex items-center justify-center border border-slate-100 dark:border-slate-850 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      unoptimized
                      className="object-contain max-h-16 max-w-full drop-shadow-sm"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-550 dark:text-slate-400">
                    {item.genericName} ({item.strength})
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-850">
                  <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 h-9 p-1">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                      disabled={item.quantity <= 1}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-700 dark:text-slate-350">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900 dark:text-white block">
                        ${(priceVal * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold block">
                        ${priceVal.toFixed(2)} / unit
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.title)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-550 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-teal-650 transition-colors cursor-pointer"
        >
          <ShoppingCart className="h-4.5 w-4.5" />
          Continue Shopping
        </Link>
      </div>

      {/* Order Summary & Checkout */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs">
          <form onSubmit={handleApplyPromo} className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              Have a Promo Code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. MEDISTORE10"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={isPromoApplied}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-955 dark:text-slate-200 disabled:opacity-50"
              />
              <Button
                type="submit"
                variant="outline"
                disabled={isPromoApplied || !promoCode}
                className="h-9 px-4 text-xs font-bold rounded-xl cursor-pointer"
              >
                Apply
              </Button>
            </div>
            {isPromoApplied && (
              <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-semibold bg-teal-500/5 px-2.5 py-1.5 rounded-lg">
                <Percent className="h-3.5 w-3.5" />
                Code Applied: {discountPercent}% discount active!
              </div>
            )}
          </form>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-5">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm border-b border-slate-100 dark:border-slate-850 pb-4">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {isPromoApplied && (
              <div className="flex items-center justify-between text-teal-655 dark:text-teal-405">
                <span>Discount ({discountPercent}%)</span>
                <span className="font-bold">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-505 font-bold">Free</span>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Estimated Tax (5%)</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                ${tax.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              Total Amount
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              ${total.toFixed(2)}
            </span>
          </div>

          <Link href="/checkout" className="block w-full pt-2">
            <Button
              variant="primary"
              icon={<ArrowRight className="h-4 w-4" />}
              className="w-full h-11 rounded-xl text-sm font-bold shadow-md shadow-teal-500/10 cursor-pointer"
            >
              Proceed to Checkout
            </Button>
          </Link>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-805 dark:text-slate-200 uppercase tracking-wider">
              Safe & Secure Checkout
            </h4>
            <p className="text-[11px] text-slate-455 dark:text-slate-500 leading-normal">
              Your payments are processed securely. MediStore guarantees authentic medications or a full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
