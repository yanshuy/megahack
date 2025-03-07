export interface Farmer {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  products: string[];
  verificationBadges: string[];
}

export const farmers: Farmer[] = [
  {
    id: 1,
    name: "S. Anant",
    image: "/api/placeholder/80/80",
    rating: 4.9,
    products: ["Vegetables", "Fruits"],
    location: "Karnataka",
    verificationBadges: ["Free-range", "Local"],
  },
  {
    id: 2,
    name: "A. Prakash",
    image: "/api/placeholder/80/80",
    rating: 4.9,
    products: ["Fruits"],
    location: "Tamil Nadu",
    verificationBadges: ["Free-range", "Local"],
  },
  {
    id: 3,
    name: "D. Singh",
    image: "/api/placeholder/80/80",
    rating: 4.8,
    products: ["Dairy", "Vegetables"],
    location: "Punjab",
    verificationBadges: ["Free-range", "Local"],
  },
  {
    id: 4,
    name: "Kutu Tai",
    image: "/api/placeholder/80/80",
    rating: 4.8,
    products: ["Fruits", "Vegetables"],
    location: "Maharashtra",
    verificationBadges: ["Free-range", "Local"],
  },
  {
    id: 5,
    name: "Rajesh Patil",
    image: "/api/placeholder/80/80",
    rating: 4.8,
    products: ["Fruits"],
    location: "Maharashtra",
    verificationBadges: ["Free-range", "Local"],
  },
  {
    id: 6,
    name: "Suresh Kumar",
    image: "/api/placeholder/80/80",
    rating: 4.7,
    products: ["Dairy"],
    location: "Haryana",
    verificationBadges: ["Free-range", "Local"],
  },
];

const farmers2 = [
  {
    id: "1",
    name: "John Smith",
    image: "/placeholder.svg?height=300&width=300",
    location: "California",
    rating: 4.8,
    products: ["Apples", "Pears", "Cherries"],
    verificationBadges: ["Organic", "Local"],
  },
  {
    id: "2",
    name: "Emma Johnson",
    image: "/placeholder.svg?height=300&width=300",
    location: "Texas",
    rating: 4.5,
    products: ["Tomatoes", "Cucumbers", "Peppers"],
    verificationBadges: ["Sustainable"],
  },
  {
    id: "3",
    name: "Michael Brown",
    image: "/placeholder.svg?height=300&width=300",
    location: "New York",
    rating: 4.9,
    products: ["Milk", "Cheese", "Yogurt"],
    verificationBadges: ["Organic", "Humane"],
  },
  {
    id: "4",
    name: "Sarah Davis",
    image: "/placeholder.svg?height=300&width=300",
    location: "Oregon",
    rating: 4.7,
    products: ["Beef", "Pork", "Chicken"],
    verificationBadges: ["Free-range", "Local"],
  },
  {
    id: "5",
    name: "David Wilson",
    image: "/placeholder.svg?height=300&width=300",
    location: "Florida",
    rating: 4.6,
    products: ["Oranges", "Grapefruits", "Lemons"],
    verificationBadges: ["Organic"],
  },
  {
    id: "6",
    name: "Lisa Taylor",
    image: "/placeholder.svg?height=300&width=300",
    location: "Washington",
    rating: 4.8,
    products: ["Potatoes", "Onions", "Carrots"],
    verificationBadges: ["Sustainable", "Local"],
  },
];
