"use client"

import { useEffect } from "react"
import { FarmerHeader } from "./FarmerHeader"
import { ProductCard } from "./ProductCard"
import { ReviewSection } from "../farmer-profile/ReviewSection"
import { ContactSection } from "./ContactSection"
import { farmerData, products } from "../../data/dummy"

export interface Review {
  id: string
  userId: string
  userName: string
  userImage: string
  rating: number
  comment: string
  createdAt: string
}

export interface Farmer {
  id: string
  name: string
  location: string
  image: string
  rating: number
  totalReviews: number
  categories: string[]
  description: string
  contactNumber: string
  email: string
  reviews: Review[]
}


export const FarmerProfile = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <FarmerHeader farmer={farmerData} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">About</h2>
              <p className="text-gray-600 dark:text-gray-300">{farmerData.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <ReviewSection farmer={farmerData} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ContactSection farmer={farmerData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

