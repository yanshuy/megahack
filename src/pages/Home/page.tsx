import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Map from "@/components/Map";
import { marketplaces } from "@/data/marketplaces";
import MarketplaceCard from "@/components/MarketplaceCard";
import { products } from "@/data/product-dummy";
import { FarmerProduct, useCart } from "@/context/CartContext";
import { getProductBadgeStyle, RupeeSymbol } from "@/utils/utility";
import {
  ArrowRight,
  Bean,
  CarrotIcon,
  Cherry,
  ChevronDown,
  Flame,
  MapPin,
  Menu,
  Milk,
  Search,
  Star,
} from "lucide-react";

export const ProductCard: React.FC<{
  product: FarmerProduct;
  onClick: () => void;
  onAddToCart: () => void;
}> = ({ product, onClick, onAddToCart }) => {
  return (
    <div className="relative min-w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-full bg-white p-1 shadow-sm">
          <div className="flex items-center text-xs">
            <Star className="mr-0.5 h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span>{product.farmer.rating}</span>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="p-3" onClick={onClick}>
        <div className="mb-1 flex items-center">
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${getProductBadgeStyle(product.category)}`}
          >
            {product.category}
          </span>
        </div>
        <h3 className="mt-2 line-clamp-2 h-8 font-medium">{product.name}</h3>
        <div className="mt-1 mb-2 flex items-center">
          <span className="text-xs text-gray-500">{product.farmer.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">
            {RupeeSymbol}
            {product.price}/ {product.unit}
          </p>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        className="absolute right-3 bottom-3 rounded-full bg-green-700 px-3 py-1.5 text-sm text-white shadow-md transition-colors hover:bg-green-800"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart();
        }}
      >
        ADD
      </button>
    </div>
  );
};

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const navigate = useNavigate();

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              {
                headers: {
                  "User-Agent": "ParkEase App (your@email.com)", // Replace with your contact
                },
              },
            );
            const data = await response.json();
            setUserLocation(data.display_name);
            console.log(data);
          } catch (error) {
            setUserLocation("");
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          setUserLocation("");
          console.error("Error getting location:", error);
        },
      );
    }
  }, []);

  const truncateLocation = (location: string) => {
    const words = location.split(" ");
    if (words.length <= 2) return location;
    return words.slice(0, 2).join(" ") + "...";
  };

  const handleLocationClick = () => {
    setIsLocationExpanded(!isLocationExpanded);
  };

  // Update the handleSearch function in Home.tsx
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/searchparkingspot", { state: { searchQuery } });
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-(--bg-neutral) pb-[12vh]">
      <div className="flex items-center p-4">
        <div className="flex flex-grow items-center">
          <div className="flex items-center">
            <img
              src="https://placehold.co/600x400/teal/gold/"
              alt="Profile"
              className="mr-2 h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">Vinayak Sharma</p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="mt-1">📍</span>
                <span>Mumbai</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="rounded-full border p-3">
            <Search className="size-6 text-gray-700" />
          </div>
          <div className="rounded-full border p-3">
            <Menu className="size-6 text-gray-700" />
          </div>
        </div>
      </div>

      <div className="relative h-[50vh] overflow-hidden">
        <Map onlyMap={true} />
        <div className="absolute inset-0 z-[10] flex h-full flex-col justify-between bg-blue-950/50 p-6">
          <div className="mb-8 flex h-full flex-col justify-between text-white">
            <div className="relative">
              <button
                onClick={handleLocationClick}
                className="flex w-full flex-col gap-2 rounded-lg transition-all duration-200 hover:bg-white/10"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-100">Your location</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isLocationExpanded ? "rotate-180" : ""} ${
                      window.innerWidth > 768 ? "hidden" : ""
                    }`}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 -translate-x-0.5 text-cyan-400" />
                  <div className="flex flex-col">
                    <p className="-translate-x-1 text-start text-sm font-medium">
                      {!isLocationExpanded && window.innerWidth < 768
                        ? userLocation
                          ? truncateLocation(userLocation)
                          : "Loading location..."
                        : userLocation}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex flex-col">
              <h1 className="mb-4 text-4xl font-semibold">
                Let's find some Farmer's Markets
              </h1>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for parking spots..."
                  className="w-full rounded-lg border bg-transparent px-4 py-3 pl-12 text-white placeholder-white focus:outline-none md:w-1/2"
                />
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white" />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Spots Section */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Nearby Farmer's Markets</h2>
            <p className="mb-5 text-gray-500">
              The best farmer's markets near you
            </p>
          </div>
          <Link to={"/"} className="max-md:hidden">
            <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-violet-500 px-4 py-2 text-center text-white">
              View More <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {marketplaces
            .slice(0, window.innerWidth > 1023 ? 3 : 2)
            .map((marketplace) => (
              <MarketplaceCard key={marketplace.id} marketplace={marketplace} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
