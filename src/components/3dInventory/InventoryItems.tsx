import { useInventory } from "@/context/InventoryContext";
import { useState } from "react";
import { Apple } from "./items/Apple";
import { Banana } from "./items/Banana";
import { Orange } from "./items/Orange";
import { Carrot } from "./items/Carrot";
import { Broccoli } from "./items/Brocolli";
import { Avocado } from "./items/Avacado";
import { Html } from "@react-three/drei";
import { X } from "lucide-react";
import { WheatSeeds } from "./items/Wheat_seeds";
import { Watermelon } from "./items/Watermelon";
import { Potato } from "./items/Potato";
import { Cauliflower } from "./items/CauliFLower";

interface InventoryItem {
  id: string;
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  stock: number;
  expiry: string;
  depletionTime: string;
  color: string;
}

// Map item types to components
const itemComponents: Record<InventoryItem["name"], React.FC<any>> = {
  apple: Apple,
  banana: Banana,
  orange: Orange,
  carrot: Carrot,
  broccoli: Broccoli,
  // avocado: Avocado,
  watermelon: Watermelon,
  // "wheat seeds": WheatSeeds,
  potato: Potato,
  cauliflower: Cauliflower,
};

export const InventoryItems = () => {
  const { items } = useInventory() as unknown as { items: InventoryItem[] }; // Ensure proper typing
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  return (
    <group>
      {items.map((item) => {
        const ItemComponent = itemComponents[item.name.trim().toLowerCase()];
        console.log(ItemComponent);

        if (!ItemComponent) return null; // Ensure the component exists

        return (
          <group key={item.id}>
            <ItemComponent
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
              onPointerDown={(e) => {
                e.stopPropagation();
                console.log("Clicked on:", item);
                setSelectedItem(item);
              }}
            />

            {/* Info Box */}
            {selectedItem?.id === item.id && (
              <Html
                position={[
                  item.position[0],
                  item.position[1] + 1, // Adjusted height to make it float above
                  item.position[2],
                ]}
                center
              >
                <div className="absolute top-1/2 left-1/2 min-w-42 -translate-x-1/2 -translate-y-full transform rounded-lg bg-black/50 p-5 text-white shadow-lg">
                  <h3 className={`text-${item.color}-500 font-semibold`}>
                    {item.name.toUpperCase()}
                  </h3>
                  <p className="mt-1 text-xs">Stock: {item.stock}</p>
                  <p className="text-xs">Expiry: {item.expiry}</p>
                  <p className="text-xs">
                    Depletion: {item.depletionTime} days
                  </p>
                  <X
                    className="absolute top-2 right-2 h-5 w-5"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};
