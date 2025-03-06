import {
  ChevronLeft,
  Search,
  Menu,
  Plus,
  CarrotIcon,
  Cherry,
  Milk,
} from "lucide-react";

const MarketplaceScreen = () => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-(--bg-neutral)">
      <div className="flex items-center p-4">
        <div className="flex flex-grow items-center">
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Profile"
              className="mr-2 h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Robert Martiz</p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-1">📍</span>
                <span>Los Angeles</span>
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

      <div className="flex-grow overflow-y-auto px-4 pt-4">
        <h2 className="mb-4 text-xl font-bold">Shop By Categories</h2>

        <div className="no-scrollbar mb-6 flex space-x-2 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 rounded-full bg-green-700 px-4 py-3 font-medium whitespace-nowrap text-white">
            <CarrotIcon />
            <span>Veggies</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 font-medium whitespace-nowrap text-black shadow-sm">
            <Cherry />
            <span>Fruits</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 font-medium whitespace-nowrap text-black shadow-sm">
            <Milk />
            <span>Dairy Products</span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recently Listed</h2>
          <a href="#" className="text-sm font-medium text-green-600">
            View all
          </a>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
            <img
              src="/placeholder.svg?height=150&width=150"
              alt="Tomatoes"
              className="h-32 w-full object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-medium">
                Fresh Local Vine Tomatoes (5kg)
              </h3>
              <p className="mt-1 text-sm">$12.80/ 1kg</p>
              <button className="absolute right-3 bottom-3 rounded-md bg-green-700 p-1 text-white">
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
            <img
              src="/placeholder.svg?height=150&width=150"
              alt="Potatoes"
              className="h-32 w-full object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-medium">
                2kg Fresh Yukon Gold Potatoes
              </h3>
              <p className="mt-1 text-sm">$34.53/ 2kg</p>
              <button className="absolute right-3 bottom-3 rounded-md bg-green-700 p-1 text-white">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Best Farmers</h2>
          <a href="#" className="text-sm font-medium text-green-600">
            View all
          </a>
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-4">
          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg?height=60&width=60"
              alt="Farmer"
              className="mb-1 h-14 w-14 rounded-full"
            />
            <p className="text-xs font-medium">D. Anaste</p>
            <div className="flex items-center text-xs">
              <span className="mr-1 text-yellow-500">★</span>
              <span>4.9</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg?height=60&width=60"
              alt="Farmer"
              className="mb-1 h-14 w-14 rounded-full"
            />
            <p className="text-xs font-medium">M. Orhard</p>
            <div className="flex items-center text-xs">
              <span className="mr-1 text-yellow-500">★</span>
              <span>4.7</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg?height=60&width=60"
              alt="Farmer"
              className="mb-1 h-14 w-14 rounded-full"
            />
            <p className="text-xs font-medium">S. Medow</p>
            <div className="flex items-center text-xs">
              <span className="mr-1 text-yellow-500">★</span>
              <span>4.3</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg?height=60&width=60"
              alt="Farmer"
              className="mb-1 h-14 w-14 rounded-full"
            />
            <p className="text-xs font-medium">F. Acrest</p>
            <div className="flex items-center text-xs">
              <span className="mr-1 text-yellow-500">★</span>
              <span>4.2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-5 py-3">
          <div className="flex flex-col items-center text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="mt-1 text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span className="mt-1 text-xs">Explore</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700">
              <Plus className="text-white" />
            </div>
            <span className="mt-1 text-xs text-gray-500">Add</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="mt-1 text-xs">Farmers</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="mt-1 text-xs">Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceScreen;
