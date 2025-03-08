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
    name: "marketplace_1_name", // Translation key
    description: "marketplace_1_description", // Translation key
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQC8n9M9MjMdx7C70gnGizqCEv3rXYoTBTpo4rZWcnhv-bOcEJA-r5CVyKT9v9qYLsE6g&usqp=CAU",
      "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202109/agra_private_market.jpg?size=690:388",
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
    features: ["organic", "local"], // Store feature keys
    rating: 4.5,
    totalReviews: 150,
    createdAt: new Date("2022-05-15"),
    updatedAt: new Date("2023-12-20"),
  },
];
