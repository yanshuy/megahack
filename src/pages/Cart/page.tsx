import { ChevronLeft, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { RupeeSymbol } from "@/utils/randomcolor";

const CartScreen = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Format price to 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-(--bg-neutral) pb-[12vh]">
      <div className="flex items-center border-b border-gray-100 p-4">
        <ChevronLeft
          className="cursor-pointer text-gray-700"
          onClick={() => navigate(-1)}
        />
        <h1 className="flex-grow text-center text-xl font-bold">Your Cart</h1>
        <div className="w-6"></div>
      </div>

      {cart.items.length === 0 ? (
        <div className="flex flex-grow flex-col items-center justify-center p-6">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
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
          </div>
          <h2 className="mb-2 text-xl font-bold">Your cart is empty</h2>
          <p className="mb-6 text-center text-gray-500">
            Looks like you haven't added any products to your cart yet.
          </p>
          <button
            className="rounded-full bg-green-700 px-6 py-3 font-medium text-white"
            onClick={() => navigate("/")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-4">
            {/* Cart items */}
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-bold">
                Cart Items ({cart.items.length})
              </h2>

              {cart.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedUnit}`}
                  className="mb-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
                >
                  <div className="flex">
                    <img
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">
                          {item.product.name}
                        </h3>
                        <button
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="mb-1 text-xs text-gray-500">
                        {item.selectedUnit} • {RupeeSymbol}
                        {item.product.price}/{item.product.unit}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus
                              size={14}
                              className={
                                item.quantity <= 1 ? "text-gray-300" : ""
                              }
                            />
                          </button>
                          <span className="mx-2 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold">
                          {RupeeSymbol}
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="mb-4 rounded-xl bg-gray-50 p-4">
              <h2 className="mb-3 text-lg font-bold">Order Summary</h2>

              <div className="mb-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${formatPrice(cart.summary.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    {cart.summary.deliveryFee === 0 ? (
                      <span className="text-green-700">Free</span>
                    ) : (
                      `${RupeeSymbol}${formatPrice(cart.summary.deliveryFee)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (5%)</span>
                  <span className="font-medium">
                    {RupeeSymbol}
                    {formatPrice(cart.summary.platformFee)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="font-bold">Total</span>
                <span className="text-lg font-bold">
                  {RupeeSymbol}
                  {formatPrice(cart.summary.total)}
                </span>
              </div>
            </div>

            {/* Delivery info */}
            <div className="mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Delivery Address</h3>
                <button className="text-sm font-medium text-green-700">
                  Change
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                123 Main St, Los Angeles, CA 90001
              </p>
            </div>

            {/* Payment method */}
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Payment Method</h3>
                <button className="text-sm font-medium text-green-700">
                  Change
                </button>
              </div>
              <div className="mt-2 flex items-center">
                <div className="mr-2 h-6 w-10 rounded bg-blue-600"></div>
                <span className="text-sm text-gray-600">•••• 4242</span>
              </div>
            </div>
          </div>

          {/* Checkout button */}
          <div className="border-t border-gray-200 p-4">
            <button className="flex w-full items-center justify-center rounded-full bg-green-700 py-3 font-medium text-white">
              Proceed to Checkout
              <ArrowRight size={18} className="ml-2" />
            </button>
            <button
              className="mt-3 w-full py-2 font-medium text-green-700"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
