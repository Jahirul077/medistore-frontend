"use client";

import React, { useState, useMemo } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import {
  Grid,
  List,
  ArrowUpDown,
  Sliders,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom components and mock data imports
import { MEDICINES_DATA } from "./mockData";
import FilterSidebar from "@/components/medicines/FilterSidebar";
import MobileFilterDrawer from "@/components/medicines/MobileFilterDrawer";
import MedicineGridCard from "@/components/medicines/MedicineGridCard";
import MedicineListCard from "@/components/medicines/MedicineListCard";

export default function MedicinesPage() {
  // Query parameter filters states matching the user's API keys
  const [search, setSearch] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [manufacturer, setManufacturer] = useState("all-brands");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // UI layout states
  const [viewType, setViewType] = useState("grid"); // "grid" | "list"
  const [sortBy, setSortBy] = useState("default"); // "default" | "price-asc" | "price-desc" | "rating"
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setCategoriesId("");
    setManufacturer("all-brands");
    setMinPrice("");
    setMaxPrice("");
  };

  // Filtered & Sorted medicines calculation
  const filteredMedicines = useMemo(() => {
    let result = [...MEDICINES_DATA];

    // 1. Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.genericName.toLowerCase().includes(query) ||
          m.manufacturer.toLowerCase().includes(query)
      );
    }

    // 2. Category filter
    if (categoriesId) {
      result = result.filter((m) => m.categoriesId === categoriesId);
    }

    // 3. Manufacturer filter
    if (manufacturer && manufacturer !== "all-brands") {
      result = result.filter((m) => m.manufacturer === manufacturer);
    }

    // 4. Min Price filter
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        result = result.filter((m) => m.price >= min);
      }
    }

    // 5. Max Price filter
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        result = result.filter((m) => m.price <= max);
      }
    }

    // 6. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, categoriesId, manufacturer, minPrice, maxPrice, sortBy]);

  // Combined filters bundle to pass to filter components
  const filterProps = {
    search,
    setSearch,
    categoriesId,
    setCategoriesId,
    manufacturer,
    setManufacturer,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleClearFilters,
  };

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pt-28 pb-16">
      <Container>
        {/* Page Header */}
        <div className="mb-10 text-left border-b border-slate-200/50 dark:border-slate-800 pb-6">

          <h1 className="text-3xl font-black text-slate-900 dark:text-white md:text-4xl tracking-tight">
            Medicines & Essentials
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Browse through authentic prescription medications and OTC drugs.
            Filter by categories, brands, or price.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* 1. Desktop Sidebar Filters (Hidden on Mobile) */}
          <div className="hidden lg:block sticky top-24">
            <FilterSidebar {...filterProps} />
          </div>

          {/* 2. Main Content Listing (Right Side) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Catalog Controls bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-semibold text-slate-500 dark:text-slate-450">
                Found{" "}
                <span className="text-teal-500 font-bold">
                  {filteredMedicines.length}
                </span>{" "}
                medicines
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-205 text-slate-700 border border-slate-200/50 text-sm font-semibold dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700 cursor-pointer"
                >
                  <Sliders className="h-4 w-4 text-teal-500" />
                  Filters
                </button>

                <div className="flex items-center gap-3">
                  {/* Sorting Control */}
                  <div className="relative flex items-center gap-1 select-container-sort">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="flex h-9 w-[170px] items-center justify-between whitespace-nowrap rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-955 px-3 pl-8 text-xs font-bold text-slate-650 dark:text-slate-350 shadow-xs focus:ring-1 focus:ring-teal-500 cursor-pointer">
                        <ArrowUpDown className="h-3.5 w-3.5 text-slate-450 absolute left-2.5 pointer-events-none" />
                        <SelectValue placeholder="Default Sort" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={8}
                        className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl shadow-md p-1 z-50"
                      >
                        <SelectItem value="default" className="cursor-pointer">Default Sort</SelectItem>
                        <SelectItem value="price-asc" className="cursor-pointer">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc" className="cursor-pointer">Price: High to Low</SelectItem>
                        <SelectItem value="rating" className="cursor-pointer">Popularity (Rating)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Grid/List View Toggles */}
                  <div className="hidden sm:flex border border-slate-100 bg-slate-50 p-1 rounded-xl dark:border-slate-850 dark:bg-slate-950/60">
                    <button
                      onClick={() => setViewType("grid")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewType === "grid"
                          ? "bg-white text-teal-600 shadow-xs dark:bg-slate-800 dark:text-teal-400"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewType("list")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewType === "list"
                          ? "bg-white text-teal-600 shadow-xs dark:bg-slate-800 dark:text-teal-400"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredMedicines.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-950 rounded-full flex items-center justify-center mx-auto">
                  <Sliders className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  No Medicines Found
                </h3>
                <p className="text-sm text-slate-450 dark:text-slate-550 max-w-sm mx-auto">
                  We couldn't find any products matching your search criteria.
                  Try modifying your filters or search keywords.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleClearFilters}
                  className="cursor-pointer"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Results Grid / List */}
            {viewType === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredMedicines.map((med) => (
                  <MedicineGridCard key={med.id} med={med} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMedicines.map((med) => (
                  <MedicineListCard key={med.id} med={med} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* 3. Collapsible Mobile Filter Sidebar Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        {...filterProps}
      />
    </div>
  );
}
