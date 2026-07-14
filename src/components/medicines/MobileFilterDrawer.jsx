import React from "react";
import { Sliders, X, Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CATEGORIES, MANUFACTURERS } from "@/app/(main)/shop/mockData";

export default function MobileFilterDrawer({
  isOpen,
  onClose,
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
      />

      {/* Drawer content */}
      <div className="relative w-80 max-w-full bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl border-l border-slate-100 dark:border-slate-850 p-6 space-y-6 overflow-y-auto animate-slide-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="h-4.5 w-4.5 text-teal-500" />
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Keyword Search Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Search Product
          </label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Napa, Seclo..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-850 focus:outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            />
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-455" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Category
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-350 cursor-pointer">
              <input
                type="radio"
                name="category-mobile"
                checked={categoriesId === ""}
                onChange={() => setCategoriesId("")}
                className="h-4 w-4 text-teal-500 border-slate-300 focus:ring-teal-500"
              />
              <span>All Categories</span>
            </label>
            {CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-350 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category-mobile"
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
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Manufacturer
          </label>
          <Select value={manufacturer} onValueChange={setManufacturer}>
            <SelectTrigger className="w-full h-10 px-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-955 text-sm text-slate-850 dark:text-slate-200 focus:ring-1 focus:ring-teal-500">
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
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
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

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          <button
            onClick={handleClearFilters}
            className="w-full py-2.5 text-sm font-semibold rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-850 dark:text-slate-355 dark:hover:bg-slate-800 cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-semibold rounded-2xl bg-teal-500 hover:bg-teal-600 text-white shadow-md shadow-teal-500/10 cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
