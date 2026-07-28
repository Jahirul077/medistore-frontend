"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Store, FileText, Check, Edit2, ShieldCheck } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import useGetMeQuery from "@/hooks/Auth/useGetMeQuery";

export default function SellerProfilePage() {
  const { data: resData, isLoading, error } = useGetMeQuery();
  const user = resData?.data?.result || resData?.data || {};

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "SELLER",
    status: "ACTIVE",
    joinedDate: "",
  });

  useEffect(() => {
    if (user && user.name) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "SELLER",
        status: user.status || "ACTIVE",
        joinedDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "July 2026",
      });
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          My Seller Profile
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your personal details, seller role status, and account information.
        </p>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border dark:border-slate-800 animate-pulse space-y-6">
          <div className="h-24 w-24 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      )}

      {/* Main Card */}
      {!isLoading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 shadow-xs overflow-hidden">
          {/* Banner Vibe */}
          <div className="h-32 bg-linear-to-r from-teal-500 to-emerald-600 relative" />

          {/* Content Container */}
          <div className="px-6 pb-6 relative">
            {/* Avatar floating and actions header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-6 gap-4 min-h-[48px]">
              <div className="flex items-end gap-4">
                <div className="h-24 w-24 rounded-2xl bg-teal-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-teal-500/20 border-4 border-white dark:border-slate-900 z-10 select-none shrink-0">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "S"}
                </div>
                <div className="pb-1 pt-14">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {formData.name || "Vendor Pharmacy"}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 uppercase tracking-wider">
                      {formData.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Verified {formData.role} Partner
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto pt-4 sm:pt-14">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setIsEditing(true)}
                    icon={<Edit2 size={15} />}
                    className="cursor-pointer font-medium"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="md"
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="cursor-pointer font-medium"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      form="profile-form"
                      variant="primary"
                      size="md"
                      icon={<Check size={16} />}
                      className="cursor-pointer font-medium"
                    >
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Form */}
            <form id="profile-form" onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Full Name / Vendor Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Account Role */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Account Role
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500" />
                    <input
                      type="text"
                      disabled
                      value={formData.role}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/30 dark:bg-slate-955/50 text-sm font-extrabold text-teal-600 dark:text-teal-400 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Joined Date */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Member Since
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      disabled
                      value={formData.joinedDate}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/20 dark:bg-slate-955/40 text-sm font-semibold text-slate-600 dark:text-slate-400 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
