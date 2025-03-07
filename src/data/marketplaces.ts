export interface GeoLocation {
  latitude: number;
  longitude: number;
}

// Address type
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: GeoLocation;
}

// Operating hours type
export interface OperatingHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

// Review type
export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  farmerId: string;
  attributes: string[]; // ['organic', 'seasonal', etc.]
  images: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Farmer type
export interface Farmer {
  id: string;
  name: string;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  address: Address;
  products: string[]; // Product IDs
  marketplaceVisits: string[]; // Marketplace IDs
  profileImage: string;
  bio: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
  specialties: string[];
  certifications: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Marketplace type
export interface Marketplace {
  id: string;
  name: string;
  description: string;
  address: Address;
  images: string[];
  operatingHours: OperatingHours[];
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  farmers: string[]; // Farmer IDs
  products: string[]; // Product IDs
  features: string[]; // ['parking', 'restrooms', etc.]
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export const marketplaces: Marketplace[] = [
  {
    id: "1",
    name: "Apna Mandi",
    description:
      "A bustling weekly market showcasing the rich agricultural diversity of India. Discover fresh, locally-sourced produce, traditional spices, handcrafted textiles, and regional delicacies. Experience the vibrant culture and warm hospitality of rural India.",
    address: {
      street: "Near Gandhi Maidan",
      city: "Palghar",
      state: "Maharashtra",
      zipCode: "401404",
      country: "India",
      coordinates: {
        latitude: 19.6929,
        longitude: 72.7469,
      },
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    operatingHours: [
      { day: "Monday", open: "Closed", close: "Closed", isClosed: true },
      { day: "Tuesday", open: "7:00", close: "19:00", isClosed: false },
      { day: "Wednesday", open: "7:00", close: "19:00", isClosed: false },
      { day: "Thursday", open: "7:00", close: "19:00", isClosed: false },
      { day: "Friday", open: "7:00", close: "19:00", isClosed: false },
      { day: "Saturday", open: "6:00", close: "20:00", isClosed: false },
      { day: "Sunday", open: "6:00", close: "18:00", isClosed: false },
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "contact@apnamandi.in",
      website: "www.apnamandi.in",
    },
    farmers: ["farmer1", "farmer2", "farmer3", "farmer4", "farmer5"],
    products: ["1", "2", "3", "4", "5"],
    features: [
      "parking",
      "restrooms",
      "street food stalls",
      "cultural performances",
    ],
    rating: 4.5,
    totalReviews: 150,
    createdAt: new Date("2022-05-15"),
    updatedAt: new Date("2023-12-20"),
  },
  // Add more marketplace data as needed
];
