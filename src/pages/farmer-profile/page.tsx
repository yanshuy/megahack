import { useEffect } from "react";
import { FarmerHeader } from "./FarmerHeader";
import { ReviewSection } from "../farmer-profile/ReviewSection";
import { ContactSection } from "./ContactSection";

import { products } from "@/data/product-dummy";
import { useNavigate, useParams } from "react-router-dom";
import { FarmerProduct, useCart } from "@/context/CartContext";
import { ProductCard } from "../Home/page";
import { useQuery } from "@tanstack/react-query";
import { uFetch } from "@/utils/utility";
import { Loader } from "../farmer-products/page";

export const FarmerProfileForUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  // const farmer = id ? farmers.find((fm) => fm.id == parseInt(id)) || farmers[0] : farmers[0]

  const { data: farmer, isLoading } = useQuery({
    queryKey: ["farmer", parseInt(id) ? parseInt(id) : 1],
    queryFn: () => {
      return uFetch(`/api/farmers/${parseInt(id) ? parseInt(id) : 1}`);
    },
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product: FarmerProduct) => {
    addToCart(product, 1, product.unit);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-(--bg-neutral) pb-[12vh] dark:bg-gray-900">
      <FarmerHeader farmer={farmer} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold">About</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {farmer.description}
              </p>
            </div>

            <h2 className="mb-3 text-2xl font-bold">Products</h2>
            <div className="no-scrollbar mb-6 flex gap-4 overflow-x-auto p-4 pt-1 pl-0">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => navigate(`/product/${product.id}`)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>

            <ReviewSection farmer={farmer} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ContactSection farmer={farmer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
