import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function MedicineGridCard({ med }) {
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-150/60 dark:border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/2 hover:-translate-y-1">
      {/* Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-50 dark:bg-slate-950/40 p-4 flex items-center justify-center border-b border-slate-100/50 dark:border-slate-850">
        <span className="absolute top-2.5 left-2.5 bg-slate-950/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-400 px-2.5 py-0.5 rounded">
          {med.categories?.title || "Medicine"}
        </span>
        <Image
          src={med.image}
          alt={med.title}
          width={180}
          height={180}
          className="object-contain max-h-32 max-w-full drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-3.5">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {med.manufacturer}
          </span>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-teal-500 transition-colors">
            {med.title}
          </h3>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-450 italic">
            {med.genericName} ({med.strength})
          </p>
        </div>

        {/* Pricing and Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100/50 dark:border-slate-850">
          <span className="text-lg font-black text-slate-900 dark:text-white">
            ${med.price.toFixed(2)}
          </span>
          <Link href={`/medicines/${med.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 rounded-lg border-teal-500/20 text-teal-650 bg-teal-50/20 dark:border-teal-500/30 dark:text-teal-450 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 dark:hover:text-white text-xs font-semibold transition-colors duration-250 cursor-pointer"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
