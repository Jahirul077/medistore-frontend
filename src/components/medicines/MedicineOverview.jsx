"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Briefcase,
  ShieldCheck,
  Truck,
  FileText,
  AlertCircle,
  Thermometer,
  CheckCircle2,
} from "lucide-react";

export default function MedicineOverview({ medicine }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="space-y-8">
      {/* Main Product Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
          {/* Image Container with Glass Frame */}
          {medicine?.image && (
            <div className="relative w-full max-w-70 aspect-square rounded-2xl bg-slate-50 dark:bg-slate-950 p-6 flex items-center justify-center border border-slate-150/50 dark:border-slate-850 shadow-sm shrink-0">
              <Image
                src={medicine.image}
                alt={medicine?.title || "Medicine"}
                fill
                className="object-contain p-6 drop-shadow-md"
                priority
                unoptimized
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-teal-50/90 dark:bg-teal-950/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-teal-650 dark:text-teal-400">
                <Layers className="h-3.5 w-3.5" />
                {medicine?.categories?.title || "Medicine"}
              </div>
            </div>
          )}

          {/* Details Meta */}
          <div className="flex-1 space-y-4 text-center md:text-left w-full">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-455 dark:text-slate-500">
                <Briefcase className="h-3.5 w-3.5 text-teal-505" />
                {medicine?.manufacturer || "Pharmaceuticals"}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {medicine?.title}
              </h1>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300">
                {medicine?.genericName} • {medicine?.strength}
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-[15px] leading-relaxed">
              {medicine?.description || "High-quality pharmaceutical medicine formulation."}
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-teal-605 dark:text-teal-400">
                <ShieldCheck className="h-4.5 w-4.5" />
                100% Authentic Product
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-teal-650 dark:text-teal-400">
                <Truck className="h-4.5 w-4.5" />
                Fast Pharmacy Delivery
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Tabs Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-955/40 p-1.5">
          {[
            { id: "description", label: "Overview & Dosage", icon: FileText },
            { id: "side-effects", label: "Side Effects", icon: AlertCircle },
            { id: "storage", label: "Storage & Safety", icon: Thermometer },
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-teal-605 shadow-sm dark:bg-slate-900 dark:text-teal-400"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350"
                }`}
              >
                <IconComp className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 md:p-8 min-h-[160px]">
          {activeTab === "description" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Indications
                </h4>
                <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed">
                  {medicine?.description}
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Dosage & Administration
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {medicine?.dosage || "As directed by a certified healthcare professional."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "side-effects" && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertCircle className="h-4.5 w-4.5 text-amber-505" />
                Common Adverse Effects
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {medicine?.sideEffects || "No severe side effects reported when taken under recommended guidelines."}
              </p>
            </div>
          )}

          {activeTab === "storage" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Storage Conditions
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {medicine?.storage || "Store below 30°C in a dry place. Protect from direct light."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
