"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import type * as THREE from "three"
import { useInventory } from "@/context/InventoryContext"

interface OrangeProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  itemId: string
}

export const Orange = ({ position, rotation = [0, 0, 0], scale = 1, itemId }: OrangeProps) => {
  const { removeItem } = useInventory()
  const meshRef = useRef<THREE.Mesh>(null)

  // Optional: Add subtle animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <group
      position={position}
      rotation={rotation as [number, number, number]}
      scale={scale}
      onClick={() => removeItem(itemId)}
    >
      <Sphere args={[0.3, 32, 32]} ref={meshRef}>
        <meshStandardMaterial color="#f39c12" roughness={0.7} />
      </Sphere>

      {/* Orange stem/leaf */}
      <mesh position={[0, 0.32, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 8]} />
        <meshStandardMaterial color="#795548" roughness={0.8} />
      </mesh>
    </group>
  )
}

