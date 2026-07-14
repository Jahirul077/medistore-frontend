import React from "react";
import Container from "@/components/common/Container";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Modular sub-components and mock data
import { MOCK_MEDICINES_DETAILS, DEFAULT_MEDICINE } from "@/app/(main)/medicines/mockData";
import MedicineOverview from "@/components/medicines/MedicineOverview";
import MedicineOffers from "@/components/medicines/MedicineOffers";

export default async function MedicineDetailsPage({ params }) {
  const { id } = await params;
  const medicine = MOCK_MEDICINES_DETAILS[id] || DEFAULT_MEDICINE;

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pt-28 pb-16">
      <Container>
        {/* Navigation Breadcrumbs */}
        <div className="mb-8">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-teal-650 transition-colors mb-4 group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Catalog
          </Link>

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <Link href="/" className="hover:text-teal-655 transition-colors cursor-pointer">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/medicines" className="hover:text-teal-655 transition-colors cursor-pointer">
              Medicines
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-teal-500">{medicine.title}</span>
          </div>
        </div>

        {/* Details Grid Layout */}
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
      </Container>
    </div>
  );
}
