"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, FolderGrid, X, Layers } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Categories database
const initialCategories = [
  {
    id: "CAT-001",
    name: "Painkiller",
    description: "Analgesics and drugs used to relieve headaches, muscular pains or arthritic symptoms.",
    count: 24,
    status: "Active",
  },
  {
    id: "CAT-002",
    name: "Proton Pump Inhibitor",
    description: "Drugs designed to reduce gastric acid production in patients with acid reflux or ulcers.",
    count: 18,
    status: "Active",
  },
  {
    id: "CAT-003",
    name: "Antihistamine",
    description: "Medications used to treat allergy symptoms such as sneezing, itching, and hives.",
    count: 14,
    status: "Active",
  },
  {
    id: "CAT-004",
    name: "Antibiotic",
    description: "Powerful medicines that fight bacterial infections by killing bacteria or stopping reproduction.",
    count: 32,
    status: "Active",
  },
  {
    id: "CAT-005",
    name: "Vitamin",
    description: "Essential organic compounds required for metabolic health, immune support, and development.",
    count: 40,
    status: "Active",
  },
  {
    id: "CAT-006",
    name: "Cardiology",
    description: "Medications related to heart health, blood pressure control, and circulatory functions.",
    count: 11,
    status: "Disabled",
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add/Edit Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Open modal for adding
  const handleAddClick = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", status: "Active" });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
    });
    setIsModalOpen(true);
  };

  // Delete Category
  const handleDeleteCategory = (categoryId) => {
    const target = categories.find((cat) => cat.id === categoryId);
    if (target && target.count > 0) {
      toast.error(`Cannot delete category "${target.name}" because it contains listed products.`);
      return;
    }

    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    toast.success("Category deleted successfully.");
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editingCategory) {
      // Edit mode
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: formData.name, description: formData.description, status: formData.status }
            : cat
        )
      );
      toast.success("Category updated successfully.");
    } else {
      // Add mode
      const newId = `CAT-00${categories.length + 1}`;
      const newCat = {
        id: newId,
        name: formData.name,
        description: formData.description,
        count: 0,
        status: formData.status,
      };
      setCategories((prev) => [newCat, ...prev]);
      toast.success("Category created successfully.");
    }

    setIsModalOpen(false);
  };

  // Filter Logic
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginated List
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Category Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Configure pharmaceutical categories, view inventory counts, and enable/disable filters.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl cursor-pointer shadow-md transition-colors text-sm shrink-0 self-start sm:self-auto"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Filter Control */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search categories by name or descriptive keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider select-none">
                <th className="py-4 px-6">Category Info</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Medicines Listed</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
              {paginatedCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 dark:text-slate-500">
                    No medical categories found.
                  </td>
                </tr>
              ) : (
                paginatedCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/20 transition-colors"
                  >
                    {/* Name */}
                    <td className="py-4 px-6 font-medium text-slate-800 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 flex items-center justify-center">
                          <Layers size={16} />
                        </div>
                        {cat.name}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-normal max-w-sm truncate">
                      {cat.description}
                    </td>

                    {/* Product count */}
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-normal">
                      {cat.count} items
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${
                          cat.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {cat.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(cat)}
                          title="Edit Category Details"
                          className="p-2 rounded-xl border dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          title="Delete Category"
                          className="p-2 rounded-xl border dark:border-slate-850 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-650 dark:text-rose-400 cursor-pointer transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCategories.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemName="categories"
      />

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-250 z-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cardiology, Antipyretic"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Provide a clear description of the use-cases and clinical group..."
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3.5 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => setFormData({ ...formData, status: val })}
                >
                  <SelectTrigger className="h-11 w-full px-3.5 border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-indigo-500 cursor-pointer rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900 border text-slate-700 dark:text-slate-200">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer border dark:border-slate-800 text-slate-500 dark:text-slate-300 font-medium px-4 py-2.5 rounded-xl flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl flex-1 transition-colors text-sm shadow-md"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
