import { useInventory } from "@/context/InventoryContext"
import { DraggableItem } from "./DraggableItem"

export const InventoryItems = () => {
  const { items } = useInventory()

  return (
    <group>
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          type={item.type}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
        />
      ))}
    </group>
  )
}

