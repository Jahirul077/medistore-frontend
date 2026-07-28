"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

export default function MedicineListCard({ med }) {
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
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700">
      {/* Left: Product Image */}
      {med.image && (
        <div className="relative h-32 w-32 shrink-0 bg-slate-50 dark:bg-slate-955 rounded-2xl p-4 flex items-center justify-center border border-slate-100 dark:border-slate-850">
          <Image
            src={med.image}
            alt={med.title}
            width={100}
            height={100}
            unoptimized
            className="object-contain max-h-24 max-w-full drop-shadow-sm group-hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* Middle: Details */}
      <div className="flex-1 space-y-2 text-center sm:text-left">
        <div className="flex items-center flex-wrap gap-2.5 justify-center sm:justify-start">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {med.manufacturer || med.genericName || "Pharmaceuticals"}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
          <span className="text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full dark:text-teal-400 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-900">
            {med.categories?.title || "Medicine"}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight">
          {med.title}
        </h3>

        <p className="text-sm font-normal text-slate-500 dark:text-slate-400">
          {med.genericName} • {med.strength}
        </p>
      </div>

      {/* Right: Price & Actions */}
      <div className="sm:pl-6 sm:border-l border-slate-100 dark:border-slate-800 flex sm:flex-col items-center justify-between sm:justify-center gap-4 sm:gap-3 w-full sm:w-48 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0">
        <div className="text-right sm:text-center">
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {priceDisplay}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="md"
            icon={<ShoppingCart className="h-4 w-4" />}
            className="h-10 px-4 rounded-xl text-xs font-medium cursor-pointer"
          >
            Add
          </Button>
          <Link href={`/shop/${med.id}`}>
            <Button
              variant="outline"
              size="md"
              className="h-10 px-4 rounded-xl text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
