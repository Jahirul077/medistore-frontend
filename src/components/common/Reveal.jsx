"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A premium, zero-dependency scroll-reveal and entrance animation component.
 * Uses native IntersectionObserver and performance-optimized hardware-accelerated CSS transitions.
 */
export default function Reveal({
  children,
  variant = "fade-up",
  duration = 800,
  delay = 0,
  threshold = 0.05,
  once = true,
  className = "",
  easing = "cubic-bezier(0.16, 1, 0.3, 1)", // Premium, smooth out-expo easing
  ...props
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Avoid running on server side
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  // Premium transition states for each animation style
  const getVariantStyles = () => {
    switch (variant) {
      case "fade-up":
        return {
          hidden: "opacity-0 translate-y-12",
          visible: "opacity-100 translate-y-0",
        };
      case "fade-down":
        return {
          hidden: "opacity-0 -translate-y-12",
          visible: "opacity-100 translate-y-0",
        };
      case "fade-left":
        return {
          hidden: "opacity-0 translate-x-12",
          visible: "opacity-100 translate-x-0",
        };
      case "fade-right":
        return {
          hidden: "opacity-0 -translate-x-12",
          visible: "opacity-100 translate-x-0",
        };
      case "zoom-in":
        return {
          hidden: "opacity-0 scale-95",
          visible: "opacity-100 scale-100",
        };
      case "zoom-out":
        return {
          hidden: "opacity-0 scale-105",
          visible: "opacity-100 scale-100",
        };
      case "blur-in":
        return {
          hidden: "opacity-0 blur-md scale-[0.98]",
          visible: "opacity-100 blur-none scale-100",
        };
      case "fade":
        return {
          hidden: "opacity-0",
          visible: "opacity-100",
        };
      default:
        return {
          hidden: "opacity-0 translate-y-12",
          visible: "opacity-100 translate-y-0",
        };
    }
  };

  const { hidden, visible } = getVariantStyles();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-[transform,opacity,filter]",
        isIntersecting ? visible : hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: easing,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
