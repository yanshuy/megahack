import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  amount: number;
  // Add other properties as needed
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREMENT_ITEM"; payload: string }
  | { type: "DECREMENT_ITEM"; payload: string };

type CartContextType = {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, amount: item.amount + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, amount: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, amount: item.amount + 1 }
            : item,
        ),
      };

    case "DECREMENT_ITEM":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, amount: item.amount - 1 }
              : item,
          )
          .filter((item) => item.amount > 0),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage
  const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const incrementItem = (id: string) => {
    dispatch({ type: "INCREMENT_ITEM", payload: id });
  };

  const decrementItem = (id: string) => {
    dispatch({ type: "DECREMENT_ITEM", payload: id });
  };

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, incrementItem, decrementItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
