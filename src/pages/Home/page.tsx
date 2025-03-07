import { products } from "@/data/product-dummy";
import { FarmerProduct, useCart } from "@/context/CartContext";
import { getProductBadgeStyle, RupeeSymbol } from "@/utils/utility";

import {
  Search,
  Menu,
  CarrotIcon,
  Cherry,
  Milk,
  Star,
  Bean,
  Flame,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductCard: React.FC<{
  product: FarmerProduct;
  onClick: () => void;
  onAddToCart: () => void;
}> = ({ product, onClick, onAddToCart }) => {
  console.log(product);
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
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: FarmerProduct) => {
    addToCart(product, 1, product.unit);
  };

  const [selectedCategory, setSelectedCategory] =
    useState<Pick<FarmerProduct, "category">>("Veggies");

  return (
    <div className="flex h-full min-h-screen flex-col bg-(--bg-neutral) pb-[11vh]">
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

        <div className="no-scrollbar mb-2 flex space-x-2 overflow-x-auto px-4 pb-2">
          {[
            {
              icon: CarrotIcon,
              name: "Veggies",
            },
            {
              icon: Cherry,
              name: "Fruits",
            },
            {
              icon: Milk,
              name: "Dairy",
            },

            {
              icon: Bean,
              name: "Grains",
            },

            {
              icon: Flame,
              name: "Spices",
            },
          ].map((item) => (
            <button
              className={`flex items-center gap-2 rounded-full ${selectedCategory == item.name ? "bg-green-700 text-white" : "border bg-white"} px-4 py-3 font-medium whitespace-nowrap`}
              onClick={() => setSelectedCategory(item.name)}
            >
              <item.icon />
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="no-scrollbar mb-6 flex gap-4 overflow-x-auto p-4 pt-1">
          {products
            .filter((product) => {
              if (product.category == selectedCategory) return true;
              return false;
            })
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.id}`)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between px-4">
            <h2 className="text-xl font-bold">Best Farmers</h2>
            <a href="#" className="text-sm font-medium text-green-600">
              View all
            </a>
          </div>
          <div className="no-scrollbar flex space-x-3 overflow-x-auto px-4 pt-2 pb-4">
            {[
              {
                img: "https://media.gettyimages.com/id/538620640/photo/indian-farmer-holding-freshly-picked-capsicums.jpg?s=612x612&w=0&k=20&c=8dUyuHwUU545sCtgFbdnpujNxP50PxrcEzDoO7IxLi0=",
                name: "S. Anant",
                review: "4.9",
              },
              {
                img: "https://media.gettyimages.com/id/1313437484/photo/farmer-with-arms-crossed-in-agriculture-field.jpg?s=612x612&w=0&k=20&c=EOmZnOHSFxn3ffF1QLKKZDKiGMnpfuuLSIlPsSXfLQ8=",
                name: "A. Prakash",
                review: "4.9",
              },
              {
                img: "https://media.gettyimages.com/id/1186928936/photo/wheat-grains-in-man-hand-stock-photo.jpg?s=612x612&w=0&k=20&c=ALHedSbQ9QKD3Mgz4FutPqTvZu14Y6OxIKLb7xq9HLA=",
                name: "D. Singh",
                review: "4.8",
              },
              {
                img: "https://media.gettyimages.com/id/1524726433/photo/farmer-woman-holding-crop-at-green-agricultural-field.jpg?s=612x612&w=0&k=20&c=6C7a03yrQ5Z8LGnA1JvPKkitD9s156_fwjHVikL-z2k=",
                name: "Kutu Tai",
                review: "4.8",
              },
              {
                img: "https://media.gettyimages.com/id/1205325344/photo/farmer-in-agricultural-field.jpg?s=612x612&w=0&k=20&c=krsRk4T2MsmMy6PmrpPDR0i_1ja3_jQaNl80fBejWck=",
                name: "Birju",
                review: "4.8",
              },
            ].map((farmer) => (
              <div className="flex flex-col items-center">
                <img
                  src={farmer.img}
                  alt="Farmer"
                  className="mb-1 size-20 min-w-20 rounded-full object-cover"
                />
                <p className="text-xs font-medium">{farmer.name}</p>
                <div className="mt-1 flex items-center rounded-full bg-white px-2 py-0.5 text-xs">
                  <span className="mr-1 text-yellow-500">★</span>
                  <span>{farmer.review}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 mb-4 flex items-center justify-between px-4">
          <h2 className="text-xl font-bold">Recently Listed</h2>
          <a href="#" className="text-sm font-medium text-green-600">
            View all
          </a>
        </div>
        <div className="no-scrollbar mb-6 flex gap-4 overflow-x-auto p-4 pt-1">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
