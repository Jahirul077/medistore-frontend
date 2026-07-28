"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import useRegisterMutation from "@/hooks/Auth/useRegisterMutation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const { mutate: registerUser, isPending } = useRegisterMutation({
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message || "Account created successfully! Please sign in.");
        router.push("/auth/login");
      }
    },
    onError: (err) => {
      toast.error(err?.message || "Registration failed. Please try again.");
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
      agreeTerms: false,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const passwordVal = watch("password");

  const onSubmit = (data) => {
    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || "CUSTOMER",
    });
  };

  return (
    <div className="w-full max-w-110 px-4 py-8">
      {/* Premium Outer Card container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-7">
        
        {/* Header/Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-955 dark:text-white">
              Medi<span className="text-teal-500">Store</span>
            </span>
          </Link>
          <div className="pt-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-xs text-slate-455 dark:text-slate-500 mt-1">
              Join MediStore and manage prescriptions in one place.
            </p>
          </div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="John Doe"
                disabled={isPending}
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long",
                  },
                })}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm bg-white text-slate-855 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                  errors.name
                    ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                }`}
              />
              <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
            </div>
            {errors.name && (
              <span className="text-xs text-rose-505 font-semibold pl-1.5 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="john@example.com"
                disabled={isPending}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address format",
                  },
                })}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm bg-white text-slate-855 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                  errors.email
                    ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                }`}
              />
              <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
            </div>
            {errors.email && (
              <span className="text-xs text-rose-505 font-semibold pl-1.5 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Account Role Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Register As
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center justify-center p-2.5 border rounded-2xl text-xs font-semibold cursor-pointer transition-all border-slate-200 dark:border-slate-800 has-checked:border-teal-500 has-checked:bg-teal-50/50 dark:has-checked:bg-teal-950/20">
                <input
                  type="radio"
                  value="CUSTOMER"
                  {...register("role")}
                  className="sr-only"
                />
                <span>Customer</span>
              </label>
              <label className="flex items-center justify-center p-2.5 border rounded-2xl text-xs font-semibold cursor-pointer transition-all border-slate-200 dark:border-slate-800 has-checked:border-teal-500 has-checked:bg-teal-50/50 dark:has-checked:bg-teal-950/20">
                <input
                  type="radio"
                  value="SELLER"
                  {...register("role")}
                  className="sr-only"
                />
                <span>Medicine Seller</span>
              </label>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isPending}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className={`w-full pl-10 pr-10 py-2.5 rounded-2xl border text-sm bg-white text-slate-855 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                  errors.password
                    ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                }`}
              />
              <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 cursor-pointer"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-rose-505 font-semibold pl-1.5 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isPending}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordVal || "Passwords do not match",
                })}
                className={`w-full pl-10 pr-10 py-2.5 rounded-2xl border text-sm bg-white text-slate-855 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                  errors.confirmPassword
                    ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                }`}
              />
              <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 cursor-pointer"
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-rose-505 font-semibold pl-1.5 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Agree Terms Checkbox */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="agreeTerms"
                disabled={isPending}
                {...register("agreeTerms", {
                  required: "You must agree to the terms and conditions",
                })}
                className="h-4 w-4 rounded border-slate-300 text-teal-500 focus:ring-teal-500 cursor-pointer"
              />
              <label
                htmlFor="agreeTerms"
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none"
              >
                I agree to the Terms of Service & Privacy Policy
              </label>
            </div>
            {errors.agreeTerms && (
              <span className="text-xs text-rose-505 font-semibold pl-1.5 block">
                {errors.agreeTerms.message}
              </span>
            )}
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={isPending}
            icon={!isPending && <ArrowRight className="h-4 w-4" />}
            className="w-full h-11 rounded-2xl text-sm font-bold shadow-md shadow-teal-500/10 cursor-pointer mt-2"
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Link back to Login */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-850">
          <p className="text-xs text-slate-500 dark:text-slate-455">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-teal-650 hover:underline font-bold dark:text-teal-400 cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
