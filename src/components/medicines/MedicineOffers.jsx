"use client";

import React, { useState } from "react";
import { Store, Minus, Plus, ShoppingCart, CheckCircle2 } from "lucide-react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";

export default function MedicineOffers({ medicine }) {
  // Track quantities for each vendor offer
  const [quantities, setQuantities] = useState(
    medicine.inventories.reduce((acc, inv) => {
      acc[inv.id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (invId, change, maxStock) => {
    setQuantities((prev) => {
      const current = prev[invId] || 1;
      const next = current + change;
      if (next < 1 || next > maxStock) return prev;
      return { ...prev, [invId]: next };
    });
  };

  const handleAddToCart = (inventory) => {
    const qty = quantities[inventory.id] || 1;
    toast.success(
      `Added ${qty}x ${medicine.title} from ${inventory.seller.name} to cart!`,
      {
        icon: "🛒",
        style: {
          borderRadius: "16px",
          background: "#0d9488",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Purchase Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Available Offers
          </h2>
          <p className="text-xs text-slate-455 dark:text-slate-500 mt-0.5">
            Select a registered seller pharmacy to add this item to your cart.
          </p>
        </div>

        {/* Sellers List */}
        <div className="space-y-4">
          {medicine.inventories.map((inventory) => {
            const qty = quantities[inventory.id] || 1;
            const priceVal = Number(inventory.price);
            const totalPrice = (priceVal * qty).toFixed(2);

            return (
              <div
                key={inventory.id}
                className="border border-slate-100 dark:border-slate-850 rounded-2xl p-4 space-y-4 bg-slate-50/50 dark:bg-slate-955/20 hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  {/* Seller Name */}
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 bg-teal-50 dark:bg-teal-950 rounded-xl flex items-center justify-center text-teal-655 dark:text-teal-450">
                      <Store className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                        {inventory.seller.name}
                      </h4>
                      <span className="text-[11px] text-emerald-505 font-bold bg-emerald-500/5 px-2 py-0.5 rounded">
                        {inventory.stock} In Stock
                      </span>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-semibold">
                      Unit Price
                    </span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      ${priceVal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Quantity & Cart Action Row */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100/80 dark:border-slate-850">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 h-10 p-1">
                    <button
                      onClick={() => handleQuantityChange(inventory.id, -1, inventory.stock)}
                      disabled={qty <= 1}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-slate-700 dark:text-slate-350">
                      {qty}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(inventory.id, 1, inventory.stock)}
                      disabled={qty >= inventory.stock}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <Button
                    variant="primary"
                    icon={<ShoppingCart className="h-4 w-4" />}
                    className="flex-1 h-10 rounded-xl text-sm font-bold cursor-pointer"
                    onClick={() => handleAddToCart(inventory)}
                  >
                    Add to Cart (${totalPrice})
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why buy from us Trust Banner */}
      <div className="bg-linear-to-br from-teal-500/5 to-teal-500/0 dark:from-teal-955/10 rounded-3xl border border-teal-500/10 dark:border-teal-900/10 p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
          MediStore Marketplace Guarantee
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2.5 text-xs text-slate-655 dark:text-slate-400 leading-normal">
            <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
            <span>All vendors are registered pharmacies verified by regulatory authorities.</span>
          </li>
          <li className="flex items-start gap-2.5 text-xs text-slate-655 dark:text-slate-400 leading-normal">
            <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
            <span>Transparent seller comparison to select the lowest price and nearest pharmacy.</span>
          </li>
          <li className="flex items-start gap-2.5 text-xs text-slate-655 dark:text-slate-400 leading-normal">
            <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
            <span>Strict temperature-controlled delivery for chemical safety and potency.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
