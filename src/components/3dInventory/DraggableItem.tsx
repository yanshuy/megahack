import type React from "react"
import { useThree } from "@react-three/fiber"
import { useDrag } from '@use-gesture/react'
import { Apple } from "./items/Apple"
import { Banana } from "./items/Banana"
import { Orange } from "./items/Orange"
import { Carrot } from "./items/Carrot"
import { Broccoli } from "./items/Brocolli"
import { useInventory } from "@/context/InventoryContext"

interface DraggableItemProps {
  id: string
  type: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}


export const DraggableItem: React.FC<DraggableItemProps> = ({ id, type, position, rotation, scale }) => {
  const { updateItemPosition, removeItem } = useInventory()
  const { camera, scene } = useThree()

  const bind = useDrag(({ active, movement: [x, y], event }) => {
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0))
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    
    if (event) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
    }

    if (active) {
      const newPosition: [number, number, number] = [
        position[0] + x / 50,
        position[1],
        position[2] + y / 50
      ]
      updateItemPosition(id, newPosition)
    }

    // Handle double-click to remove item
    if (event?.type === "dblclick") {
      removeItem(id)
    }
  }, {
    pointer: { touch: true },
    transform: ([x, y]) => [x / window.innerWidth * 2, -y / window.innerHeight * 2]
  })

  const ItemComponent = (() => {
    switch (type) {
      case "apple":
        return Apple
      case "banana":
        return Banana
      case "orange":
        return Orange
      case "carrot":
        return Carrot
      case "broccoli":
        return Broccoli
      default:
        return null
    }
  })()

  if (!ItemComponent) return null

  return (
    <group {...bind()} position={position} rotation={rotation} scale={scale}>
      <ItemComponent itemId={id} />
    </group>
  )
}