import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, accessToken } from "@/App";

const InventoryContext = createContext(null);

export const useInventory = () => useContext(InventoryContext);

const shelfGridPositions = [
  // Bottom shelf
  [
    [15.285, 1.3, 43], // Left
    [15.285, 1.3, 38.998], // Middle
    [15.285, 1.3, 35], // Right
  ],
  // Middle shelf
  [
    [15.285, 4.45, 43], // Left
    [15.285, 4.45, 38.998], // Middle
    [15.285, 4.45, 35], // Right
  ],
  // Top shelf
  [
    [15.285, 7.0, 43], // Left
    [15.285, 7.0, 38.998], // Middle
    [15.285, 7.0, 35], // Right
  ],
];

// Hash function to generate consistent pseudo-random values based on item ID
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const generateStableRandom = (min, max, seed) => {
  const normalized = (Math.sin(seed) + 1) / 2; // Normalize between 0 and 1
  return min + normalized * (max - min);
};

const generateStablePosition = (id, index) => {
  const hash = hashString(id);

  const shelfIndex = index % shelfGridPositions.length;
  const columnIndex = index % shelfGridPositions[shelfIndex].length;
  const basePosition = shelfGridPositions[shelfIndex][columnIndex];

  if (!basePosition) return [0, 0, 0];

  return [
    basePosition[0] + generateStableRandom(-1, 1, hash), // Stable offset in X
    basePosition[1], // Keep the same shelf height
    basePosition[2] + generateStableRandom(-1, 1, hash * 2), // Stable offset in Z
  ];
};

const generateStableRotation = (id) => {
  const hash = hashString(id);
  return [0, generateStableRandom(0, Math.PI * 2, hash), 0];
};

const dummyData = [
  {
    id: "broccoli-1",
    type: "broccoli",
    stock: 10,
    expiry: "2025-06-10",
    depletionTime: "3 days",
    color: "green",
  },
  {
    id: "orange-2",
    type: "orange",
    stock: 15,
    expiry: "2025-04-05",
    depletionTime: "5 days",
    color: "orange",
  },
];

export const InventoryProvider = ({ children }) => {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`${BASE_URL}/api/products`, {
        headers: {
          "ngrok-skip-browser-warning": "444",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return dummyData.map((item, index) => ({
          ...item,
          position: generateStablePosition(item.id, index),
          rotation: generateStableRotation(item.id),
          scale: [2.3, 2.3, 2.3],
        }));
      }

      const fetchedItems = await response.json();

      return fetchedItems.map((item, index) => ({
        ...item,
        position: generateStablePosition(item.id, index),
        rotation: generateStableRotation(item.id),
        scale: [2.3, 2.3, 2.3],
      }));
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <InventoryContext.Provider value={{ items, isLoading }}>
      {children}
    </InventoryContext.Provider>
  );
};
