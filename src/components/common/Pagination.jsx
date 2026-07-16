"use client";

import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemName = "items",
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border dark:border-slate-800">
      {/* Items Summary Text */}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing{" "}
        <span className="font-semibold text-slate-750 dark:text-slate-350">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-slate-750 dark:text-slate-350">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-750 dark:text-slate-350">
          {totalItems}
        </span>{" "}
        {itemName}
      </p>

      {/* Page Navigation Triggers */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 text-sm font-medium border dark:border-slate-800 rounded-xl cursor-pointer text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-50 disabled:cursor-not-allowed transition-colors select-none"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 text-sm font-medium rounded-xl cursor-pointer transition-colors select-none ${
                currentPage === page
                  ? "bg-teal-500 text-white shadow-sm shadow-teal-500/10"
                  : "border dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 text-sm font-medium border dark:border-slate-800 rounded-xl cursor-pointer text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-50 disabled:cursor-not-allowed transition-colors select-none"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
