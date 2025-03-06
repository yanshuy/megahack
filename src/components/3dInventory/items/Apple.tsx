"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import type * as THREE from "three"

interface AppleProps {
  itemId: string
}

export const Apple = ({ itemId }: AppleProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <group>
      {/* Apple body */}
      <Sphere args={[0.3, 32, 32]} ref={meshRef}>
        <meshStandardMaterial color="#e74c3c" roughness={0.5} />
      </Sphere>

      {/* Apple stem */}
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#795548" roughness={0.8} />
      </mesh>

      {/* Apple leaf */}
      <mesh position={[0.03, 0.38, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.01, 0.05]} />
        <meshStandardMaterial color="#4caf50" roughness={0.5} />
      </mesh>
    </group>
  )
}

