import React from "react";
import Button from "../common/Button";
import { Star } from "lucide-react";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";

// Mock medicine data matching the database schema
const MEDICINES = [
  {
    id: "fc93b9d7-5153-4589-a3c8-e0279654b00a",
    title: "Seclo 20",
    genericName: "Omeprazole",
    strength: "20mg",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop",
    categories: {
      id: "b3413852-ebe2-441f-911b-032f93da3268",
      title: "Capsule",
    },
    manufacturer: "Square Pharmaceuticals",
    price: "$3.50",
    oldPrice: "$4.20",
    rating: 4.8,
    reviews: 124,
    imageBg: "from-blue-500/5 to-teal-500/5",
  },
  {
    id: "ac93b9d7-5153-4589-a3c8-e0279654b00b",
    title: "Napa Extend",
    genericName: "Paracetamol",
    strength: "665mg",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop",
    categories: {
      id: "b3413852-ebe2-441f-911b-032f93da3269",
      title: "Tablet",
    },
    manufacturer: "Beximco Pharmaceuticals",
    price: "$2.20",
    oldPrice: "$2.75",
    rating: 4.9,
    reviews: 98,
    imageBg: "from-emerald-500/5 to-teal-500/5",
  },
  {
    id: "dc93b9d7-5153-4589-a3c8-e0279654b00c",
    title: "Ceevit",
    genericName: "Ascorbic Acid",
    strength: "250mg",
    image: "https://images.unsplash.com/photo-1616679911721-fe6eec14035a?q=80&w=300&auto=format&fit=crop",
    categories: {
      id: "b3413852-ebe2-441f-911b-032f93da3270",
      title: "Chewable Tablet",
    },
    manufacturer: "Incepta Pharmaceuticals",
    price: "$4.00",
    oldPrice: "$4.50",
    rating: 4.7,
    reviews: 215,
    imageBg: "from-amber-500/5 to-orange-500/5",
  },
];

export default function FeaturedMedicines() {
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

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEDICINES.map((med) => (
            <div
              key={med.id}
              className="group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/30 transition-all duration-350 hover:-translate-y-2 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none dark:hover:border-teal-500/20"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden mb-6 p-6 border border-slate-100/50 dark:border-slate-850">
                
                {/* Category Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-teal-700 border border-slate-100 shadow-xs dark:bg-slate-900/90 dark:text-teal-400 dark:border-slate-800">
                    {med.categories.title}
                  </span>
                </div>

                {/* Offer Badge Overlay */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-teal-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Save 15%
                  </span>
                </div>

                {/* Medicine Product Image */}
                <Image
                  src={med.image}
                  alt={med.title}
                  width={220}
                  height={220}
                  className="object-contain max-h-40 max-w-full drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Product Metadata */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Manufacturer & Rating Row */}
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span className="font-semibold tracking-wide uppercase text-[10px]">
                      {med.manufacturer}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-full dark:bg-amber-500/10">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-bold text-slate-750 dark:text-slate-350">{med.rating}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors duration-300">
                    {med.title}
                  </h3>
                </div>

                {/* Price and Action Button */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-medium">
                      {med.oldPrice}
                    </span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {med.price}
                    </span>
                  </div>

                  <Link href={`/medicines/${med.id}`}>
                    <Button
                      variant="outline"
                      size="md"
                      className="h-10 px-5 text-sm font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-teal-500 hover:text-white hover:border-teal-500 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-teal-500 dark:hover:text-white dark:hover:border-teal-500 transition-all duration-300 shadow-xs cursor-pointer"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
