import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FarmerCard from "@/components/FarmerCard";
import { farmers } from "@/data/farmer-dummy";

// Sample data for farmers

const FarmersDirectoryPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [activeFilters, setActiveFilters] = useState<
    {
      type: string;
      value: string;
    }[]
  >([]);

  // Filter farmers based on current filters
  const filteredFarmers = farmers.filter((farmer) => {
    // Search query filter
    if (
      searchQuery &&
      !farmer.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Location filter
    if (selectedLocation && farmer.location !== selectedLocation) {
      return false;
    }

    // Product type filter
    if (selectedProductType && !farmer.products.includes(selectedProductType)) {
      return false;
    }

    // Rating filter
    if (farmer.rating < minRating) {
      return false;
    }

    return true;
  });

  // Apply filters and update active filters
  const applyFilters = () => {
    const newActiveFilters = [];

    if (selectedLocation) {
      newActiveFilters.push({ type: "location", value: selectedLocation });
    }

    if (selectedProductType) {
      newActiveFilters.push({ type: "product", value: selectedProductType });
    }

    if (minRating > 0) {
      newActiveFilters.push({ type: "rating", value: `${minRating}+ Stars` });
    }

    setActiveFilters(newActiveFilters);
    setShowFilters(false);
  };

  // Remove a specific filter
  const removeFilter = (filterToRemove: { type: string; value: string }) => {
    if (filterToRemove.type === "location") {
      setSelectedLocation("");
    } else if (filterToRemove.type === "product") {
      setSelectedProductType("");
    } else if (filterToRemove.type === "rating") {
      setMinRating(0);
    }

    setActiveFilters(
      activeFilters.filter(
        (f) =>
          !(f.type === filterToRemove.type && f.value === filterToRemove.value),
      ),
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedProductType("");
    setMinRating(0);
    setActiveFilters([]);
  };

  return (
    <div className="min-h-screen bg-(--bg-neutral) pb-[12vh]">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Farmers Directory</h1>
        <div className="flex items-center space-x-2">
          <button
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mt-0 px-4 pb-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium">Active Filters:</span>
            <button
              className="font text-sm font-medium text-green-600"
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center rounded-full bg-green-700 px-3 py-1 text-sm text-white"
              >
                <span>{filter.value}</span>
                <button className="ml-1" onClick={() => removeFilter(filter)}>
                  <X className="mt-0.5 size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="px-4 pt-1 pb-3">
        <div className="relative">
          <Search className="absolute top-3 left-3 h-5 w-5 translate-y-0.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search farmers or products"
            className="w-full rounded-full border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 gap-4 p-4">
        {filteredFarmers.map((farmer) => (
          <FarmerCard farmer={farmer} />
        ))}
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 pb-32"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="py-1 text-xl font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Location Filter */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Haryana">Haryana</option>
                  </select>
                </div>

                {/* Product Type Filter */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Product Type
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                    value={selectedProductType}
                    onChange={(e) => setSelectedProductType(e.target.value)}
                  >
                    <option value="">All Products</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Dairy">Dairy</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Minimum Rating: {minRating}+
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-green-700"
                  />
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>5</span>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  className="w-full rounded-lg bg-green-700 py-3 font-medium text-white"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmersDirectoryPage;
