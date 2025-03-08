import { MapPin, Users, Star, Clock, ChevronRight } from "lucide-react";
import { Marketplace } from "@/data/marketplaces";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface MarketplaceCardProps {
  marketplace: Marketplace;
}

export default function MarketplaceCard({ marketplace }: MarketplaceCardProps) {
  const { t } = useTranslation("marketplacecard");

  const navigate = useNavigate();
  const today = new Date().getDay();
  const adjustedDay = today === 0 ? 6 : today - 1;
  const todayHours =
    marketplace.operatingHours && marketplace.operatingHours[adjustedDay];
  const isOpenToday = todayHours && !todayHours.isClosed;
  const hoursDisplay = isOpenToday
    ? `${todayHours.open} - ${todayHours.close}`
    : t("marketplace.closedToday");

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Image */}
      <div className="relative h-40 w-full">
        <img
          src="https://placehold.co/600x400"
          alt={t(`marketplace.${marketplace.name}`)}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {!isOpenToday && (
          <div className="absolute top-2 right-2 rounded-lg bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
            {t("marketplace.closedLabel")}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Header */}
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {t(`marketplace.${marketplace.name}`)}
          </h3>
          <p className="text-sm text-gray-600">
            {t(`marketplace.${marketplace.description}`)}
          </p>
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
            <p className="mr-2 font-medium text-gray-900">
              {t("marketplace.todayHours")}
            </p>
            <p className="text-sm"> {hoursDisplay}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4 flex flex-wrap gap-2">
          {marketplace.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800"
            >
              {t(`marketplace.features.${feature}`)}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t pt-3">
          <button className="flex items-center text-sm font-medium text-green-600 hover:text-green-700">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {/* {marketplace.organic && (
              <span className="flex items-center">🌱 Organic</span>
            )}
            {marketplace.localProduce && (
              <span className="flex items-center">� Local</span>
            )} */}
            </div>
          </button>
          <button
            className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            onClick={() => navigate(`/market/${marketplace.id}`)}
          >
            {t("marketplace.viewDetails")}
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
