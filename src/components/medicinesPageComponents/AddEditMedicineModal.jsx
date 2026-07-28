"use client";

import React, { useState } from "react";
import { X, Check, Package, DollarSign, UploadCloud, Loader2, Link as LinkIcon } from "lucide-react";
import Button from "@/components/common/Button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllCategoriesQuery from "@/hooks/Medicines/useGetAllCategoriesQuery";
import { uploadImageToImgBB } from "@/utils/imageUpload";
import { toast } from "sonner";

export default function AddEditMedicineModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingMedicine,
  isPending,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState("file");

  const { data: catResData } = useGetAllCategoriesQuery();
  const categoriesList = catResData?.data || [];

  if (!isOpen) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    try {
      setIsUploading(true);
      const generatedUrl = await uploadImageToImgBB(file);
      setFormData({ ...formData, image: generatedUrl });
      toast.success("Image uploaded & link generated successfully!");
    } catch (err) {
      toast.error("Image upload failed. Please try pasting a direct image link.");
    } finally {
      setIsUploading(false);
    }
  };

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
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {editingMedicine ? "Update Stock & Price" : "Add New Medicine"}
            </h3>
            {editingMedicine && (
              <p className="text-xs font-medium text-teal-600 dark:text-teal-400 mt-0.5">
                Item: {formData.title || formData.name || "Selected Medicine"}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4 pt-4">
          {/* EDIT MODE: Minimal Price & Stock Fields */}
          {editingMedicine ? (
            <div className="space-y-4">
              {/* Title / Brand Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Brand Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ace Plus Tablet"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-teal-500" />
                  Unit Price (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 3.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Stock Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 text-teal-500" />
                  Available Stock Quantity
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 400"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          ) : (
            /* CREATE MODE: Exact API Payload Fields */
            <>
              {/* Medicine Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Brand Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ace Plus Tablet"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Generic Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Generic Formula *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paracetamol + Caffeine"
                  value={formData.genericName}
                  onChange={(e) =>
                    setFormData({ ...formData, genericName: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Strength */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Strength *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500mg + 65mg"
                    value={formData.strength}
                    onChange={(e) =>
                      setFormData({ ...formData, strength: e.target.value })
                    }
                    className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {/* Manufacturer */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Manufacturer *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Square Pharmaceuticals Ltd."
                    value={formData.manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, manufacturer: e.target.value })
                    }
                    className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Category *
                </label>
                <Select
                  value={formData.categoriesId}
                  onValueChange={(val) => setFormData({ ...formData, categoriesId: val })}
                >
                  <SelectTrigger className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:ring-teal-500 cursor-pointer">
                    <SelectValue placeholder="Select Medicine Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900 border dark:border-slate-800 text-slate-700 dark:text-slate-200">
                    {categoriesList.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Description
                </label>
                <textarea
                  rows="2"
                  placeholder="Indicated for fever, headache, toothache and body pain..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* Automatic File Upload & Link Generation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Medicine Image *
                  </label>
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setUploadMode("file")}
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        uploadMode === "file"
                          ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                          : "text-slate-500"
                      }`}
                    >
                      Auto Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode("url")}
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        uploadMode === "url"
                          ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                          : "text-slate-500"
                      }`}
                    >
                      Paste Link
                    </button>
                  </div>
                </div>

                {uploadMode === "file" ? (
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center bg-slate-50/50 dark:bg-slate-955 hover:border-teal-500 transition-colors relative">
                    {isUploading ? (
                      <div className="flex flex-col items-center justify-center py-3 space-y-2">
                        <Loader2 className="h-7 w-7 text-teal-500 animate-spin" />
                        <span className="text-xs font-medium text-slate-500">
                          Uploading image & generating cloud URL...
                        </span>
                      </div>
                    ) : formData.image ? (
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0">
                            <Image
                              src={formData.image}
                              alt="Medicine Preview"
                              width={56}
                              height={56}
                              unoptimized
                              className="object-contain max-h-full max-w-full"
                            />
                          </div>
                          <div className="text-left max-w-50 truncate">
                            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate block">
                              {formData.image}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 cursor-pointer text-xs font-semibold"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center cursor-pointer py-2">
                        <UploadCloud className="h-8 w-8 text-teal-500 mb-1" />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          Click to select image file from computer
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal mt-0.5">
                          Automatically generates image URL for backend
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative">
                      <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="https://i.postimg.cc/xyz/ace-plus.jpg"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs font-mono font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    {formData.image && (
                      <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-100 dark:border-slate-850">
                        <div className="relative h-12 w-12 bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            width={48}
                            height={48}
                            unoptimized
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                        <span className="text-xs font-mono text-slate-500 truncate flex-1">
                          {formData.image}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 3.00"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {/* Stock Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 400"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full h-11 px-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Is Featured Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={!!formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
                  Mark as Featured Medicine
                </label>
              </div>
            </>
          )}

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
              disabled={isPending || isUploading}
              icon={<Check size={18} />}
              className="cursor-pointer font-medium"
            >
              {isPending || isUploading ? "Uploading & Saving..." : editingMedicine ? "Save Changes" : "Create Medicine"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
