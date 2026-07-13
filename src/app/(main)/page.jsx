import React from "react";
import HomeHero from "@/components/landingPageComponents/HomeHero";
import FeaturedMedicines from "@/components/landingPageComponents/FeaturedMedicines";

export default function Page() {
  return (
    <div className="space-y-4">
      <HomeHero />
      <FeaturedMedicines />
    </div>
  );
}
