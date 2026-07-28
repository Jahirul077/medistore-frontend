"use client";

import React, { useState, useMemo } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { Grid, List, Sliders } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useGetAllMedicinesQuery from "@/hooks/Medicines/useGetAllMedicinesQuery";
import FilterSidebar from "@/components/medicines/FilterSidebar";
import MobileFilterDrawer from "@/components/medicines/MobileFilterDrawer";
import MedicineGridCard from "@/components/medicines/MedicineGridCard";
import MedicineListCard from "@/components/medicines/MedicineListCard";

export default function MedicinesPage() {
  const [search, setSearch] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [manufacturer, setManufacturer] = useState("all-brands");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [viewType, setViewType] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch medicines from live API using search & filter params
  const {
    data: resData,
    isLoading,
    error,
  } = useGetAllMedicinesQuery({
    search,
    categoriesId,
    manufacturer,
    minPrice,
    maxPrice,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rawMedicines = resData?.data || [];

  const handleClearFilters = () => {
    setSearch("");
    setCategoriesId("");
    setManufacturer("all-brands");
    setMinPrice("");
    setMaxPrice("");
  };

  const filteredMedicines = useMemo(() => {
    let result = [...rawMedicines];

    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const priceA = Number(a.price || a.inventories?.[0]?.price || 0);
        const priceB = Number(b.price || b.inventories?.[0]?.price || 0);
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const priceA = Number(a.price || a.inventories?.[0]?.price || 0);
        const priceB = Number(b.price || b.inventories?.[0]?.price || 0);
        return priceB - priceA;
      });
    }

    return result;
  }, [rawMedicines, sortBy]);

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
          <div className="hidden lg:block sticky top-24">
            <FilterSidebar {...filterProps} />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-semibold text-slate-500 dark:text-slate-450">
                Found{" "}
                <span className="text-teal-500 font-bold">
                  {filteredMedicines.length}
                </span>{" "}
                medicines
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-205 text-slate-700 border border-slate-200/50 text-sm font-semibold dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700 cursor-pointer"
                >
                  <Sliders className="h-4 w-4 text-teal-500" />
                  Filters
                </button>

                <div className="flex items-center gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="flex h-9 w-42.5 items-center justify-between whitespace-nowrap rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-955 px-3 pl-8 text-xs font-bold text-slate-650 dark:text-slate-350 shadow-xs focus:ring-1 focus:ring-teal-500 cursor-pointer">
                      <SelectValue placeholder="Default Sort" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      align="start"
                      sideOffset={8}
                      className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl shadow-md p-1 z-50"
                    >
                      <SelectItem value="default" className="cursor-pointer">
                        Default Sort
                      </SelectItem>
                      <SelectItem value="price-asc" className="cursor-pointer">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc" className="cursor-pointer">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex border border-slate-100 bg-slate-50 p-1 rounded-xl dark:border-slate-855 dark:bg-slate-950/60">
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

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800"
                  ></div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && (error || filteredMedicines.length === 0) && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-950 rounded-full flex items-center justify-center mx-auto">
                  <Sliders className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  No Medicines Found
                </h3>
                <p className="text-sm text-slate-455 dark:text-slate-550 max-w-sm mx-auto">
                  {error
                    ? "Failed to load medicines from backend."
                    : "We couldn't find any products matching your search criteria."}
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

            {/* Content List */}
            {!isLoading &&
              filteredMedicines.length > 0 &&
              (viewType === "grid" ? (
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
              ))}
          </div>
        </div>
      </Container>

      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        {...filterProps}
      />
    </div>
  );
}
