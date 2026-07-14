import React from "react";
import { cn } from "@/lib/utils";

export default function Container({ children, className, ...props }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
