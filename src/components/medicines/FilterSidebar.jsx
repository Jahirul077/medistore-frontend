import React from "react";
import { Search, Layers, Briefcase, DollarSign, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CATEGORIES, MANUFACTURERS } from "@/app/(main)/shop/mockData";

export default function FilterSidebar({
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
}) {
  return (
    <aside className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 space-y-6 shadow-xs h-fit">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4">
        <h2 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
          <SlidersHorizontal className="h-4.5 w-4.5 text-teal-500" />
          Filters
        </h2>
        <button
          onClick={handleClearFilters}
          className="text-xs text-rose-500 hover:underline font-semibold cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Keyword Search Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Search className="h-3.5 w-3.5" />
          Search Product
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Napa, Seclo, Omeprazole..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-455" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5" />
          Category
        </label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-350 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={categoriesId === ""}
              onChange={() => setCategoriesId("")}
              className="h-4 w-4 text-teal-500 border-slate-300 focus:ring-teal-500"
            />
            <span>All Categories</span>
          </label>
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-350 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={categoriesId === cat.id}
                onChange={() => setCategoriesId(cat.id)}
                className="h-4 w-4 text-teal-500 border-slate-300 focus:ring-teal-500"
              />
              <span>{cat.title}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Manufacturer Filter */}
      <div className="space-y-3.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" />
          Manufacturer
        </label>
        <Select value={manufacturer} onValueChange={setManufacturer}>
          <SelectTrigger className="w-full h-10 px-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-sm text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-teal-500">
            <SelectValue placeholder="All Manufacturers" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            align="start"
            sideOffset={8}
            className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-md p-1"
          >
            <SelectItem value="all-brands">All Manufacturers</SelectItem>
            {MANUFACTURERS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5" />
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min ($)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          />
          <input
            type="number"
            placeholder="Max ($)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          />
        </div>
      </div>
    </aside>
  );
}
