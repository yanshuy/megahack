import { FarmerProduct } from "@/context/CartContext"
import { Farmer } from "@/pages/farmer-profile/page"


export const farmerData: Farmer = {
  id: "1",
  name: "S. Anant",
  location: "Karnataka",
  image: "https://images.unsplash.com/photo-1609252509102-aa73ff792667?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  rating: 4.9,
  totalReviews: 128,
  categories: ["Vegetables", "Fruits"],
  description:
    "Passionate organic farmer with over 15 years of experience in sustainable farming. Specializing in seasonal vegetables and exotic fruits.",
  contactNumber: "+91 98765 43210",
  email: "anant.s@farmersmarket.com",
  reviews: [
    {
      id: "1",
      userId: "user1",
      userName: "Rahul Kumar",
      userImage: "/placeholder.svg?height=50&width=50",
      rating: 5,
      comment: "Excellent quality products, always fresh and organic!",
      createdAt: "2024-03-01T10:00:00Z",
    },
    // Add more reviews as needed
  ],
}

export const products: FarmerProduct[] = [
  {
    id: "1",
    name: "Organic Moringa Powder",
    description: "100% organic moringa powder, rich in nutrients and antioxidants.",
    price: 800,
    unit: "250g",
    images: ["/placeholder.svg?height=200&width=200"],
    tasteProfile: "Mild, earthy flavor",
    growingPractices: "Organic farming, no pesticides",
    certifications: ["Organic Certified", "Non-GMO"],
    category: "Spices",
    availableQuantities: ["100g", "250g", "500g"],
    farmer: {
      id: "1",
      name: "S. Anant",
      image: "/placeholder.svg?height=50&width=50",
      rating: 4.9,
    },
  },
  // Add more products
]

