import { useState } from "react";
import { ChevronLeft, Bookmark, ShoppingCart, Minus, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/product-dummy";
import { RupeeSymbol } from "@/utils/randomcolor";

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const product =
    products[Number.isNaN(Number(productId)) ? 0 : Number(productId)];
  const navigate = useNavigate();

  const [selectedUnit, setSelectedUnit] = useState(
    product?.availableQuantities[0],
  );
  const { addToCart, removeFromCart, cart } = useCart();
  const isAdded = cart.items.some(
    (item) =>
      item.product.id === product.id && item.selectedUnit === selectedUnit,
  );

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedUnit);
  };

  const increaseQuantity = () => {
    addToCart(product, 1, selectedUnit);
  };

  const decreaseQuantity = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="text-gray-700" />
        </button>
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
          src="https://media.gettyimages.com/id/171589415/photo/tomatoes.jpg?s=612x612&w=0&k=20&c=meLJRFAyGEM6zt6dkpW7uM0x2Wvwr3THCzTA5mFQgFI="
          alt="Tomatoes"
          className="h-64 w-full object-cover"
        />

        <div className="my-4 flex justify-center space-x-1">
          <div className="h-1.5 w-6 rounded-full bg-green-700"></div>
          <div className="h-1.5 w-6 rounded-full bg-green-200"></div>
          <div className="h-1.5 w-6 rounded-full bg-green-200"></div>
        </div>

        <div className="flex-grow bg-(--bg-neutral)/65">
          <h1 className="mt-5 px-5 text-2xl font-bold">{product.name}</h1>

          <div className="mt-6 flex items-center pr-8 pl-5">
            <img
              src="https://placehold.co/600x400/"
              alt="Farmer"
              className="mr-2 size-14 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">F. Acrest</p>
              <div className="mt-1 max-w-fit rounded-full bg-white pr-2 pl-1.5">
                <span className="mr-1 text-yellow-500">★</span>
                <span className="text-sm">{product.farmer.rating}</span>
              </div>
            </div>
            <div className="ml-auto">
              <p className="text-lg font-semibold">
                {RupeeSymbol}
                {product.price}/ {product.unit}
              </p>
            </div>
          </div>

          <p className="mt-6 px-5 text-gray-600">
            {product.description.length > 150
              ? `${product.description.substring(0, 150)}... `
              : product.description}
            {product.description.length > 150 && (
              <span className="font-medium text-green-700"> Read more</span>
            )}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between px-5">
              <h3 className="font-bold">Select Quantity</h3>
              {/* <button className="font-medium text-green-700">Customize</button> */}
            </div>

            <div className="no-scrollbar flex space-x-3 overflow-x-auto px-4 py-2">
              {product.availableQuantities.map((unit) => (
                <button
                  key={unit}
                  className={`rounded-full px-4 py-2 shadow-[0px_0px_1px_0.5px_#d1d5dc] ${
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
          <div className="fixed right-0 bottom-1 left-0 p-4">
            <div className="flex items-center justify-between gap-2">
              <button
                className="flex flex-1 items-center justify-between rounded-full bg-green-700 px-6 py-3 font-medium text-white transition-all"
                onClick={handleAddToCart}
              >
                {!isAdded ? (
                  <div className="flex w-full justify-between p-0.5 text-lg">
                    <span>Add to cart</span>
                    <span>
                      {RupeeSymbol}
                      {(
                        product.price *
                        (cart.items.find(
                          (item) =>
                            item.product.id === product.id &&
                            item.selectedUnit === selectedUnit,
                        )?.quantity || 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-green-800 hover:bg-green-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        decreaseQuantity();
                      }}
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-lg font-bold">
                      {cart.items.find(
                        (item) =>
                          item.product.id === product.id &&
                          item.selectedUnit === selectedUnit,
                      )?.quantity || 1}
                    </span>

                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-green-800 hover:bg-green-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseQuantity();
                      }}
                    >
                      <Plus size={16} />
                    </button>

                    <span className="ml-4">
                      {RupeeSymbol}
                      {(
                        product.price *
                        (cart.items.find(
                          (item) =>
                            item.product.id === product.id &&
                            item.selectedUnit === selectedUnit,
                        )?.quantity || 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
