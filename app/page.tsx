import { Hero } from "@/components/home/hero";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { BestSellers } from "@/components/home/best-sellers";
import { NewArrivals } from "@/components/home/new-arrivals";
import { DealsCountdown } from "@/components/home/deals-countdown";
import { PCBuilderPromo } from "@/components/home/pc-builder-promo";
import { TrustBadges } from "@/components/home/trust-badges";
import { VisitStore } from "@/components/home/visit-store";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoriesGrid />
      <BestSellers />
      <NewArrivals />
      <PCBuilderPromo />
      <DealsCountdown />
      <VisitStore />
      <TrustBadges />
    </div>
  );
}
