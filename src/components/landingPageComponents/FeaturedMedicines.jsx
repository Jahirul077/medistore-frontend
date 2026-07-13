import React from "react";
import Button from "../common/Button";
import { ShoppingCart, Star, Plus } from "lucide-react";

// Mock medicine data
const MEDICINES = [
  {
    id: 1,
    name: "Napa Extend (Paracetamol)",
    strength: "665 mg",
    manufacturer: "Beximco Pharmaceuticals",
    price: "$2.50",
    oldPrice: "$3.00",
    rating: 4.8,
    reviews: 124,
    badge: "OTC",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30",
    imageBg: "from-blue-500/10 to-teal-500/10",
    pillsColor: "bg-blue-500",
  },
  {
    id: 2,
    name: "Atorvastatin Calcium",
    strength: "10 mg",
    manufacturer: "Square Pharmaceuticals",
    price: "$12.90",
    oldPrice: "$15.00",
    rating: 4.9,
    reviews: 86,
    badge: "Prescription",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30",
    imageBg: "from-rose-500/10 to-orange-500/10",
    pillsColor: "bg-rose-500",
  },
  {
    id: 3,
    name: "Ceevit (Vitamin C)",
    strength: "250 mg",
    manufacturer: "Incepta Pharmaceuticals",
    price: "$4.00",
    oldPrice: "$4.50",
    rating: 4.7,
    reviews: 215,
    badge: "OTC",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30",
    imageBg: "from-amber-500/10 to-orange-500/10",
    pillsColor: "bg-amber-500",
  },
];

export default function FeaturedMedicines() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950/40 dark:text-teal-400">
            Our Top Sellers
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Features Medicines
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Explore our handpicked collection of certified, everyday healthcare essentials and prescription drugs at the best prices.
          </p>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEDICINES.map((med) => (
            <div
              key={med.id}
              className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-slate-100/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-200 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none dark:hover:border-slate-700/80"
            >
              {/* Image Container with Custom Graphic */}
              <div className={`relative h-48 w-full rounded-xl bg-gradient-to-tr ${med.imageBg} flex items-center justify-center overflow-hidden mb-5`}>
                
                {/* Float Pills Graphic */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className={`absolute top-2 w-14 h-6 rounded-full ${med.pillsColor} opacity-85 rotate-[-30deg] border border-white/20 shadow-md flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-wider`}>
                    caps
                  </div>
                  <div className="absolute bottom-2 w-10 h-10 rounded-full bg-white opacity-90 shadow-md flex items-center justify-center text-[10px] font-bold text-slate-800 border border-slate-100">
                    500
                  </div>
                </div>

                {/* Badge Overlay */}
                <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium border ${med.badgeColor}`}>
                  {med.badge}
                </span>

                {/* Hot Offer Overlay */}
                <span className="absolute top-3 right-3 bg-teal-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Save 15%
                </span>
              </div>

              {/* Product Metadata */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {med.manufacturer}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {med.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Strength: <span className="text-slate-700 dark:text-slate-350">{med.strength}</span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-750 dark:text-slate-300">
                      {med.rating}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({med.reviews})
                    </span>
                  </div>
                </div>

                {/* Price and Add button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/80">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 line-through">
                      {med.oldPrice}
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {med.price}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="h-9 px-3 rounded-lg flex items-center gap-1 shadow-sm hover:shadow"
                    icon={<Plus className="h-4 w-4" />}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
