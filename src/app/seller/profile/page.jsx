"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Store, FileText, Check, Edit2, X } from "lucide-react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";

export default function SellerProfilePage() {
  const [profile, setProfile] = useState({
    name: "Jahirul Islam",
    email: "jahirul@medistore.com",
    phone: "+880 1712-345678",
    storeName: "MediStore Dhanmondi",
    licenseNo: "DL-884920-B",
    address: "House 45, Road 12, Dhanmondi, Dhaka",
    joinedDate: "July 2025",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.storeName || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setProfile({ ...formData });
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
          Manage your personal details, pharmacy license, and store metadata.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Banner Vibe */}
        <div className="h-32 bg-linear-to-r from-teal-500 to-emerald-600 relative" />

        {/* Content Container */}
        <div className="px-6 pb-6 relative">
          {/* Avatar floating and actions header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-6 gap-4 min-h-[48px]">
            <div className="flex items-end gap-4">
              <div className="h-24 w-24 rounded-2xl bg-teal-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-teal-500/20 border-4 border-white dark:border-slate-900 z-10 select-none">
                {profile.name.charAt(0)}
              </div>
              <div className="pb-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {profile.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {profile.storeName}
                </p>
              </div>
            </div>

            {/* Static Action Buttons container to prevent size shifts */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setFormData({ ...profile });
                    setIsEditing(true);
                  }}
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
                    onClick={() => {
                      setFormData({ ...profile });
                      setIsEditing(false);
                    }}
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
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed"
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
                    className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed"
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
                    className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Store Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Pharmacy Store Name
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Drug License */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Drug License Number
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.licenseNo}
                    onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Joined Date */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Member Since
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    disabled
                    value={formData.joinedDate}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/40 text-sm font-normal text-slate-500 dark:text-slate-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Business Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <textarea
                  disabled={!isEditing}
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-sm font-normal text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-75 disabled:cursor-not-allowed resize-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
