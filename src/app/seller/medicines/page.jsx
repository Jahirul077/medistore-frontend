"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Plus, Filter } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import MedicineTable from "@/components/medicinesPageComponents/MedicineTable";
import AddEditMedicineModal from "@/components/medicinesPageComponents/AddEditMedicineModal";
import DeleteConfirmModal from "@/components/medicinesPageComponents/DeleteConfirmModal";
import Pagination from "@/components/common/Pagination";
import useGetSellerMedicinesQuery from "@/hooks/Seller/useGetSellerMedicinesQuery";
import useUpdateSellerMedicineMutation from "@/hooks/Seller/useUpdateSellerMedicineMutation";
import useAddSellerMedicineMutation from "@/hooks/Seller/useAddSellerMedicineMutation";
import useDeleteSellerMedicineMutation from "@/hooks/Seller/useDeleteSellerMedicineMutation";

function MedicinesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: resData, isLoading, refetch } = useGetSellerMedicinesQuery();
  const inventoryItems = resData?.data || [];

  // Update Medicine Mutation
  const { mutate: updateMedicine, isPending: isUpdating } = useUpdateSellerMedicineMutation({
    onSuccess: (res) => {
      toast.success(res?.message || "Medicine updated successfully!");
      setIsModalOpen(false);
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update medicine.");
    },
  });

  // Add Medicine Mutation
  const { mutate: addMedicine, isPending: isAdding } = useAddSellerMedicineMutation({
    onSuccess: (res) => {
      toast.success(res?.message || "Medicine added to inventory successfully!");
      setIsModalOpen(false);
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to add medicine.");
    },
  });

  // Delete Medicine Mutation
  const { mutate: deleteMedicine, isPending: isDeleting } = useDeleteSellerMedicineMutation({
    onSuccess: (res) => {
      toast.success(res?.message || "Medicine removed from inventory!");
      setIsDeleteModalOpen(false);
      setMedicineToDelete(null);
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete medicine.");
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Add/Edit Modal states
  const [isModalOpen, setIsModalOpen] = useState(searchParams.get("add") === "true");
  const [editingMedicine, setEditingMedicine] = useState(null);
  
  const initialFormState = {
    title: "",
    genericName: "",
    strength: "",
    description: "",
    isFeatured: false,
    image: "",
    manufacturer: "",
    categoriesId: "",
    price: "",
    stock: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Delete confirmation modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState(null);

  useEffect(() => {
    if (searchParams.get("add") === "true") {
      router.replace("/seller/medicines");
    }
  }, [router, searchParams]);

  // Format inventory items for MedicineTable component
  const formattedMedicines = inventoryItems.map((item) => {
    const med = item.medicines || {};
    return {
      id: item.id,
      medicinesId: item.medicinesId,
      name: med.title || "Medicine Item",
      title: med.title || "Medicine Item",
      generic: med.genericName || "Generic Formula",
      category: med.categories?.title || "Healthcare",
      price: Number(item.price || 0),
      stock: Number(item.stock || 0),
      dosage: med.strength || med.categories?.title || "Tablet",
      company: med.manufacturer || "Pharmaceuticals",
    };
  });

  // Dynamic Categories list
  const categoriesSet = new Set(formattedMedicines.map((m) => m.category).filter(Boolean));
  const categories = ["All", ...Array.from(categoriesSet)];

  // Filtering Logic
  const filteredMedicines = formattedMedicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.generic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || med.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredMedicines.length / itemsPerPage));
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
      deleteMedicine(medicineToDelete.id);
    }
  };

  // Edit Initiator
  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      title: medicine.title || medicine.name,
      genericName: medicine.generic,
      strength: medicine.dosage,
      description: "",
      isFeatured: false,
      image: "",
      manufacturer: medicine.company,
      categoriesId: "",
      price: medicine.price,
      stock: medicine.stock,
    });
    setIsModalOpen(true);
  };

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.price || !formData.stock) {
      toast.error("Please provide valid price and stock values.");
      return;
    }

    if (editingMedicine) {
      updateMedicine({
        id: editingMedicine.id,
        data: {
          price: Number(formData.price),
          stock: Number(formData.stock),
          title: formData.title,
        },
      });
    } else {
      if (!formData.title || !formData.genericName || !formData.categoriesId) {
        toast.error("Please fill in all required fields.");
        return;
      }

      addMedicine({
        title: formData.title,
        genericName: formData.genericName,
        strength: formData.strength,
        description: formData.description,
        isFeatured: !!formData.isFeatured,
        image: formData.image || "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600",
        manufacturer: formData.manufacturer,
        categoriesId: formData.categoriesId,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
    }
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
            setFormData(initialFormState);
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

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          ))}
        </div>
      )}

      {/* Inventory Table Component */}
      {!isLoading && (
        <MedicineTable
          filteredMedicines={paginatedMedicines}
          onEdit={handleEditClick}
          onDelete={handleDeleteTrigger}
        />
      )}

      {/* Reusable Pagination Component */}
      {!isLoading && filteredMedicines.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredMedicines.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemName="medicines"
        />
      )}

      {/* Add / Edit Medicine Modal Component */}
      <AddEditMedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
        editingMedicine={editingMedicine}
        isPending={isUpdating || isAdding}
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
        isPending={isDeleting}
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
