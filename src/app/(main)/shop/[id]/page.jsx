import React from "react";
import Container from "@/components/common/Container";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Modular sub-components and mock data
import { MOCK_MEDICINES_DETAILS, DEFAULT_MEDICINE } from "@/app/(main)/shop/mockData";
import MedicineOverview from "@/components/medicines/MedicineOverview";
import MedicineOffers from "@/components/medicines/MedicineOffers";
import MedicineReviews from "@/components/medicines/MedicineReviews";

export default async function MedicineDetailsPage({ params }) {
  const { id } = await params;
  const medicine = MOCK_MEDICINES_DETAILS[id] || DEFAULT_MEDICINE;

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

        {/* Reviews Section */}
        <MedicineReviews />
      </Container>
    </div>
  );
}
