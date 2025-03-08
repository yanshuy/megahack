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
    name: "marketplace_1_name",  // Translation key
    description: "marketplace_1_description",  // Translation key
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
      "https://imgs.search.brave.com/7J_R3Xw_J5WF5resR7OUgRpkvh2tdWbErDeesCjs5Ps/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ5L0Zhcm1lcnMn/X01hcmtldF9pbl9D/aGFuZGlnYXJoLmpw/Zw",
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
    features: ["organic", "local"],  // Store feature keys
    rating: 4.5,
    totalReviews: 150,
    createdAt: new Date("2022-05-15"),
    updatedAt: new Date("2023-12-20"),
  },
];

