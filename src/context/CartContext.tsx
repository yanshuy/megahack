// Cart context to manage cart state across the application
import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  farmer: {
    id: string;
    name: string;
    rating: number;
    image: string;
  };
  availableQuantities: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedUnit: string;
}

export interface CartSummary {
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  total: number;
}

// Define the state shape for our cart
interface CartState {
  items: CartItem[];
  summary: CartSummary;
}

// Define the actions that can be performed on the cart
type CartAction =
  | {
      type: "ADD_ITEM";
      payload: { product: Product; quantity: number; selectedUnit: string };
    }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

// Define the context interface
interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity: number, selectedUnit: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Calculate cart summary based on items
const calculateSummary = (items: CartItem[]): CartSummary => {
  const subtotal = items.reduce((sum, item) => {
    // Convert unit quantities to numerical values for calculation
    let quantityMultiplier = 1;

    if (item.selectedUnit.includes("kg")) {
      const kgValue = Number.parseFloat(item.selectedUnit.replace("kg", ""));
      quantityMultiplier = kgValue;
    } else if (item.selectedUnit.includes("g")) {
      const gValue = Number.parseFloat(item.selectedUnit.replace("g", ""));
      quantityMultiplier = gValue / 1000; // Convert to kg
    } else if (item.selectedUnit.includes("dozen")) {
      if (item.selectedUnit === "half dozen") {
        quantityMultiplier = 0.5;
      } else if (item.selectedUnit === "2 dozen") {
        quantityMultiplier = 2;
      }
      // 'dozen' is already 1
    }

    return sum + item.product.price * item.quantity * quantityMultiplier;
  }, 0);

  // Calculate fees
  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const platformFee = subtotal * 0.05; // 5% platform fee

  return {
    subtotal,
    deliveryFee,
    platformFee,
    total: subtotal + deliveryFee + platformFee,
  };
};

// Initial state for the cart
const initialState: CartState = {
  items: [],
  summary: {
    subtotal: 0,
    deliveryFee: 0,
    platformFee: 0,
    total: 0,
  },
};

// Reducer function to handle cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, selectedUnit } = action.payload;

      // Check if the product is already in the cart
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id && item.selectedUnit === selectedUnit,
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update quantity if the product is already in the cart
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item to cart
        updatedItems = [...state.items, { product, quantity, selectedUnit }];
      }

      // Calculate new summary
      const summary = calculateSummary(updatedItems);

      return {
        items: updatedItems,
        summary,
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.product.id !== action.payload.productId,
      );

      // Calculate new summary
      const summary = calculateSummary(updatedItems);

      return {
        items: updatedItems,
        summary,
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;

      // Don't allow quantities less than 1
      if (quantity < 1) {
        return state;
      }

      const updatedItems = state.items.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });

      // Calculate new summary
      const summary = calculateSummary(updatedItems);

      return {
        items: updatedItems,
        summary,
      };
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
};

const loadState = (): CartState => {
  try {
    const savedCart = localStorage.getItem("farmersMarketCart");
    return savedCart ? JSON.parse(savedCart) : initialState;
  } catch (error) {
    console.error("Failed to load cart:", error);
    return initialState;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, loadState());

  useEffect(() => {
    console.log("hrun");

    try {
      localStorage.setItem("farmersMarketCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // Cart actions
  const addToCart = (
    product: Product,
    quantity: number,
    selectedUnit: string,
  ) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, quantity, selectedUnit },
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
