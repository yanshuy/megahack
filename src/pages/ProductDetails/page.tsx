import { useState } from "react";
import { ChevronLeft, Bookmark } from "lucide-react";

const ProductDetailScreen = () => {
  const [selectedQuantity, setSelectedQuantity] = useState("1kg");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-4">
        <ChevronLeft className="text-gray-700" />
        <div className="flex-grow"></div>
        <Bookmark className="text-gray-700" />
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="px-4 pb-4">
          <img
            src="/placeholder.svg?height=300&width=400"
            alt="Tomatoes"
            className="h-64 w-full rounded-lg object-cover"
          />

          <div className="mt-4 flex justify-center space-x-1">
            <div className="h-1.5 w-6 rounded-full bg-green-700"></div>
            <div className="h-1.5 w-6 rounded-full bg-green-200"></div>
            <div className="h-1.5 w-6 rounded-full bg-green-200"></div>
          </div>

          <h1 className="mt-6 text-2xl font-bold">
            5kg Lately Harvested Local Vine Tomatoes
          </h1>

          <div className="mt-4 flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Farmer"
              className="mr-2 h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">F. Acrest</p>
              <div className="flex items-center">
                <span className="mr-1 text-yellow-500">★</span>
                <span className="text-sm">4.2</span>
              </div>
            </div>
            <div className="ml-auto">
              <p className="text-xl font-bold">$12.80/ 1kg</p>
            </div>
          </div>

          <p className="mt-4 text-gray-600">
            Grown with care by our dedicated farmers, these tomatoes are plucked
            at their prime for unrivaled freshness and flavor...
            <span className="font-medium text-green-700">Read more</span>
          </p>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold">Select Quantity</h3>
              <button className="font-medium text-green-700">Customize</button>
            </div>

            <div className="flex space-x-3 overflow-x-auto pb-2">
              <button
                className={`rounded-full border px-4 py-2 ${selectedQuantity === "500g" ? "border-green-700 bg-green-700 text-white" : "border-gray-300 bg-white"}`}
                onClick={() => setSelectedQuantity("500g")}
              >
                500 g
              </button>
              <button
                className={`rounded-full border px-4 py-2 ${selectedQuantity === "1kg" ? "border-green-700 bg-green-700 text-white" : "border-gray-300 bg-white"}`}
                onClick={() => setSelectedQuantity("1kg")}
              >
                1 kg
              </button>
              <button
                className={`rounded-full border px-4 py-2 ${selectedQuantity === "1.5kg" ? "border-green-700 bg-green-700 text-white" : "border-gray-300 bg-white"}`}
                onClick={() => setSelectedQuantity("1.5kg")}
              >
                1.5 kg
              </button>
              <button
                className={`rounded-full border px-4 py-2 ${selectedQuantity === "2kg" ? "border-green-700 bg-green-700 text-white" : "border-gray-300 bg-white"}`}
                onClick={() => setSelectedQuantity("2kg")}
              >
                2 kg
              </button>
              <button
                className={`rounded-full border px-4 py-2 ${selectedQuantity === "2.5kg" ? "border-green-700 bg-green-700 text-white" : "border-gray-300 bg-white"}`}
                onClick={() => setSelectedQuantity("2.5kg")}
              >
                2.5 kg
              </button>
              <button
                className={`rounded-full border px-4 py-2 ${selectedQuantity === "5kg" ? "border-green-700 bg-green-700 text-white" : "border-gray-300 bg-white"}`}
                onClick={() => setSelectedQuantity("5kg")}
              >
                5 kg
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex">
          <button className="flex-grow rounded-l-full bg-green-700 py-3 font-medium text-white">
            Add to cart
          </button>
          <div className="w-px bg-green-800"></div>
          <button className="rounded-r-full bg-green-700 px-6 py-3 font-medium text-white">
            $12.80
          </button>
        </div>
        <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-black"></div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
