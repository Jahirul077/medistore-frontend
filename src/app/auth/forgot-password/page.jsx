"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, Mail, Lock, KeyRound, ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";

import useForgotPasswordMutation from "@/hooks/Auth/useForgotPasswordMutation";
import useVerifyOtpMutation from "@/hooks/Auth/useVerifyOtpMutation";
import useResetPasswordMutation from "@/hooks/Auth/useResetPasswordMutation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [userEmail, setUserEmail] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Forms for each step
  const step1Form = useForm({ defaultValues: { email: "" } });
  const step2Form = useForm({ defaultValues: { otp: "" } });
  const step3Form = useForm({ defaultValues: { newPassword: "", confirmPassword: "" } });

  // Mutations
  const { mutate: requestOtp, isPending: isRequestingOtp } = useForgotPasswordMutation({
    onSuccess: (res) => {
      const otpCode = res?.data?.otp;
      if (otpCode) {
        toast.success(`OTP Code: ${otpCode}`, {
          duration: 10000,
          description: "Use this 6-digit verification code.",
        });
        step2Form.setValue("otp", otpCode);
      } else {
        toast.success(res?.message || "6-Digit OTP sent successfully to your email!");
      }
      setStep(2);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to send OTP. Please check email address.");
    },
  });

  const { mutate: verifyOtpCode, isPending: isVerifyingOtp } = useVerifyOtpMutation({
    onSuccess: (res) => {
      toast.success(res?.message || "OTP verified successfully!");
      setStep(3);
    },
    onError: (err) => {
      toast.error(err?.message || "Invalid or expired OTP code.");
    },
  });

  const { mutate: resetUserPassword, isPending: isResettingPassword } = useResetPasswordMutation({
    onSuccess: (res) => {
      toast.success(res?.message || "Password reset successfully! Please sign in.");
      router.push("/auth/login");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to reset password. Try again.");
    },
  });

  const onStep1Submit = (data) => {
    setUserEmail(data.email);
    requestOtp({ email: data.email });
  };

  const onStep2Submit = (data) => {
    setVerifiedOtp(data.otp);
    verifyOtpCode({ email: userEmail, otp: data.otp });
  };

  const onStep3Submit = (data) => {
    resetUserPassword({
      email: userEmail,
      otp: verifiedOtp,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="w-full max-w-110 px-4 py-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-7">
        
        {/* Header / Logo */}
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
              {step === 1 && "Forgot Password?"}
              {step === 2 && "Verify OTP Code"}
              {step === 3 && "Reset Password"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {step === 1 && "Enter your email address to receive a 6-digit verification code."}
              {step === 2 && `Enter the 6-digit code sent to ${userEmail}`}
              {step === 3 && "Enter your new password below."}
            </p>
          </div>

          {/* Stepper indicator */}
          <div className="flex items-center gap-2 pt-2">
            <div className={`h-1.5 w-8 rounded-full ${step >= 1 ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-800"}`} />
            <div className={`h-1.5 w-8 rounded-full ${step >= 2 ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-800"}`} />
            <div className={`h-1.5 w-8 rounded-full ${step >= 3 ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-800"}`} />
          </div>
        </div>

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  disabled={isRequestingOtp}
                  {...step1Form.register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address format",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm bg-white text-slate-850 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                    step1Form.formState.errors.email
                      ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                      : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                  }`}
                />
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              </div>
              {step1Form.formState.errors.email && (
                <span className="text-xs text-rose-500 font-semibold pl-1.5 block">
                  {step1Form.formState.errors.email.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isRequestingOtp}
              icon={!isRequestingOtp && <ArrowRight className="h-4 w-4" />}
              className="w-full h-11 rounded-2xl text-sm font-bold shadow-md shadow-teal-500/10 cursor-pointer mt-2"
            >
              {isRequestingOtp ? "Sending OTP..." : "Send Verification Code"}
            </Button>
          </form>
        )}

        {/* STEP 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                6-Digit OTP Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  disabled={isVerifyingOtp}
                  {...step2Form.register("otp", {
                    required: "OTP code is required",
                    minLength: {
                      value: 6,
                      message: "OTP must be 6 digits",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm tracking-widest text-center font-bold bg-white text-slate-850 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                    step2Form.formState.errors.otp
                      ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                      : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                  }`}
                />
                <KeyRound className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              </div>
              {step2Form.formState.errors.otp && (
                <span className="text-xs text-rose-500 font-semibold pl-1.5 block">
                  {step2Form.formState.errors.otp.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isVerifyingOtp}
              icon={!isVerifyingOtp && <CheckCircle2 className="h-4 w-4" />}
              className="w-full h-11 rounded-2xl text-sm font-bold shadow-md shadow-teal-500/10 cursor-pointer mt-2"
            >
              {isVerifyingOtp ? "Verifying Code..." : "Verify Code"}
            </Button>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Change Email
              </button>
              <button
                type="button"
                onClick={() => requestOtp({ email: userEmail })}
                className="text-teal-600 font-bold hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Reset New Password */}
        {step === 3 && (
          <form onSubmit={step3Form.handleSubmit(onStep3Submit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isResettingPassword}
                  {...step3Form.register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-2xl border text-sm bg-white text-slate-850 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                    step3Form.formState.errors.newPassword
                      ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                      : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                  }`}
                />
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-650 cursor-pointer"
                  tabIndex="-1"
                >
                  {showNewPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {step3Form.formState.errors.newPassword && (
                <span className="text-xs text-rose-500 font-semibold pl-1.5 block">
                  {step3Form.formState.errors.newPassword.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isResettingPassword}
                  {...step3Form.register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      // eslint-disable-next-line react-hooks/incompatible-library
                      val === step3Form.watch("newPassword") || "Passwords do not match",
                  })}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-2xl border text-sm bg-white text-slate-850 focus:outline-none dark:bg-slate-950 dark:text-slate-200 transition-all ${
                    step3Form.formState.errors.confirmPassword
                      ? "border-rose-455 focus:border-rose-455 focus:ring-1 focus:ring-rose-500/20"
                      : "border-slate-200 focus:border-teal-500 dark:border-slate-800"
                  }`}
                />
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-650 cursor-pointer"
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {step3Form.formState.errors.confirmPassword && (
                <span className="text-xs text-rose-500 font-semibold pl-1.5 block">
                  {step3Form.formState.errors.confirmPassword.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isResettingPassword}
              icon={!isResettingPassword && <ArrowRight className="h-4 w-4" />}
              className="w-full h-11 rounded-2xl text-sm font-bold shadow-md shadow-teal-500/10 cursor-pointer mt-2"
            >
              {isResettingPassword ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        )}

        {/* Back to Login link */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-850">
          <p className="text-xs text-slate-500 dark:text-slate-450">
            Remember your password?{" "}
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
