import { Search, Menu, Plus, CarrotIcon, Cherry, Milk } from "lucide-react";

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

      <div className="flex-grow overflow-y-auto pt-4">
        <h2 className="mb-4 px-4 text-xl font-bold">Shop By Categories</h2>

        <div className="no-scrollbar mb-6 flex space-x-2 overflow-x-auto px-4 pb-2">
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
        <div className="px-4">
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
              <div className="mt-1 flex items-center rounded-full bg-white px-2 py-0.5 text-xs">
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
      </div>
    </div>
  );
};

export default MarketplaceScreen;
