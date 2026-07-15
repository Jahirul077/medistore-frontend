"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { ShieldAlert, ShoppingBag, CreditCard } from "lucide-react";

function CancelPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <div className="bg-slate-50/50 dark:bg-slate-955 min-h-screen pt-28 pb-16 flex items-center">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl text-center">
            
            {/* Warning icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-amber-50 dark:bg-amber-955/30 text-amber-500 rounded-full p-4">
                <ShieldAlert className="h-14 w-14 stroke-2" />
              </div>
            </div>

            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              Payment Cancelled
            </h1>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              You cancelled the checkout process. No payment was charged.
            </p>

            {orderId && (
              <div className="mb-6 py-2 px-4 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-100 dark:border-slate-850 inline-block">
                <span className="text-xs text-slate-450 font-semibold mr-1.5">Order ID:</span>
                <span className="text-xs font-mono font-black text-slate-800 dark:text-slate-205">{orderId}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => router.push("/checkout")}
                variant="primary"
                icon={<CreditCard className="h-4 w-4" />}
                className="w-full rounded-2xl font-bold cursor-pointer from-amber-500! to-orange-600!"
              >
                Resume Checkout
              </Button>
              <Button
                onClick={() => router.push("/shop")}
                variant="outline"
                icon={<ShoppingBag className="h-4 w-4" />}
                className="w-full rounded-2xl font-bold cursor-pointer"
              >
                Continue Shopping
              </Button>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    }>
      <CancelPageContent />
    </Suspense>
  );
}
