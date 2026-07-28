"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Activity, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import useLoginMutation from "@/hooks/Auth/useLoginMutation";
import { setCredentials } from "@/redux/slices/authSlice";
import { setLocalStorage } from "@/utils/localStorage";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutate: loginUser, isPending } = useLoginMutation({
    onSuccess: (res) => {
      if (res?.success && res?.data) {
        const { user, token } = res.data;
        
        // Save to localStorage matching user pattern
        setLocalStorage("MEDISTORE_ACCESS_TOKEN", token);
        setLocalStorage("MEDISTORE_USER", JSON.stringify(user));
        
        // Dispatch to Redux store
        dispatch(setCredentials({ user, token }));

        toast.success(res?.message || "Welcome back to MediStore!");

        // Redirect based on role
        if (user?.role === "ADMIN") {
          router.push("/admin");
        } else if (user?.role === "SELLER") {
          router.push("/seller");
        } else {
          router.push("/");
        }
      }
    },
    onError: (err) => {
      toast.error(err?.message || "Invalid email or password");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    loginUser({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-full max-w-[440px] px-4 py-8">
      {/* Outer Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-7">
        
        {/* Header/Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Medi<span className="text-teal-500">Store</span>
            </span>
          </Link>
          <div className="pt-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs text-slate-455 dark:text-slate-500 mt-1">
              Enter your credentials to access your account.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email Input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                disabled={isPending}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address format",
                  },
                })}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm bg-white text-slate-850 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                  errors.email
                    ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                }`}
              />
              <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
            </div>
            {errors.email && (
              <span className="text-xs text-rose-500 font-semibold pl-1.5 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-bold text-teal-650 hover:underline dark:text-teal-400"
              >
                Forgot password?
              </Link>
            </div>
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
              <span className="text-xs text-rose-500 font-semibold pl-1.5 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={isPending}
            icon={!isPending && <ArrowRight className="h-4 w-4" />}
            className="w-full h-11 rounded-2xl text-sm font-bold shadow-md shadow-teal-500/10 cursor-pointer mt-2"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Link to Register page */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-850">
          <p className="text-xs text-slate-500 dark:text-slate-450">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-teal-650 hover:underline font-bold dark:text-teal-400 cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
