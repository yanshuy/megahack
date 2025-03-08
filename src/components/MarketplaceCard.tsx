import { MapPin, Users, Star, Clock, ChevronRight } from "lucide-react";
import { Marketplace } from "@/data/marketplaces";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface MarketplaceCardProps {
  marketplace: Marketplace;
}

export default function MarketplaceCard({ marketplace }: MarketplaceCardProps) {
  const navigate = useNavigate();
  const today = new Date().getDay();
  const adjustedDay = today === 0 ? 6 : today - 1;
  const todayHours =
    marketplace.operatingHours && marketplace.operatingHours[adjustedDay];
  const isOpenToday = todayHours && !todayHours.isClosed;
  const hoursDisplay = isOpenToday
    ? `${todayHours.open} - ${todayHours.close}`
    : "Closed Today";

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Image */}
      <div className="relative h-40 w-full">
        <img
          src="https://placehold.co/600x400"
          alt={marketplace.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {!isOpenToday && (
          <div className="absolute top-2 right-2 rounded-lg bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
            Closed
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Header */}
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {marketplace.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="ml-1 text-sm">{marketplace.rating}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-gray-400"></span>
            <span className="text-sm text-gray-600">
              <Users className="mr-1 inline h-4 w-4" />
              {marketplace.farmers.length} Farmers
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-3 flex items-center text-gray-600">
          <MapPin className="mr-2 h-5 w-5 text-gray-500" />
          <span className="text-sm">
            {marketplace.address.city}, {marketplace.address.state}
          </span>
        </div>

        {/* Hours */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2 h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Today's Hours</p>
              <p className="text-sm">{hoursDisplay}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4 flex flex-wrap gap-2">
          {marketplace.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800"
            >
              {feature}
            </span>
          ))}
          {marketplace.features.length > 2 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              +{marketplace.farmers.length - 2}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {/* {marketplace.organic && (
              <span className="flex items-center">🌱 Organic</span>
            )}
            {marketplace.localProduce && (
              <span className="flex items-center">� Local</span>
            )} */}
          </div>
          <button
            className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            onClick={() => navigate(`/market/${marketplace.id}`)}
          >
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
          
        </div>
      </div>
    </div>
  );
}
