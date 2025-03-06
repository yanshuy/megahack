import { Product } from "@/context/CartContext";

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Local Vine Tomatoes",
    description:
      "Grown with care by our dedicated farmers, these tomatoes are plucked at their prime for unrivaled freshness and flavor. Our vine tomatoes are known for their juicy texture and rich, sweet taste that adds depth to any dish. Harvested just hours before delivery, these tomatoes retain all their natural nutrients and vibrant color.",
    price: 12.8,
    unit: "1kg",
    image: "/placeholder.svg?height=200&width=200",
    category: "Veggies",
    farmer: {
      id: "f1",
      name: "F. Acrest",
      rating: 4.2,
      image: "/placeholder.svg?height=50&width=50",
    },
    availableQuantities: ["500g", "1kg", "1.5kg", "2kg", "2.5kg", "5kg"],
  },
  {
    id: "2",
    name: "Fresh Yukon Gold Potatoes",
    description:
      "Premium Yukon Gold potatoes known for their buttery flavor and smooth texture. Perfect for mashing, roasting, or making gourmet fries. These potatoes are grown using sustainable farming practices and harvested at peak ripeness.",
    price: 17.25,
    unit: "1kg",
    image: "/placeholder.svg?height=200&width=200",
    category: "Veggies",
    farmer: {
      id: "f2",
      name: "D. Anaste",
      rating: 4.9,
      image: "/placeholder.svg?height=50&width=50",
    },
    availableQuantities: ["1kg", "2kg", "5kg"],
  },
  {
    id: "3",
    name: "Organic Strawberries",
    description:
      "Sweet and juicy organic strawberries picked fresh from our local farms. These vibrant red berries are packed with flavor and essential nutrients. Perfect for snacking, baking, or adding to your favorite smoothie.",
    price: 15.5,
    unit: "500g",
    image: "/placeholder.svg?height=200&width=200",
    category: "Fruits",
    farmer: {
      id: "f3",
      name: "M. Orhard",
      rating: 4.7,
      image: "/placeholder.svg?height=50&width=50",
    },
    availableQuantities: ["250g", "500g", "1kg"],
  },
  {
    id: "4",
    name: "Farm Fresh Eggs",
    description:
      "Free-range eggs from pasture-raised hens. Our hens are fed a natural diet and allowed to roam freely, resulting in eggs with rich, golden yolks and exceptional flavor. Each egg is hand-collected and inspected for quality.",
    price: 8.99,
    unit: "dozen",
    image: "/placeholder.svg?height=200&width=200",
    category: "Dairy Products",
    farmer: {
      id: "f4",
      name: "S. Medow",
      rating: 4.3,
      image: "/placeholder.svg?height=50&width=50",
    },
    availableQuantities: ["half dozen", "dozen", "2 dozen"],
  },
  {
    id: "5",
    name: "Organic Baby Spinach",
    description:
      "Tender, organic baby spinach leaves harvested at the perfect stage for maximum flavor and nutrition. Our spinach is grown without pesticides and is triple-washed for your convenience. Ideal for salads, smoothies, or sautéing.",
    price: 6.75,
    unit: "250g",
    image: "/placeholder.svg?height=200&width=200",
    category: "Veggies",
    farmer: {
      id: "f1",
      name: "F. Acrest",
      rating: 4.2,
      image: "/placeholder.svg?height=50&width=50",
    },
    availableQuantities: ["250g", "500g", "1kg"],
  },
  {
    id: "6",
    name: "Artisanal Goat Cheese",
    description:
      "Creamy, handcrafted goat cheese made in small batches from the milk of locally raised goats. This cheese has a mild, tangy flavor and smooth texture. Perfect for spreading on crackers, crumbling over salads, or melting into pasta dishes.",
    price: 14.5,
    unit: "200g",
    image: "/placeholder.svg?height=200&width=200",
    category: "Dairy Products",
    farmer: {
      id: "f2",
      name: "D. Anaste",
      rating: 4.9,
      image: "/placeholder.svg?height=50&width=50",
    },
    availableQuantities: ["100g", "200g", "500g"],
  },
];
