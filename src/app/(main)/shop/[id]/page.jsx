"use client";

import React, { use } from "react";
import Container from "@/components/common/Container";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import useGetMedicineByIdQuery from "@/hooks/Medicines/useGetMedicineByIdQuery";

import MedicineOverview from "@/components/medicines/MedicineOverview";
import MedicineOffers from "@/components/medicines/MedicineOffers";
import MedicineReviews from "@/components/medicines/MedicineReviews";

export default function MedicineDetailsPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const { data: resData, isLoading, error } = useGetMedicineByIdQuery(id);
  const medicine = resData?.data;

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pt-28 pb-16">
      <Container>
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-teal-650 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center animate-pulse space-y-4 border border-slate-100 dark:border-slate-800">
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto"></div>
            <div className="h-6 w-96 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto"></div>
            <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl mt-6"></div>
          </div>
        )}

        {/* Error or Not Found State */}
        {!isLoading && (error || !medicine) && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Medicine Not Found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {error ? "Failed to load medicine details." : "The requested medicine could not be found."}
            </p>
            <Link
              href="/shop"
              className="inline-block px-5 py-2.5 rounded-xl bg-teal-500 text-white font-bold text-sm"
            >
              Back to Catalog
            </Link>
          </div>
        )}

        {/* Details Content */}
        {!isLoading && medicine && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Product Overview details (7 cols) */}
              <div className="lg:col-span-7">
                <MedicineOverview medicine={medicine} />
              </div>

              {/* Right Side: Available Offers lists (5 cols) */}
              <div className="lg:col-span-5">
                <MedicineOffers medicine={medicine} />
              </div>
            </div>

            {/* Reviews Section */}
            <MedicineReviews medicineId={id} />
          </>
        )}
      </Container>
    </div>
  );
}
