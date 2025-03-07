"use client"

import { useEffect } from "react"
import { FarmerHeader } from "./FarmerHeader"
import { ReviewSection } from "../farmer-profile/ReviewSection"
import { ContactSection } from "./ContactSection"
import { farmers } from "@/data/farmer-dummy"
import { products } from "@/data/product-dummy"
import { useNavigate, useParams } from "react-router-dom"
import { FarmerProduct, useCart } from "@/context/CartContext"
import { ProductCard } from "../Home/page"

export const FarmerProfileForUser = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { addToCart } = useCart()

    const farmer = id ? farmers.find((fm) => fm.id == parseInt(id)) || farmers[0] : farmers[0]

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  const handleAddToCart = (product: FarmerProduct) => {
    addToCart(product, 1, product.unit);
  };

  return (
    <div className="min-h-screen bg-(--bg-neutral) dark:bg-gray-900 pb-[12vh]">
      <FarmerHeader farmer={farmer} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">About</h2>
              <p className="text-gray-600 dark:text-gray-300">{farmer.description}</p>
            </div>

            <h2 className="text-2xl font-bold mb-3">Products</h2>
            <div className="no-scrollbar mb-6 flex gap-4 overflow-x-auto p-4 pl-0 pt-1">
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
  )
}