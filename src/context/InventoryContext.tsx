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
    [15.285, 7.5, 43], // Left
    [15.285, 7.5, 38.998], // Middle
    [15.285, 7.5, 35], // Right
  ],
];

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const generateStablePosition = (id, index) => {
  const shelfIndex = Math.floor(index / 3) % shelfGridPositions.length;
  const columnIndex = index % 3;
  
  const basePosition = shelfGridPositions[shelfIndex][columnIndex];
  if (!basePosition) return [0, 0, 0];
  
  return [
    basePosition[0],
    basePosition[1],
    basePosition[2]
  ];
};

const generateStableRotation = (id) => {
  const hash = hashString(id);
  return [0, (hash % 360) * (Math.PI / 180), 0];
};

const dummyData = [
  {
    id: "broccoli-1",
    name: "broccoli",
    stock: 10,
    expiry: "2025-06-10",
    depletionTime: "3 days",
    color: "green",
  },
  {
    id: "orange-2",
    name: "orange",
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
