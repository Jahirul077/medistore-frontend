"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Plus, Filter } from "lucide-react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import modular sub-components
import MedicineTable from "@/components/medicinesPageComponents/MedicineTable";
import AddEditMedicineModal from "@/components/medicinesPageComponents/AddEditMedicineModal";
import DeleteConfirmModal from "@/components/medicinesPageComponents/DeleteConfirmModal";
import Pagination from "@/components/common/Pagination";

// Mock initial inventory (increased to show pagination)
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
    generic: "Azithromycin Dihydrate",
    category: "Antibiotic",
    price: 35.0,
    stock: 60,
    dosage: "Tablet",
    company: "Incepta Pharmaceuticals",
  },
  {
    id: "MED-005",
    name: "Ace Plus",
    generic: "Paracetamol + Caffeine",
    category: "Painkiller",
    price: 3.0,
    stock: 0,
    dosage: "Tablet",
    company: "Square Pharmaceuticals",
  },
  {
    id: "MED-006",
    name: "Bextrum Gold",
    generic: "Multivitamin & Multimineral",
    category: "Vitamin",
    price: 12.5,
    stock: 95,
    dosage: "Tablet",
    company: "Beximco Pharmaceuticals",
  },
  {
    id: "MED-007",
    name: "Ceevit 250mg",
    generic: "Ascorbic Acid (Vitamin C)",
    category: "Vitamin",
    price: 1.2,
    stock: 250,
    dosage: "Tablet",
    company: "Square Pharmaceuticals",
  },
  {
    id: "MED-008",
    name: "Tofen 1mg",
    generic: "Ketotifen",
    category: "Antihistamine",
    price: 3.5,
    stock: 80,
    dosage: "Syrup",
    company: "Incepta Pharmaceuticals",
  },
  {
    id: "MED-009",
    name: "Entacyd Plus",
    generic: "Magnesium + Aluminium Hydroxide",
    category: "Painkiller",
    price: 2.0,
    stock: 140,
    dosage: "Suspension",
    company: "Square Pharmaceuticals",
  },
];

function MedicinesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [medicines, setMedicines] = useState(initialMedicines);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add/Edit Modal states
  const [isModalOpen, setIsModalOpen] = useState(searchParams.get("add") === "true");
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

  // Delete confirmation modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);

  // Clear query parameters on mount to avoid double-opening on refresh
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      router.replace("/seller/medicines");
    }
  }, [router, searchParams]);


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

  // Paginated List
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const paginatedMedicines = filteredMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete Initiator
  const handleDeleteTrigger = (med) => {
    setMedicineToDelete(med);
    setIsDeleteModalOpen(true);
  };

  // Delete Executor
  const handleDeleteConfirm = () => {
    if (medicineToDelete) {
      setMedicines((prev) => prev.filter((m) => m.id !== medicineToDelete.id));
      toast.success(`${medicineToDelete.name} removed successfully.`);
      setIsDeleteModalOpen(false);
      setMedicineToDelete(null);
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
      !formData.stock ||
      !formData.company
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (editingMedicine) {
      // Edit mode
      setMedicines((prev) =>
        prev.map((m) =>
          m.id === editingMedicine.id
            ? {
                ...m,
                name: formData.name,
                generic: formData.generic,
                category: formData.category,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                dosage: formData.dosage,
                company: formData.company,
              }
            : m
        )
      );
      toast.success(`${formData.name} updated successfully.`);
    } else {
      // Create mode
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
      toast.success(`${formData.name} added to inventory.`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Medicine Inventory
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Add, update, and manage your pharmaceutical catalog stock counts.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus size={18} />}
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
          className="cursor-pointer font-medium w-full sm:w-auto text-center justify-center shrink-0"
        >
          Add Medicine
        </Button>
      </div>

      {/* Search and Filters Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search brand name, generic formula or manufacturer..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Filter size={16} className="text-slate-400 dark:text-slate-500" />
          <Select
            value={selectedCategory}
            onValueChange={(val) => {
              setSelectedCategory(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-12 w-full md:w-56 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-teal-500 cursor-pointer">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Inventory Table Component */}
      <MedicineTable
        filteredMedicines={paginatedMedicines}
        onEdit={handleEditClick}
        onDelete={handleDeleteTrigger}
      />

      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredMedicines.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemName="medicines"
      />

      {/* Add / Edit Medicine Modal Component */}
      <AddEditMedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
        editingMedicine={editingMedicine}
        categories={categories}
      />

      {/* Custom Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setMedicineToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        medicineName={medicineToDelete ? medicineToDelete.name : ""}
      />
    </div>
  );
}

export default function MedicinesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-48 flex items-center justify-center">
          <span className="text-sm font-medium text-slate-500 animate-pulse">
            Loading Inventory...
          </span>
        </div>
      }
    >
      <MedicinesContent />
    </Suspense>
  );
}
