"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/common/Button";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, medicineName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 text-center">
        {/* Warning Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-4">
          <AlertTriangle className="h-7 w-7 text-rose-500" />
        </div>

        {/* Header */}
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Delete Medicine?
        </h3>
        
        {/* Message */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-800 dark:text-slate-200">{medicineName}</span>? This action will permanently remove it from inventory.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="cursor-pointer border dark:border-slate-800 text-slate-500 dark:text-slate-300 font-medium px-5 flex-1"
          >
            Cancel
          </Button>
          <button
            onClick={onConfirm}
            className="cursor-pointer font-medium bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-xl py-2.5 px-5 flex-1 transition-all shadow-md shadow-rose-500/10"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
