"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  X,
  FileText,
  Filter,
  Check,
} from "lucide-react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";

// Mock initial inventory
const initialMedicines = [
  {
    id: "MED-001",
    name: "Napa Extra",
    generic: "Paracetamol + Caffeine",
    category: "Painkiller",
    price: 2.5,
    stock: 120,
    dosage: "Tablet",
    company: "Beximco Pharmaceuticals",
  },
  {
    id: "MED-002",
    name: "Sergel 20",
    generic: "Esomeprazole",
    category: "Proton Pump Inhibitor",
    price: 7.0,
    stock: 8,
    dosage: "Capsule",
    company: "Healthcare Pharmaceuticals",
  },
  {
    id: "MED-003",
    name: "Fexo 120",
    generic: "Fexofenadine Hydrochloride",
    category: "Antihistamine",
    price: 8.0,
    stock: 45,
    dosage: "Tablet",
    company: "Square Pharmaceuticals",
  },
  {
    id: "MED-004",
    name: "Azithrocin 500",
    generic: "Azithromycin",
    category: "Antibiotic",
    price: 35.0,
    stock: 18,
    dosage: "Tablet",
    company: "Beximco Pharmaceuticals",
  },
  {
    id: "MED-005",
    name: "Neuro-B",
    generic: "Vitamin B1 + B6 + B12",
    category: "Vitamin",
    price: 9.0,
    stock: 0,
    dosage: "Tablet",
    company: "Square Pharmaceuticals",
  },
  {
    id: "MED-006",
    name: "Alatrol 10",
    generic: "Cetirizine Hydrochloride",
    category: "Antihistamine",
    price: 3.0,
    stock: 250,
    dosage: "Tablet",
    company: "Square Pharmaceuticals",
  },
];

// Inner component to handle parameters safely in Suspense
function MedicinesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [medicines, setMedicines] = useState(initialMedicines);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    generic: "",
    category: "Painkiller",
    price: "",
    stock: "",
    dosage: "Tablet",
    company: "",
  });

  // Open "Add Modal" if URL contains query param ?add=true
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      setIsModalOpen(true);
      setEditingMedicine(null);
      setFormData({
        name: "",
        generic: "",
        category: "Painkiller",
        price: "",
        stock: "",
        dosage: "Tablet",
        company: "",
      });
      // Clear param without reload
      router.replace("/seller/medicines");
    }
  }, [searchParams, router]);

  // Categories list
  const categories = [
    "All",
    "Painkiller",
    "Proton Pump Inhibitor",
    "Antihistamine",
    "Antibiotic",
    "Vitamin",
  ];

  // Filtering Logic
  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.generic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || med.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Delete Handlers
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setMedicines((prev) => prev.filter((m) => m.id !== id));
      toast.success(`${name} removed successfully.`);
    }
  };

  // Edit Initiator
  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      generic: medicine.generic,
      category: medicine.category,
      price: medicine.price,
      stock: medicine.stock,
      dosage: medicine.dosage,
      company: medicine.company,
    });
    setIsModalOpen(true);
  };

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.generic ||
      !formData.price ||
      formData.stock === "" ||
      !formData.company
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editingMedicine) {
      // Edit mode
      setMedicines((prev) =>
        prev.map((med) =>
          med.id === editingMedicine.id
            ? {
                ...med,
                name: formData.name,
                generic: formData.generic,
                category: formData.category,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                dosage: formData.dosage,
                company: formData.company,
              }
            : med
        )
      );
      toast.success("Medicine updated successfully!");
    } else {
      // Add mode
      const newMed = {
        id: `MED-00${medicines.length + 1}`,
        name: formData.name,
        generic: formData.generic,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        dosage: formData.dosage,
        company: formData.company,
      };
      setMedicines((prev) => [newMed, ...prev]);
      toast.success("New medicine added successfully!");
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Medicine Inventory
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">
            Add, update, or remove medicines from your database.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={16} />}
          onClick={() => {
            setEditingMedicine(null);
            setFormData({
              name: "",
              generic: "",
              category: "Painkiller",
              price: "",
              stock: "",
              dosage: "Tablet",
              company: "",
            });
            setIsModalOpen(true);
          }}
          className="cursor-pointer font-bold shadow-md shadow-teal-500/10"
        >
          Add New Medicine
        </Button>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/85 flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by brand name, generic name, or manufacturer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Filter size={16} className="text-slate-400 dark:text-slate-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-11 w-full md:w-56 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/85 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800/50">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Medicine
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Dosage / Form
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Price
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-805/50">
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((med) => {
                  const isLowStock = med.stock > 0 && med.stock <= 10;
                  const isOutOfStock = med.stock === 0;

                  return (
                    <tr
                      key={med.id}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Name & Generic & Company */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {med.name}
                          </span>
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 italic mt-0.5">
                            {med.generic}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-600 font-semibold mt-1">
                            {med.company}
                          </span>
                        </div>
                      </td>

                      {/* Dosage Form */}
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350">
                          {med.dosage}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="text-sm font-semibold text-slate-655 dark:text-slate-400">
                          {med.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          ${med.price.toFixed(2)}
                        </span>
                      </td>

                      {/* Stock Info */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-sm font-extrabold ${
                                isOutOfStock
                                  ? "text-rose-500"
                                  : isLowStock
                                  ? "text-amber-500"
                                  : "text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {med.stock} Units
                            </span>
                            {isOutOfStock && (
                              <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400">
                                Empty
                              </span>
                            )}
                            {isLowStock && (
                              <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 flex items-center gap-0.5">
                                <AlertTriangle size={10} />
                                Low
                              </span>
                            )}
                          </div>
                          {/* Progress bar */}
                          <div className="w-24 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isOutOfStock
                                  ? "bg-rose-500"
                                  : isLowStock
                                  ? "bg-amber-500"
                                  : "bg-teal-500"
                              }`}
                              style={{
                                width: `${Math.min(
                                  (med.stock / 250) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(med)}
                            className="p-2 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-teal-50/50 dark:text-slate-450 dark:hover:text-teal-400 dark:hover:bg-teal-950/20 transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(med.id, med.name)}
                            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 dark:text-slate-450 dark:hover:text-rose-400 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 px-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FileText className="h-10 w-10 text-slate-300 dark:text-slate-700" />
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        No medicines matched your criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal (Glassmorphism Slide Over Drawer or Dialog) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-50 dark:border-slate-800/80">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {editingMedicine ? "Edit Medicine Details" : "Add New Medicine"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
              {/* Medicine Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Napa Extra"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Generic Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Generic Composition
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paracetamol + Caffeine"
                  value={formData.generic}
                  onChange={(e) =>
                    setFormData({ ...formData, generic: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Manufacturer / Pharmaceutical Company */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Manufacturer
                </label>
                <input
                  type="text"
                  placeholder="e.g. Square Pharmaceuticals"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Dosage Form */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Dosage Form
                  </label>
                  <select
                    value={formData.dosage}
                    onChange={(e) =>
                      setFormData({ ...formData, dosage: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Suspension">Suspension</option>
                    <option value="Injection">Injection</option>
                    <option value="Ointment">Ointment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                    className="w-full h-11 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {/* Stock Level */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50 dark:border-slate-800/80 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer border-slate-200 dark:border-slate-800 font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<Check size={16} />}
                  className="cursor-pointer font-bold"
                >
                  {editingMedicine ? "Save Changes" : "Create Medicine"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MedicinesPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-48 flex items-center justify-center">
        <span className="text-sm font-semibold text-slate-400 animate-pulse">Loading Inventory...</span>
      </div>
    }>
      <MedicinesContent />
    </Suspense>
  );
}
