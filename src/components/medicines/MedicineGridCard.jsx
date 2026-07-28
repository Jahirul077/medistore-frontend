"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

export default function MedicineGridCard({ med }) {
  const dispatch = useDispatch();

  const priceVal = Number(med.price || med.inventories?.[0]?.price || 0);
  const priceDisplay = `$${priceVal.toFixed(2)}`;
  const sellerInventoryId = med.inventories?.[0]?.id || med.sellerInventoryId || med.id;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: med.id,
        sellerInventoryId,
        title: med.title,
        genericName: med.genericName,
        strength: med.strength,
        image: med.image,
        price: priceVal,
        quantity: 1,
      })
    );
    toast.success(`${med.title} added to cart!`);
  };

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1 flex flex-col justify-between p-1">
      {/* Top Image & Details */}
      <div>
        <div className="relative aspect-4/3 w-full bg-slate-50 dark:bg-slate-955 p-5 flex items-center justify-center rounded-2xl border border-slate-100 dark:border-slate-850">
          <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-xs font-bold text-teal-700 dark:text-teal-400 px-3 py-1 rounded-full shadow-xs">
            {med.categories?.title || "Medicine"}
          </span>
          {med.image && (
            <Image
              src={med.image}
              alt={med.title}
              width={200}
              height={200}
              unoptimized
              className="object-contain max-h-36 max-w-full drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Content Area */}
        <div className="p-5 space-y-3">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              {med.manufacturer || med.genericName || "Pharmaceuticals"}
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-teal-600 transition-colors">
              {med.title}
            </h3>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-350 italic">
              {med.genericName} ({med.strength})
            </p>
          </div>
        </div>
      </div>

      {/* Pricing and Action Buttons */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 gap-2">
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {priceDisplay}
          </span>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="sm"
              icon={<ShoppingCart className="h-4 w-4" />}
              className="h-9 px-3.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              Add
            </Button>
            <Link href={`/shop/${med.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3.5 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors duration-250 cursor-pointer dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
