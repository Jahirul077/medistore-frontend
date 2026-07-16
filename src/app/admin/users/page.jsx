"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Shield, User, Store, ShieldAlert, Ban, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/common/Pagination";
import toast from "react-hot-toast";

// Mock Users Database
const initialUsers = [
  {
    id: "USR-001",
    name: "Jahirul Islam",
    email: "jahirul@medistore.com",
    role: "Seller",
    status: "Active",
    storeName: "MediStore Dhanmondi",
    joinedDate: "July 12, 2025",
  },
  {
    id: "USR-002",
    name: "Amit Hasan",
    email: "amit.hasan@example.com",
    role: "Customer",
    status: "Active",
    storeName: null,
    joinedDate: "August 04, 2025",
  },
  {
    id: "USR-003",
    name: "Lazz Pharma Corp",
    email: "lazz@pharma.com",
    role: "Seller",
    status: "Active",
    storeName: "Lazz Pharma Kakrail",
    joinedDate: "September 18, 2025",
  },
  {
    id: "USR-004",
    name: "Sarah Khan",
    email: "sarah.k@example.com",
    role: "Customer",
    status: "Suspended",
    storeName: null,
    joinedDate: "October 02, 2025",
  },
  {
    id: "USR-005",
    name: "Tasnim Rahman",
    email: "tasnim.r@example.com",
    role: "Customer",
    status: "Active",
    storeName: null,
    joinedDate: "November 22, 2025",
  },
  {
    id: "USR-006",
    name: "MediCare Pharmacy",
    email: "contact@medicare.com",
    role: "Seller",
    status: "Active",
    storeName: "MediCare Banani",
    joinedDate: "December 05, 2025",
  },
  {
    id: "USR-007",
    name: "Farhan Chowdury",
    email: "farhan.c@example.com",
    role: "Customer",
    status: "Active",
    storeName: null,
    joinedDate: "January 14, 2026",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset page when search or filters change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleRoleChange = (val) => {
    setRoleFilter(val);
    setCurrentPage(1);
  };

  // Action: Toggle account suspension
  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((usr) => {
        if (usr.id === userId) {
          const nextStatus = usr.status === "Active" ? "Suspended" : "Active";
          toast.success(
            `${usr.name} is now ${nextStatus.toLowerCase()}`
          );
          return { ...usr, status: nextStatus };
        }
        return usr;
      })
    );
  };

  // Action: Change user role
  const handleChangeRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((usr) => {
        if (usr.id === userId) {
          toast.success(`${usr.name} role updated to ${newRole}`);
          return {
            ...usr,
            role: newRole,
            storeName: newRole === "Seller" ? "Assigned Store" : null,
          };
        }
        return usr;
      })
    );
  };

  // Filter Logic
  const filteredUsers = users.filter((usr) => {
    const matchesSearch =
      usr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usr.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (usr.storeName && usr.storeName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === "All" || usr.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Paginated List
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          User Management
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          View registered sellers and customers, update credentials, and manage system access permissions.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search users by name, email or pharmacy store..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Filter size={16} className="text-slate-400 dark:text-slate-500" />
          <Select value={roleFilter} onValueChange={handleRoleChange}>
            <SelectTrigger className="h-12 w-full md:w-48 px-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-indigo-500 cursor-pointer">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200">
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="Customer">Customers</SelectItem>
              <SelectItem value="Seller">Sellers</SelectItem>
              <SelectItem value="Admin">Administrators</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider select-none">
                <th className="py-4 px-6">User Profile</th>
                <th className="py-4 px-6">Store Association</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Registered Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400 dark:text-slate-500">
                    No registered platform users found matching criteria.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-850/20 transition-colors"
                  >
                    {/* User Profile */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {user.name}
                          </span>
                          <span className="text-sm text-slate-400 dark:text-slate-500">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Store Association */}
                    <td className="py-4 px-6">
                      <span className="text-slate-600 dark:text-slate-400 font-normal">
                        {user.storeName ? user.storeName : "—"}
                      </span>
                    </td>

                    {/* Role Badges & Select */}
                    <td className="py-4 px-6">
                      <Select
                        value={user.role}
                        onValueChange={(val) => handleChangeRole(user.id, val)}
                      >
                        <SelectTrigger className="h-9 w-32 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-sm font-medium px-2 cursor-pointer shadow-xs focus:ring-1 focus:ring-indigo-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border text-slate-700 dark:text-slate-200">
                          <SelectItem value="Customer">Customer</SelectItem>
                          <SelectItem value="Seller">Seller</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Join Date */}
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-normal">
                      {user.joinedDate}
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.status === "Active" ? (
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            title="Suspend User Access"
                            className="p-2 rounded-xl border dark:border-slate-850 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-650 hover:text-rose-600 dark:text-rose-400 cursor-pointer transition-colors"
                          >
                            <Ban size={15} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            title="Activate User Access"
                            className="p-2 rounded-xl border dark:border-slate-850 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 cursor-pointer transition-colors"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}
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
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemName="users"
      />
    </div>
  );
}
