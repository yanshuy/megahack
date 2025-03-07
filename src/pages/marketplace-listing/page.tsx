import { marketplaces } from "@/data/marketplaces";
import MarketplaceListings from "./MarketListings";

export default function MarketplacesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <MarketplaceListings marketplaces={marketplaces} />
      </div>
    </div>
  );
}
