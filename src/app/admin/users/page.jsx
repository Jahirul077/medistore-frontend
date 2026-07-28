"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Ban,
  CheckCircle,
  Users,
  AlertTriangle,
  Loader2,
  ShieldCheck,
  ShoppingBag,
  Store,
} from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/common/Pagination";
import useGetAdminUsersQuery from "@/hooks/Users/useGetAdminUsersQuery";
import useUpdateUserStatusMutation from "@/hooks/Users/useUpdateUserStatusMutation";

// ─── Role Badge ───────────────────────────────────────────────────────────────
function RoleBadge({ role }) {
  const map = {
    ADMIN: {
      label: "Admin",
      icon: <ShieldCheck size={12} />,
      cls: "bg-violet-50 text-violet-600 dark:bg-violet-950/20 dark:text-violet-400",
    },
    SELLER: {
      label: "Seller",
      icon: <Store size={12} />,
      cls: "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400",
    },
    CUSTOMER: {
      label: "Customer",
      icon: <ShoppingBag size={12} />,
      cls: "bg-sky-50 text-sky-600 dark:bg-sky-950/20 dark:text-sky-400",
    },
  };
  const config = map[role] ?? {
    label: role,
    icon: null,
    cls: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${config.cls}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name }) {
  const colors = [
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  ];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  return (
    <div
      className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${colors[idx]}`}
    >
      {name?.charAt(0)?.toUpperCase() ?? "?"}
    </div>
  );
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 bg-slate-100 dark:bg-slate-800 rounded-md" />
            <div className="h-3 w-36 bg-slate-100 dark:bg-slate-800 rounded-md" />
          </div>
        </div>
      </td>
      {[...Array(4)].map((_, i) => (
        <td key={i} className="py-4 px-6">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-lg w-20" />
        </td>
      ))}
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
// ─── Status Toggle Confirmation Modal ───────────────────────────────────────
function StatusConfirmModal({ user, onConfirm, onCancel, isLoading }) {
  const isBanning = user.status === "ACTIVE";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
        onClick={() => !isLoading && onCancel()}
      />
      <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 text-center">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl mb-4 ${
            isBanning
              ? "bg-rose-50 dark:bg-rose-950/30"
              : "bg-emerald-50 dark:bg-emerald-950/30"
          }`}
        >
          {isBanning ? (
            <Ban className="h-7 w-7 text-rose-500" />
          ) : (
            <CheckCircle className="h-7 w-7 text-emerald-500" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {isBanning ? "Suspend User" : "Activate User"}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          {isBanning ? (
            <>
              Are you sure you want to suspend{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {user.name}
              </span>
              ? They will lose access to the platform.
            </>
          ) : (
            <>
              Re-activate{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {user.name}
              </span>
              ? They will regain full platform access.
            </>
          )}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={isLoading}
            onClick={onCancel}
            className="cursor-pointer border dark:border-slate-800 text-slate-500 dark:text-slate-300 font-medium px-5 py-2.5 rounded-xl flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={onConfirm}
            className={`cursor-pointer text-white font-medium px-5 py-2.5 rounded-xl flex-1 transition-colors text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2 ${
              isBanning
                ? "bg-rose-600 hover:bg-rose-500"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            {isLoading ? (
              <><Loader2 size={14} className="animate-spin" /> Processing...</>
            ) : isBanning ? (
              "Yes, Suspend"
            ) : (
              "Yes, Activate"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusTarget, setStatusTarget] = useState(null); // user to toggle
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const itemsPerPage = 10;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, roleFilter]);

  const { data, isLoading, isError } = useGetAdminUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(roleFilter !== "ALL" ? { role: roleFilter } : {}),
  });

  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateUserStatusMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
        toast.success(
          statusTarget?.status === "ACTIVE"
            ? `${statusTarget.name} has been suspended.`
            : `${statusTarget.name} has been activated.`
        );
        setStatusTarget(null);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ?? "Failed to update user status."
        );
      },
    });

  const handleStatusToggle = () => {
    if (!statusTarget) return;
    const nextStatus = statusTarget.status === "ACTIVE" ? "BANNED" : "ACTIVE";
    updateStatus({ id: statusTarget.id, status: nextStatus });
  };

  const users = data?.data ?? [];
  const meta = data?.meta ?? {};
  const totalPages = meta.totalPages ?? 1;
  const totalItems = meta.total ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          User Management
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          View all registered platform users — admins, sellers, and customers.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Filter size={16} className="text-slate-400 dark:text-slate-500" />
          <Select value={roleFilter} onValueChange={(val) => setRoleFilter(val)}>
            <SelectTrigger className="h-12 w-full md:w-48 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-indigo-500 cursor-pointer">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200">
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="CUSTOMER">Customers</SelectItem>
              <SelectItem value="SELLER">Sellers</SelectItem>
              <SelectItem value="ADMIN">Administrators</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-5 flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm">
          <AlertTriangle size={18} className="shrink-0" />
          <p>Failed to load users. Please try refreshing the page.</p>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider select-none">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Joined</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-16 text-center text-slate-400 dark:text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users size={28} className="opacity-30" />
                      <p className="text-sm">No users found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/20 transition-colors"
                  >
                    {/* User Profile */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} />
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                            {user.name}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-normal">
                      {user.phone ?? (
                        <span className="italic text-slate-300 dark:text-slate-600">
                          —
                        </span>
                      )}
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <RoleBadge role={user.role} />
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${
                          user.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                        }`}
                      >
                        {user.status === "ACTIVE" ? (
                          <CheckCircle size={11} />
                        ) : (
                          <Ban size={11} />
                        )}
                        {user.status === "ACTIVE" ? "Active" : "Suspended"}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-normal whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      {user.status === "ACTIVE" ? (
                        <button
                          onClick={() => setStatusTarget(user)}
                          title="Suspend User"
                          className="p-2 rounded-xl border dark:border-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer transition-colors"
                        >
                          <Ban size={15} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setStatusTarget(user)}
                          title="Activate User"
                          className="p-2 rounded-xl border dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                        >
                          <CheckCircle size={15} />
                        </button>
                      )}
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
          itemName="users"
        />
      )}

      {/* Status Toggle Confirmation Modal */}
      {statusTarget && (
        <StatusConfirmModal
          user={statusTarget}
          onConfirm={handleStatusToggle}
          onCancel={() => setStatusTarget(null)}
          isLoading={isUpdatingStatus}
        />
      )}
    </div>
  );
}
