import MarketplaceCard from "@/components/MarketplaceCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Marketplace } from "@/data/marketplaces";

interface MarketplaceListingsProps {
  marketplaces: Marketplace[];
}

export default function MarketplaceListings({
  marketplaces,
}: MarketplaceListingsProps) {
  return (
    <div>
      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold">Available Marketplaces</h2>
          <div className="flex flex-wrap gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="farmers">Number of Farmers</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="organic">Organic Only</SelectItem>
                <SelectItem value="weekly">Weekly Markets</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Marketplace grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {marketplaces.map((marketplace) => (
          <MarketplaceCard key={marketplace.id} marketplace={marketplace} />
        ))}
      </div>

      {/* Load more button */}
      <div className="mt-8 text-center">
        <Button variant="outline">Load More Markets</Button>
      </div>
    </div>
  );
}
