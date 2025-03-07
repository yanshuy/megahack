import { MapPin, Users, Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Marketplace } from "@/data/marketplaces";

interface MarketplaceCardProps {
  marketplace: Marketplace;
}

export default function MarketplaceCard({ marketplace }: MarketplaceCardProps) {
  const isOpen = () => {
    const now = new Date();
    const day = now.toLocaleDateString("en-US", { weekday: "long" });
    const currentHours = marketplace.operatingHours.find((h) => h.day === day);

    if (!currentHours || currentHours.isClosed) return false;

    const currentTime = now.getHours() * 100 + now.getMinutes();
    const [openHour, openMinute] = currentHours.open.split(":").map(Number);
    const [closeHour, closeMinute] = currentHours.close.split(":").map(Number);

    const openTime = openHour * 100 + openMinute;
    const closeTime = closeHour * 100 + closeMinute;

    return currentTime >= openTime && currentTime <= closeTime;
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-48">
        <img
          src={marketplace.images[0] || "/placeholder.svg"}
          alt={marketplace.name}
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge variant={isOpen() ? "default" : "secondary"}>
            {isOpen() ? "Open Now" : "Closed"}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{marketplace.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="ml-1 text-sm">{marketplace.rating}</span>
          </div>
        </div>

        <div className="mb-3 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{`${marketplace.address.city}, ${marketplace.address.state}`}</span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {marketplace.description}
        </p>

        <div className="mb-4 flex items-center text-sm text-gray-500">
          <Users className="mr-1 h-4 w-4" />
          <span>{`${marketplace.farmers.length}+ Farmers`}</span>
          <Clock className="mr-1 ml-4 h-4 w-4" />
          <span>
            {marketplace.operatingHours.find((h) => !h.isClosed)?.open} -{" "}
            {marketplace.operatingHours.find((h) => !h.isClosed)?.close}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {marketplace.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="outline">
              {feature}
            </Badge>
          ))}
          {marketplace.features.length > 3 && (
            <Badge variant="outline">
              +{marketplace.features.length - 3} more
            </Badge>
          )}
        </div>

        <Button className="w-full">View Details</Button>
      </div>
    </div>
  );
}
