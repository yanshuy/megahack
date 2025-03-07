import type React from "react"
import { useRef } from "react"
import { useThree } from "@react-three/fiber"
import { useDrag } from "@use-gesture/react"
import { useInventory } from "../../context/InventoryContext"
import { Apple } from "./items/Apple"
import { Banana } from "./items/Banana"
import { Orange } from "./items/Orange"
import { Carrot } from "./items/Carrot"
import { Broccoli } from "./items/Brocolli"
import * as THREE from "three"

interface DraggableItemProps {
  id: string
  type: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, type, position, rotation, scale }) => {
  const { updateItemPosition, removeItem } = useInventory()
  const groupRef = useRef<THREE.Group>(null)
  const { camera, scene } = useThree()
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0))
  const intersection = new THREE.Vector3()

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (!groupRef.current) return

      const raycaster = new THREE.Raycaster()
      const pointer = new THREE.Vector2()
      
      if (event instanceof PointerEvent) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(pointer, camera)
        
        // Find intersection point with the plane
        raycaster.ray.intersectPlane(plane, intersection)
        
        const newPosition: [number, number, number] = [
          intersection.x,
          position[1], // Keep the original y position
          intersection.z
        ]
        
        updateItemPosition(id, newPosition)
      }
    },
    {
      pointer: { touch: true },
      preventScroll: true,
      filterTaps: true,
    }
  )

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
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      {...bind()}
      onDoubleClick={(e) => {
        e.stopPropagation()
        removeItem(id)
      }}
    >
      <ItemComponent itemId={id} />
    </group>
  )
}