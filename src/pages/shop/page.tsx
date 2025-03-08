import {
  Bean,
  CarrotIcon,
  Cherry,
  Flame,
  Menu,
  Milk,
  Search,
} from "lucide-react";
import { useState } from "react";
import { ProductCard } from "../Home/page";
import { FarmerProduct, useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { products } from "@/data/product-dummy";
import { farmers } from "@/data/farmer-dummy";

export default function Shop() {
  const { addToCart } = useCart();

  const navigate = useNavigate();
  const handleAddToCart = (product: FarmerProduct) => {
    addToCart(product, 1, product.unit);
  };

  const [selectedCategory, setSelectedCategory] =
    useState<FarmerProduct["category"]>("Veggies");

  return (
    <div className="flex h-full min-h-screen flex-col bg-(--bg-neutral) pb-[12vh]">
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
                <span>Mumbai</span>
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
              className={`flex items-center gap-2 rounded-full ${
                selectedCategory == item.name
                  ? "bg-green-700 text-white"
                  : "border bg-white"
              } px-4 py-3 font-medium whitespace-nowrap`}
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
            {farmers.map((farmer) => (
              <button
                className="flex flex-col items-center"
                onClick={() => navigate(`/farmers/${farmer.id}`)}
              >
                <img
                  src={farmer.image}
                  alt="Farmer"
                  className="mb-1 size-20 min-w-20 rounded-full object-cover"
                />
                <p className="text-xs font-medium">
                  {farmer.name.split(" ")[0][0]}. {farmer.name.split(" ")[1]}
                </p>
                <div className="mt-1 flex items-center rounded-full bg-white px-2 py-0.5 text-xs">
                  <span className="mr-1 text-yellow-500">★</span>
                  <span>{farmer.rating}</span>
                </div>
              </button>
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
}
