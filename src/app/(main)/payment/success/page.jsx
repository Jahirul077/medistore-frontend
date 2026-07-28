"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import useVerifyPaymentQuery from "@/hooks/Payment/useVerifyPaymentQuery";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");

  // Call Stripe payment verification if sessionId exists
  const { data: resData, isLoading } = useVerifyPaymentQuery(sessionId);
  const isPaid = resData?.data?.status === "paid" || !sessionId;

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pt-28 pb-16 flex items-center">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl text-center space-y-6">
            
            {/* Green success checkmark */}
            <div className="flex justify-center">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full p-4">
                <CheckCircle2 className="h-16 w-16 stroke-2" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                {isLoading ? "Verifying Payment..." : isPaid ? "Payment Successful!" : "Order Received!"}
              </h1>
              
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                {isPaid
                  ? "Thank you for your purchase! Your order has been placed & payment verified."
                  : "Your order details have been received and are being processed."}
              </p>
            </div>

            {(orderId || sessionId) && (
              <div className="py-2.5 px-4 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-100 dark:border-slate-850 inline-block">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1.5">
                  {orderId ? "Order ID" : "Session ID"}:
                </span>
                <span className="text-xs font-mono font-extrabold text-slate-800 dark:text-slate-200">
                  {orderId || sessionId?.slice(0, 16)}...
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                onClick={() => router.push("/orders")}
                variant="primary"
                iconRight={<ArrowRight className="h-4 w-4" />}
                className="w-full h-11 rounded-2xl font-bold cursor-pointer"
              >
                View My Orders
              </Button>
              <Button
                onClick={() => router.push("/shop")}
                variant="outline"
                icon={<ShoppingBag className="h-4 w-4" />}
                className="w-full h-11 rounded-2xl font-bold border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
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

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
