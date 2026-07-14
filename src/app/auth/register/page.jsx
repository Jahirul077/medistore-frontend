"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Activity, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      agreeTerms: false,
    },
  });

  const passwordVal = watch("password");

  const onSubmit = (data) => {
    setIsLoading(true);
    // Simulating register network request delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully! Welcome to MediStore.", {
        icon: "🎉",
        style: {
          borderRadius: "16px",
          background: "#0d9488",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "bold",
        },
      });
      console.log("Register Successful Data:", data);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[440px] px-4 py-8">
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
                disabled={isLoading}
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
                disabled={isLoading}
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

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
            disabled={isLoading}
            icon={!isLoading && <ArrowRight className="h-4 w-4" />}
            className="w-full h-11 rounded-2xl text-sm font-bold shadow-md shadow-teal-500/10 cursor-pointer mt-2"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-slate-805"></div>
          </div>
          <span className="relative bg-white dark:bg-slate-900 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Or continue with
          </span>
        </div>

        {/* Google Social Login */}
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
          }
          onClick={() => {
            toast.success("Redirecting to Google Sign-In...", {
              icon: "🚀",
              style: {
                borderRadius: "16px",
                background: "#0d9488",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
              },
            });
          }}
          className="w-full h-11 rounded-2xl text-sm font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
        >
          Google
        </Button>

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
