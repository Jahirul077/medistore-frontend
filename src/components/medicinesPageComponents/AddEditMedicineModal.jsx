"use client";

import React from "react";
import { X, Check } from "lucide-react";
import Button from "@/components/common/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddEditMedicineModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingMedicine,
  categories,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b dark:border-slate-800/80">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            {editingMedicine ? "Edit Medicine Details" : "Add New Medicine"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4 pt-4">
          {/* Medicine Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Brand Name
            </label>
            <input
              type="text"
              placeholder="e.g. Napa Extra"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-12 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Generic Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Generic Composition
            </label>
            <input
              type="text"
              placeholder="e.g. Paracetamol + Caffeine"
              value={formData.generic}
              onChange={(e) =>
                setFormData({ ...formData, generic: e.target.value })
              }
              className="w-full h-12 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Manufacturer / Pharmaceutical Company */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Manufacturer
            </label>
            <input
              type="text"
              placeholder="e.g. Square Pharmaceuticals"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full h-12 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger className="w-full h-12 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:ring-teal-500 cursor-pointer">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border dark:border-slate-800 text-slate-700 dark:text-slate-200">
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dosage Form */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Dosage Form
              </label>
              <Select
                value={formData.dosage}
                onValueChange={(val) => setFormData({ ...formData, dosage: val })}
              >
                <SelectTrigger className="w-full h-12 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:ring-teal-500 cursor-pointer">
                  <SelectValue placeholder="Select Dosage" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border dark:border-slate-800 text-slate-700 dark:text-slate-200">
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="Capsule">Capsule</SelectItem>
                  <SelectItem value="Syrup">Syrup</SelectItem>
                  <SelectItem value="Suspension">Suspension</SelectItem>
                  <SelectItem value="Injection">Injection</SelectItem>
                  <SelectItem value="Ointment">Ointment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 5.50"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full h-12 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Stock Level */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Stock Quantity
              </label>
              <input
                type="number"
                placeholder="e.g. 100"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full h-12 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t dark:border-slate-800/80 mt-4">
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={onClose}
              className="cursor-pointer border dark:border-slate-800 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Check size={18} />}
              className="cursor-pointer font-medium"
            >
              {editingMedicine ? "Save Changes" : "Create Medicine"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
