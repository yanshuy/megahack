"use client"

import { useState } from "react"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { FarmerProduct, useCart } from "@/context/CartContext"

interface ProductCardProps {
  product: FarmerProduct
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()
  const [selectedUnit, setSelectedUnit] = useState(product.availableQuantities[0])

  const handleAddToCart = () => {
    addToCart(product, 1, selectedUnit)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full px-2 py-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.farmer.rating}</span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {product.availableQuantities.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="font-bold">₹{product.price}</span>
        </div>
        <Button onClick={handleAddToCart} className="w-full bg-green-600 hover:bg-green-700">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

