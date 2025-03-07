"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useInventory } from "@/context/InventoryContext"
import type * as THREE from "three"

interface BroccoliProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  itemId: string
  onPointerDown?: (e: React.PointerEvent) => void;
}

export const Broccoli = ({ position, rotation = [0, 0, 0], scale = 1, itemId, onPointerDown }: BroccoliProps) => {
  const meshRef = useRef<THREE.Group>(null)

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
      onPointerDown={onPointerDown}
      ref={meshRef}
    >
      {/* Broccoli stem */}
      <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.3, 8]} />
        <meshStandardMaterial color="#7f8c8d" roughness={0.8} />
      </mesh>

      {/* Broccoli head */}
      <group position={[0, 0.1, 0]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#27ae60" roughness={0.9} />
        </mesh>

        {/* Add some texture to the broccoli head */}
        {Array.from({ length: 20 }).map((_, i) => {
          const theta = Math.random() * Math.PI * 2
          const phi = Math.random() * Math.PI
          const r = 0.2

          const x = r * Math.sin(phi) * Math.cos(theta)
          const y = r * Math.sin(phi) * Math.sin(theta)
          const z = r * Math.cos(phi)

          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#2ecc71" roughness={0.9} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

