"use client";

import React from "react";
import { Edit2, Trash2, AlertTriangle, FileText } from "lucide-react";

export default function MedicineTable({ filteredMedicines, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800/85 shadow-xs overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b dark:border-slate-800/50">
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Medicine
              </th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Dosage / Form
              </th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Stock Level
              </th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
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
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {med.name}
                        </span>
                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400 italic mt-0.5">
                          {med.generic}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                          {med.company}
                        </span>
                      </div>
                    </td>

                    {/* Dosage Form */}
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border dark:border-slate-700/50">
                        {med.dosage}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="text-sm font-normal text-slate-700 dark:text-slate-300">
                        {med.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        ${med.price.toFixed(2)}
                      </span>
                    </td>

                    {/* Stock Info */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-sm font-medium ${
                              isOutOfStock
                                ? "text-rose-600 dark:text-rose-400"
                                : isLowStock
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {med.stock} Units
                          </span>
                          {isOutOfStock && (
                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400">
                              Empty
                            </span>
                          )}
                          {isLowStock && (
                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 items-center gap-0.5">
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
                          onClick={() => onEdit(med)}
                          className="p-2 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-teal-50/50 dark:text-slate-400 dark:hover:text-teal-400 dark:hover:bg-teal-950/20 transition-all cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => onDelete(med)}
                          className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-rose-900/20 transition-all cursor-pointer"
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
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
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
  );
}
