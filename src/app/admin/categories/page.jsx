"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Layers,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Pagination from "@/components/common/Pagination";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

import useGetCategoriesQuery from "@/hooks/Categories/useGetCategoriesQuery";
import useCreateCategoryMutation from "@/hooks/Categories/useCreateCategoryMutation";
import useUpdateCategoryMutation from "@/hooks/Categories/useUpdateCategoryMutation";
import useDeleteCategoryMutation from "@/hooks/Categories/useDeleteCategoryMutation";

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
function DeleteConfirmModal({ category, onConfirm, onCancel, isDeleting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
        onClick={() => !isDeleting && onCancel()}
      />
      <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-4">
          <AlertTriangle className="h-7 w-7 text-rose-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Delete Category
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            &ldquo;{category?.title}&rdquo;
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={isDeleting}
            onClick={onCancel}
            className="cursor-pointer border dark:border-slate-800 text-slate-500 dark:text-slate-300 font-medium px-5 py-2.5 rounded-xl flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            onClick={onConfirm}
            className="cursor-pointer bg-rose-600 hover:bg-rose-500 text-white font-medium px-5 py-2.5 rounded-xl flex-1 transition-colors text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────
function CategoryFormModal({
  editingCategory,
  formData,
  setFormData,
  onClose,
  onSubmit,
  isSaving,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/60 backdrop-blur-xs"
        onClick={() => !isSaving && onClose()}
      />
      <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-250 z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3 mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h3>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="p-1 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Category Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Cardiology, Antipyretic"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="cursor-pointer border dark:border-slate-800 text-slate-500 dark:text-slate-300 font-medium px-4 py-2.5 rounded-xl flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl flex-1 transition-colors text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {editingCategory ? "Saving..." : "Creating..."}
                </>
              ) : editingCategory ? (
                "Save Changes"
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminCategoriesPage() {
  const queryClient = useQueryClient();

  // ── Pagination & Search state ──
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const itemsPerPage = 10;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // ── API query ──
  const { data, isLoading, isError } = useGetCategoriesQuery({
    page: currentPage,
    limit: itemsPerPage,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  });

  const categories = data?.data ?? [];
  const meta = data?.meta ?? {};
  const totalPages = meta.totalPages ?? 1;
  const totalItems = meta.total ?? 0;

  // ── Add / Edit Modal ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "ACTIVE",
  });

  // ── Delete Confirmation Modal ──
  const [deletingCategory, setDeletingCategory] = useState(null);

  // ── Mutations ──
  const { mutate: createCategory, isPending: isCreating } =
    useCreateCategoryMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Category created successfully.");
        setIsModalOpen(false);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ?? "Failed to create category."
        );
      },
    });

  const { mutate: updateCategory, isPending: isUpdating } =
    useUpdateCategoryMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Category updated successfully.");
        setIsModalOpen(false);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ?? "Failed to update category."
        );
      },
    });

  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteCategoryMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Category deleted successfully.");
        setDeletingCategory(null);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ?? "Failed to delete category."
        );
      },
    });

  // ── Handlers ──
  const handleAddClick = () => {
    setEditingCategory(null);
    setFormData({ title: "", description: "", status: "ACTIVE" });
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setFormData({
      title: category.title,
      description: category.description ?? "",
      status: category.status,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Category name is required.");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      status: formData.status,
    };

    if (editingCategory) {
      updateCategory({ id: editingCategory.id, data: payload });
    } else {
      createCategory(payload);
    }
  };

  const isSaving = isCreating || isUpdating;

  // ── Skeleton rows ──
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {[...Array(4)].map((_, i) => (
        <td key={i} className="py-4 px-6">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-full max-w-[180px]" />
        </td>
      ))}
      <td className="py-4 px-6 text-right">
        <div className="flex justify-end gap-2">
          <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        </div>
      </td>
    </tr>
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
            Configure pharmaceutical categories and enable/disable filters.
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
            placeholder="Search categories by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-5 flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm">
          <AlertTriangle size={18} className="shrink-0" />
          <p>Failed to load categories. Please try refreshing the page.</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider select-none">
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Created At</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : categories.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-16 text-center text-slate-400 dark:text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Layers size={28} className="opacity-30" />
                      <p className="text-sm">No categories found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/20 transition-colors"
                  >
                    {/* Name */}
                    <td className="py-4 px-6 font-medium text-slate-800 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <Layers size={16} />
                        </div>
                        {cat.title}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-normal max-w-xs">
                      <p className="truncate max-w-[260px]">
                        {cat.description ?? (
                          <span className="italic text-slate-300 dark:text-slate-600">
                            No description
                          </span>
                        )}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${
                          cat.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {cat.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-normal whitespace-nowrap">
                      {new Date(cat.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(cat)}
                          title="Edit Category"
                          className="p-2 rounded-xl border dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeletingCategory(cat)}
                          title="Delete Category"
                          className="p-2 rounded-xl border dark:border-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-500 dark:text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
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

      {/* Pagination */}
      {!isLoading && totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemName="categories"
        />
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <CategoryFormModal
          editingCategory={editingCategory}
          formData={formData}
          setFormData={setFormData}
          onClose={() => !isSaving && setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          isSaving={isSaving}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingCategory && (
        <DeleteConfirmModal
          category={deletingCategory}
          onConfirm={() => deleteCategory(deletingCategory.id)}
          onCancel={() => setDeletingCategory(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
