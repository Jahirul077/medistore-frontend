"use client";

import React from "react";
import Button from "../common/Button";
import { Star, ShoppingCart } from "lucide-react";
import Container from "../common/Container";
import Link from "next/link";
import Image from "next/image";
import useGetFeaturedMedicinesQuery from "@/hooks/Medicines/useGetFeaturedMedicinesQuery";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

export default function FeaturedMedicines() {
  const dispatch = useDispatch();
  const { data: resData, isLoading, error } = useGetFeaturedMedicinesQuery();

  const medicines = resData?.data || [];

  const handleAddToCart = (med) => {
    const priceVal = Number(med.inventories?.[0]?.price || 0);
    const sellerInventoryId = med.inventories?.[0]?.id || med.id;

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
    <section className="py-16 bg-slate-50/50 dark:bg-slate-950">
      <Container>
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/40 dark:text-teal-400">
            Our Top Sellers
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Featured Medicines
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Explore our handpicked collection of certified, everyday healthcare essentials and prescription drugs at the best prices.
          </p>
        </div>

        {/* Loading Skeleton State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800"></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (error || medicines.length === 0) && (
          <div className="text-center py-12 text-slate-500 font-semibold">
            {error ? "Failed to load featured medicines." : "No featured medicines available right now."}
          </div>
        )}

        {/* Product Cards Grid */}
        {!isLoading && medicines.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {medicines.map((med) => {
              const priceVal = Number(med.inventories?.[0]?.price || 0);
              const price = `$${priceVal.toFixed(2)}`;

              return (
                <div
                  key={med.id}
                  className="group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/30 transition-all duration-350 hover:-translate-y-2 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none dark:hover:border-teal-500/20"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden mb-6 p-6 border border-slate-100/50 dark:border-slate-850">
                    
                    {/* Category Badge Overlay */}
                    {med.categories?.title && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-teal-700 border border-slate-100 shadow-xs dark:bg-slate-900/90 dark:text-teal-400 dark:border-slate-800">
                          {med.categories.title}
                        </span>
                      </div>
                    )}

                    {/* Strength Badge Overlay */}
                    {med.strength && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-teal-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {med.strength}
                        </span>
                      </div>
                    )}

                    {/* Medicine Product Image */}
                    {med.image && (
                      <Image
                        src={med.image}
                        alt={med.title}
                        width={200}
                        height={200}
                        unoptimized
                        className="object-contain max-h-40 max-w-full drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    )}
                  </div>

                  {/* Product Metadata */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Generic Name & Rating Row */}
                      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                        <span className="font-semibold tracking-wide uppercase text-[10px]">
                          {med.genericName || "Medicine"}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-full dark:bg-amber-500/10">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="font-bold text-slate-750 dark:text-slate-350">4.8</span>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors duration-300">
                        {med.title}
                      </h3>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 gap-2">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                          {price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleAddToCart(med)}
                          variant="primary"
                          size="md"
                          icon={<ShoppingCart className="h-4 w-4" />}
                          className="h-10 px-3.5 text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Add
                        </Button>
                        <Link href={`/shop/${med.id}`}>
                          <Button
                            variant="outline"
                            size="md"
                            className="h-10 px-3 text-xs font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer"
                          >
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </Container>
    </section>
  );
}
