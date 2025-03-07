import { useState } from "react";
import {
  MapPin,
  Star,
  MessageSquare,
  ChevronRight,
  Share2,
  Bookmark,
  Navigation,
  Coffee,
  Music,
  ParkingCircle,
  Toilet,
  ChevronLeft,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { marketplaces } from "@/data/marketplaces";
import { farmers } from "@/data/farmer-dummy";

const MarketplaceDetailPage = () => {
  // Products sample data
  const products = [
    {
      id: "1",
      name: "Alphonso Mangoes",
      price: "₹1200/ 1 dozen",
      image: "/api/placeholder/120/120",
      category: "Fruits",
      farmer: "Rajesh Patil",
    },
    {
      id: "2",
      name: "Gir Cow Ghee",
      price: "₹2500/ 1 kg",
      image: "/api/placeholder/120/120",
      category: "Dairy",
      farmer: "Suresh Kumar",
    },
    {
      id: "3",
      name: "Organic Tomatoes",
      price: "₹60/ 1 kg",
      image: "/api/placeholder/120/120",
      category: "Vegetables",
      farmer: "S. Anant",
    },
    {
      id: "4",
      name: "Kashmiri Saffron",
      price: "₹450/ 1 g",
      image: "/api/placeholder/120/120",
      category: "Spices",
      farmer: "Rajesh Patil",
    },
    {
      id: "5",
      name: "Pure Honey",
      price: "₹350/ 500 g",
      image: "/api/placeholder/120/120",
      category: "Others",
      farmer: "D. Singh",
    },
  ];

  const { marketId } = useParams();
  const marketplace =
    marketplaces[Number.isNaN(Number(marketId)) ? 1 : Number(marketId) - 1];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  // Get current day for highlighting in operating hours
  const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });

  // Function to format operating hours display
  const formatHours = (hours) => {
    if (hours.isClosed) return "Closed";
    return `${hours.open} - ${hours.close}`;
  };

  // Function to get icon for features
  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case "parking":
        return <ParkingCircle className="h-4 w-4" />;
      case "restrooms":
        return <Toilet className="h-4 w-4" />;
      case "street food stalls":
        return <Coffee className="h-4 w-4" />;
      case "cultural performances":
        return <Music className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
        <div className="flex items-center">
          <Link to="/marketplaces" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">{marketplace.name}</h1>
        </div>
        <div className="flex space-x-3">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
          >
            {marketplace.images.map((image, index) => (
              <img
                key={index}
                src="https://placehold.co/600x400"
                alt={`${marketplace.name} - Image ${index + 1}`}
                className="h-64 w-full flex-shrink-0 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute right-0 bottom-4 left-0 flex justify-center space-x-2">
          {marketplace.images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === activeImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Title & Rating */}
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{marketplace.name}</h1>
          <div className="flex items-center rounded-lg bg-white px-2 py-1 shadow-sm">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span className="ml-1 font-medium">{marketplace.rating}</span>
            <span className="mx-1 text-gray-400">|</span>
            <span className="text-sm text-gray-600">
              {marketplace.totalReviews} reviews
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-4 flex items-center text-gray-600">
          <MapPin className="mr-1 h-4 w-4" />
          <p className="text-sm">
            {marketplace.address.street}, {marketplace.address.city},{" "}
            {marketplace.address.state}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center rounded-lg border border-green-600 bg-white py-3 font-medium text-green-600">
            <Navigation className="mr-2 h-4 w-4" />
            Get Directions
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4 flex border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "info"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Information
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "farmers"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("farmers")}
          >
            Farmers
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "products"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "info" && (
          <div className="space-y-6">
            {/* Description */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h2 className="mb-2 text-lg font-bold">About</h2>
              <p className="text-sm leading-relaxed text-gray-700">
                {marketplace.description}
              </p>
            </div>

            {/* Features */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Facilities & Features</h2>
              <div className="grid grid-cols-2 gap-3">
                {marketplace.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <div className="mr-2 rounded-full bg-green-100 p-2">
                      {getFeatureIcon(feature)}
                    </div>
                    <span className="text-sm capitalize">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Operating Hours</h2>
              <div className="space-y-2">
                {marketplace.operatingHours.map((hours, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-1 ${
                      hours.day === currentDay ? "font-medium" : ""
                    }`}
                  >
                    <span className="text-sm">{hours.day}</span>
                    <span
                      className={`text-sm ${hours.isClosed ? "text-red-500" : "text-green-600"}`}
                    >
                      {formatHours(hours)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Location</h2>
              <div className="mb-3 flex h-40 items-center justify-center rounded-lg bg-gray-200">
                <MapPin className="h-6 w-6 text-gray-500" />
                <span className="ml-2 text-gray-500">Map View</span>
              </div>
              <p className="text-sm text-gray-700">
                {marketplace.address.street}, <br />
                {marketplace.address.city}, {marketplace.address.state} -{" "}
                {marketplace.address.zipCode}, <br />
                {marketplace.address.country}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold">Reviews</h2>
                <button className="flex items-center text-sm font-medium text-green-600">
                  See All <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex items-center">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <span className="ml-1 text-lg font-medium">
                    {marketplace.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Based on {marketplace.totalReviews} reviews
                </span>
              </div>
              <button className="flex w-full items-center justify-center rounded-lg border border-green-600 py-2 font-medium text-green-600">
                <MessageSquare className="mr-2 h-4 w-4" />
                Write a Review
              </button>
            </div>
          </div>
        )}

        {activeTab === "farmers" && (
          <div className="space-y-4">
            <h2 className="mb-2 text-lg font-bold">Featured Farmers</h2>
            <div className="grid grid-cols-1 gap-3">
              {farmers
                .filter((farmer) => {
                  if (
                    farmer.currentMarketPlaceId ==
                    (Number.isNaN(Number(marketId)) ? 1 : Number(marketId))
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((farmer) => (
                  <div
                    key={farmer.id}
                    className="flex items-center rounded-lg bg-white p-3 shadow-sm"
                  >
                    <img
                      src={farmer.image}
                      alt={farmer.name}
                      className="mr-3 h-16 w-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{farmer.name}</h3>
                      <div className="mb-1 flex items-center text-sm text-amber-500">
                        <Star className="mr-1 h-4 w-4 fill-amber-500 stroke-amber-500" />
                        <span>{farmer.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {farmer.products.map((product, idx) => (
                          <span
                            key={idx}
                            className={`rounded-full px-2 py-1 text-xs ${
                              product === "Vegetables"
                                ? "bg-green-100 text-green-800"
                                : product === "Fruits"
                                  ? "bg-orange-100 text-orange-800"
                                  : product === "Dairy"
                                    ? "bg-blue-100 text-blue-800"
                                    : product === "Spices"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
            </div>
            <div className="flex justify-center">
              <button className="flex items-center font-medium text-green-600">
                View All Farmers <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-4">
            <h2 className="mb-2 text-lg font-bold">Available Products</h2>
            <div className="grid grid-cols-1 gap-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex overflow-hidden rounded-lg bg-white shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 object-cover"
                  />
                  <div className="flex-1 p-3">
                    <span
                      className={`mb-1 inline-block rounded-full px-2 py-1 text-xs ${
                        product.category === "Vegetables"
                          ? "bg-green-100 text-green-800"
                          : product.category === "Fruits"
                            ? "bg-orange-100 text-orange-800"
                            : product.category === "Dairy"
                              ? "bg-blue-100 text-blue-800"
                              : product.category === "Spices"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.category}
                    </span>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">By {product.farmer}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-bold text-green-600">
                        {product.price}
                      </span>
                      <button className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="flex items-center font-medium text-green-600">
                View All Products <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceDetailPage;
