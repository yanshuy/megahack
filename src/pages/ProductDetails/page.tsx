import { useState } from "react";
import { ChevronLeft, Bookmark, ShoppingCart, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { products } from "@/components/data/product-dummy";

const ProductDetailScreen = ({
  product,
}: {
  product: (typeof products)[0];
}) => {
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(
    product.availableQuantities[0],
  );

  const { addToCart, cart } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity, selectedUnit);
  };

  const increaseQuantity = () => {
    setSelectedQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)}></button>
        <ChevronLeft className="text-gray-700" />
        <div className="flex-grow"></div>
        <button
          className="relative mr-4 cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="text-gray-700" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>
        <Bookmark className="text-gray-700" />
      </div>

      <div className="flex flex-grow basis-full flex-col overflow-y-auto">
        <img
          src="/placeholder.svg?height=300&width=400"
          alt="Tomatoes"
          className="h-64 w-full rounded-lg object-cover"
        />

        <div className="my-4 flex justify-center space-x-1">
          <div className="h-1.5 w-6 rounded-full bg-green-700"></div>
          <div className="h-1.5 w-6 rounded-full bg-green-200"></div>
          <div className="h-1.5 w-6 rounded-full bg-green-200"></div>
        </div>

        <div className="flex-grow bg-(--bg-neutral)/80">
          <h1 className="mt-5 px-5 text-2xl font-bold">{product.name}</h1>

          <div className="mt-4 flex items-center px-6">
            <img
              src="https://placehold.co/600x400/"
              alt="Farmer"
              className="mr-2 h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">F. Acrest</p>
              <div className="flex items-center">
                <span className="mr-1 text-yellow-500">★</span>
                <span className="text-sm">{product.farmer.rating}</span>
              </div>
            </div>
            <div className="ml-auto">
              <p className="text-lg font-semibold">
                ${product.price}/ {product.unit}
              </p>
            </div>
          </div>

          <p className="mt-4 text-gray-600">
            {product.description.length > 150
              ? `${product.description.substring(0, 150)}... `
              : product.description}
            {product.description.length > 150 && (
              <span className="font-medium text-green-700"> Read more</span>
            )}
          </p>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between px-5">
              <h3 className="font-bold">Select Quantity</h3>
              {/* <button className="font-medium text-green-700">Customize</button> */}
            </div>

            <div className="no-scrollbar flex space-x-3 overflow-x-auto px-4 pb-2">
              {product.availableQuantities.map((unit) => (
                <button
                  key={unit}
                  className={`rounded-full border px-4 py-2 ${
                    selectedUnit === unit
                      ? "border-green-700 bg-green-700 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => setSelectedUnit(unit)}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-3 font-bold">Quantity</h3>
            <div className="flex items-center">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300"
                onClick={decreaseQuantity}
              >
                <Minus size={16} />
              </button>
              <span className="mx-4 text-lg font-bold">{selectedQuantity}</span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300"
                onClick={increaseQuantity}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="fixed bottom-2 w-full p-4">
            <div className="flex">
              <button
                className="flex-grow rounded-l-full bg-green-700 py-3 font-medium text-white"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <div className="w-px bg-green-800"></div>
              <button className="rounded-r-full bg-green-700 px-6 py-3 font-medium text-white">
                ${(product.price * selectedQuantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
