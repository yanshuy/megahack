export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Farmer {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  currentMarketPlaceId?: number;
  products: string[];
  verificationBadges: string[];
  totalReviews?: number;
  description?: string;
  contactNumber?: string;
  email?: string;
  reviews?: Review[];
}

export const farmers: Farmer[] = [
  {
    id: 1,
    name: "S. Anant",
    image:
      "https://images.unsplash.com/photo-1609252509102-aa73ff792667?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    products: ["Vegetables", "Fruits"],
    location: "Karnataka",
    verificationBadges: ["Free-range", "Local"],
    currentMarketPlaceId: 1,
    totalReviews: 128,
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
    ],
  },
  {
    id: 2,
    name: "A. Prakash",
    image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e2?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    products: ["Fruits"],
    location: "Tamil Nadu",
    verificationBadges: ["Free-range", "Local"],
    currentMarketPlaceId: 1,
    totalReviews: 115,
    description:
      "Dedicated farmer producing high-quality organic fruits with sustainable farming techniques.",
    contactNumber: "+91 98765 43211",
    email: "prakash.a@farmersmarket.com",
    reviews: [
      {
        id: "2",
        userId: "user2",
        userName: "Priya Sharma",
        userImage: "/placeholder.svg?height=50&width=50",
        rating: 5,
        comment: "The best organic fruits I've ever had!",
        createdAt: "2024-02-28T12:30:00Z",
      },
    ],
  },
  {
    id: 3,
    name: "D. Singh",
    image: "https://images.unsplash.com/photo-1474447976065-67d23accb1e3?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    products: ["Dairy", "Vegetables"],
    location: "Punjab",
    verificationBadges: ["Free-range", "Local"],
    totalReviews: 98,
    description:
      "Experienced dairy farmer producing high-quality milk and fresh farm vegetables with organic methods.",
    contactNumber: "+91 98765 43212",
    email: "dsingh@farmersmarket.com",
    reviews: [
      {
        id: "3",
        userId: "user3",
        userName: "Amit Verma",
        userImage: "/placeholder.svg?height=50&width=50",
        rating: 4.7,
        comment: "Milk and vegetables are fresh and pure!",
        createdAt: "2024-02-20T09:15:00Z",
      },
    ],
  },
  {
    id: 4,
    name: "Kutu Tai",
    image: "https://images.unsplash.com/photo-1503777119540-7e50c0ebbd41?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    products: ["Fruits", "Vegetables"],
    location: "Maharashtra",
    verificationBadges: ["Free-range", "Local"],
    currentMarketPlaceId: 1,
    totalReviews: 105,
    description:
      "Passionate about organic fruit and vegetable farming, providing fresh produce to local markets.",
    contactNumber: "+91 98765 43213",
    email: "kutu.tai@farmersmarket.com",
    reviews: [
      {
        id: "4",
        userId: "user4",
        userName: "Sneha Iyer",
        userImage: "/placeholder.svg?height=50&width=50",
        rating: 5,
        comment: "Great quality, fresh and delicious!",
        createdAt: "2024-02-18T14:10:00Z",
      },
    ],
  },
  {
    id: 5,
    name: "Rajesh Patil",
    image: "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    products: ["Fruits"],
    location: "Maharashtra",
    verificationBadges: ["Free-range", "Local"],
    totalReviews: 90,
    description:
      "Expert in tropical fruit farming, ensuring premium quality produce with sustainable methods.",
    contactNumber: "+91 98765 43214",
    email: "rajesh.patil@farmersmarket.com",
    reviews: [
      {
        id: "5",
        userId: "user5",
        userName: "Vikas Gupta",
        userImage: "/placeholder.svg?height=50&width=50",
        rating: 4.6,
        comment: "Mangoes and bananas were really sweet and fresh!",
        createdAt: "2024-02-15T16:45:00Z",
      },
    ],
  },
  {
    id: 6,
    name: "Suresh Kumar",
    image: "https://images.unsplash.com/photo-1555992336-03a23c88a1a8?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    products: ["Dairy"],
    location: "Haryana",
    verificationBadges: ["Free-range", "Local"],
    currentMarketPlaceId: 1,
    totalReviews: 85,
    description:
      "Committed to ethical dairy farming, delivering fresh, unprocessed milk straight from the farm.",
    contactNumber: "+91 98765 43215",
    email: "suresh.kumar@farmersmarket.com",
    reviews: [
      {
        id: "6",
        userId: "user6",
        userName: "Neha Jain",
        userImage: "/placeholder.svg?height=50&width=50",
        rating: 4.8,
        comment: "Pure and fresh dairy products!",
        createdAt: "2024-02-10T11:20:00Z",
      },
    ],
  },
];
