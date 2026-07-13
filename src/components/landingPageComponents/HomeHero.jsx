import React from "react";
import Button from "../common/Button";
import { Search, ShieldCheck, Clock, Truck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Reveal from "../common/Reveal";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-slate-50/30 pt-24 pb-16 lg:pt-32 lg:pb-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-950/20" />
      <div className="absolute right-10 top-1/3 -z-10 h-96 w-96 rounded-full bg-teal-100/30 blur-3xl dark:bg-teal-900/10" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Text Content */}
          <div className="space-y-8 lg:col-span-7">
            {/* Trust Badge */}
            <Reveal variant="fade-down" delay={100} duration={600}>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30 animate-pulse">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Genuine Medicines & Healthcare Essentials</span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal variant="fade-up" delay={200} duration={800}>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white leading-tight">
                Your Trusted Pharmacy,{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Delivered in Minutes.
                </span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal variant="fade-up" delay={350} duration={850}>
              <p className="max-w-2xl text-base text-slate-500 sm:text-lg dark:text-slate-400 leading-relaxed">
                Find, compare, and order authentic prescription medicines, wellness supplements, and personal care products. Get professional guidance and swift home delivery.
              </p>
            </Reveal>

            {/* Search Bar */}
            <Reveal variant="fade-up" delay={500} duration={900}>
              <div className="max-w-2xl">
                <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-100/50 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:focus-within:border-teal-500/50">
                  <Search className="ml-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search medicines, health products, brands..."
                    className="w-full border-0 bg-transparent px-3 py-3 text-sm text-slate-850 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-slate-200"
                  />
                  <Button variant="primary" size="md" className="shrink-0">
                    Search
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <Reveal variant="fade-up" delay={650} duration={700} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white">Free Delivery</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Orders above $40</p>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delay={750} duration={700} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white">Rapid Service</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">24/7 support</p>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delay={850} duration={700} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white">100% Secure</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Verified products</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] overflow-visible">
              {/* Decorative Circle Backing */}
              <Reveal variant="zoom-in" delay={150} duration={1200} className="absolute inset-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-50 opacity-60 dark:from-emerald-950/20 dark:to-teal-950/10 scale-95" />
              </Reveal>
              
              {/* Main Image */}
              <Reveal variant="zoom-in" delay={300} duration={1000} className="relative w-full h-full">
                <div className="relative w-full h-full flex items-center justify-center animate-float">
                  <Image
                    src="/hero-illustration.png"
                    alt="MediStore Healthcare Essentials"
                    width={450}
                    height={450}
                    priority
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </Reveal>

              {/* Floating Stat Badge 1 */}
              <Reveal variant="fade-right" delay={650} duration={800} className="absolute -left-4 top-1/4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3.5 shadow-xl backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 animate-bounce-slow">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-450 dark:text-slate-400">Express Delivery</p>
                    <p className="text-sm font-bold text-slate-950 dark:text-white">Under 30 Mins</p>
                  </div>
                </div>
              </Reveal>

              {/* Floating Stat Badge 2 */}
              <Reveal variant="fade-left" delay={800} duration={800} className="absolute -right-2 bottom-1/4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3.5 shadow-xl backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 animate-bounce-delayed">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-450 dark:text-slate-400">Prescription</p>
                    <p className="text-sm font-bold text-slate-950 dark:text-white">Verified by Pharmacists</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
