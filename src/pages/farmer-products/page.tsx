import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Star,
  ShoppingCart,
  Bookmark,
  Plus,
  Minus,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "@/data/product-dummy";
import { RupeeSymbol } from "@/utils/randomcolor";

const FarmerProductListing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
    );
  };

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  const { productId } = useParams();
  const product =
    products[Number.isNaN(Number(productId)) ? 0 : Number(productId) - 1];
  const navigate = useNavigate();

  const [selectedUnit, setSelectedUnit] = useState(product?.unit);
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
    <div className="mx-auto max-w-4xl p-4 pb-[12vh]">
      <div className="flex items-center px-1 pt-2 pb-4">
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
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
        <div className="mb-4 flex items-center">
          <img
            src={product.farmer.image || "/placeholder.svg"}
            alt={product.farmer.name}
            className="mr-2 size-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{product.farmer.name}</p>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="ml-1">{product.farmer.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-8">
        <img
          src={product.images[currentImageIndex] || "/placeholder.svg"}
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          className="h-96 w-full rounded-lg object-cover"
        />
        <button
          onClick={prevImage}
          className="bg-opacity-50 absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white p-2"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="bg-opacity-50 absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white p-2"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-4 gap-2">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`${product.name} - Thumbnail ${index + 1}`}
            className={`h-24 w-full cursor-pointer rounded-lg object-cover ${
              index === currentImageIndex ? "border-2 border-green-700" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>

      {product.video && (
        <div className="relative mb-8">
          <video
            src={product.video}
            className="h-96 w-full rounded-lg object-cover"
            poster={product.images[0]}
          />
          <button
            onClick={toggleVideo}
            className="bg-opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-4"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </button>
        </div>
      )}

      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold">Taste Profile</h2>
        <p className="text-gray-700">{product.tasteProfile}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold">Growing Practices</h2>
        <p className="text-gray-700">{product.growingPractices}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold">Certifications</h2>
        <div className="flex flex-wrap">
          {product.certifications.map((cert, index) => (
            <span
              key={index}
              className="mr-2 mb-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold">Pricing</h2>
        <p className="text-3xl font-bold text-green-600">
          {RupeeSymbol}
          {product.price.toFixed(2)}{" "}
          <span className="text-base font-normal text-gray-600">
            per {product.unit}
          </span>
        </p>
      </div>

      <div className="fixed right-0 bottom-0 left-0 bg-white p-4">
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
  );
};

export default FarmerProductListing;
