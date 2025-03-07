export interface Farmer {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  currentMarketPlaceId?: number;
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
    currentMarketPlaceId: 1, // Assigned to marketplace with id 1
  },
  {
    id: 2,
    name: "A. Prakash",
    image: "/api/placeholder/80/80",
    rating: 4.9,
    products: ["Fruits"],
    location: "Tamil Nadu",
    verificationBadges: ["Free-range", "Local"],
    currentMarketPlaceId: 1, // Assigned to marketplace with id 1
  },
  {
    id: 3,
    name: "D. Singh",
    image: "/api/placeholder/80/80",
    rating: 4.8,
    products: ["Dairy", "Vegetables"],
    location: "Punjab",
    verificationBadges: ["Free-range", "Local"],
    // No currentMarketPlaceId for this farmer
  },
  {
    id: 4,
    name: "Kutu Tai",
    image: "/api/placeholder/80/80",
    rating: 4.8,
    products: ["Fruits", "Vegetables"],
    location: "Maharashtra",
    verificationBadges: ["Free-range", "Local"],
    currentMarketPlaceId: 1, // Assigned to marketplace with id 1
  },
  {
    id: 5,
    name: "Rajesh Patil",
    image: "/api/placeholder/80/80",
    rating: 4.8,
    products: ["Fruits"],
    location: "Maharashtra",
    verificationBadges: ["Free-range", "Local"],
    // No currentMarketPlaceId for this farmer
  },
  {
    id: 6,
    name: "Suresh Kumar",
    image: "/api/placeholder/80/80",
    rating: 4.7,
    products: ["Dairy"],
    location: "Haryana",
    verificationBadges: ["Free-range", "Local"],
    currentMarketPlaceId: 1, // Assigned to marketplace with id 1
  },
];
