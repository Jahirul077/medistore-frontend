import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function MedicineListCard({ med }) {
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-150/60 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5 transition-all duration-300 hover:shadow-md hover:border-slate-200 dark:hover:border-slate-750">
      {/* Left: Product Image */}
      <div className="relative h-28 w-28 shrink-0 bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 flex items-center justify-center border border-slate-100 dark:border-slate-850">
        <Image
          src={med.image}
          alt={med.title}
          width={90}
          height={90}
          className="object-contain max-h-20 max-w-full drop-shadow-sm group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Middle: Details */}
      <div className="flex-1 space-y-1.5 text-center sm:text-left">
        <div className="flex items-center flex-wrap gap-2 justify-center sm:justify-start">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {med.manufacturer}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-800"></span>
          <span className="text-xs font-bold text-teal-650 bg-teal-50/50 px-2.5 py-0.5 rounded dark:text-teal-400 dark:bg-teal-950/20">
            {med.categories?.title || "Medicine"}
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
          {med.title}
        </h3>

        <p className="text-sm font-semibold text-slate-500 dark:text-slate-455">
          {med.genericName} • {med.strength}
        </p>

        <p className="text-xs text-slate-450 dark:text-slate-500 line-clamp-1 max-w-lg hidden md:block">
          {med.description}
        </p>
      </div>

      {/* Right: Price & Button */}
      <div className="sm:pl-4 sm:border-l border-slate-100 dark:border-slate-850 flex sm:flex-col items-center justify-between sm:justify-center gap-4 sm:gap-2 w-full sm:w-36 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0">
        <div className="text-right sm:text-center">
          {med.oldPrice && (
            <span className="text-xs text-slate-400 line-through block">
              ${med.oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-xl font-black text-slate-900 dark:text-white">
            ${med.price.toFixed(2)}
          </span>
        </div>
        <Link href={`/shop/${med.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="h-8.5 px-4 rounded-lg text-xs font-semibold border-teal-500/20 text-teal-655 bg-teal-50/25 hover:bg-teal-500 hover:text-white dark:border-teal-500/30 dark:text-teal-400 dark:hover:bg-teal-500 dark:hover:text-white cursor-pointer"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
