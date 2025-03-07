"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useInventory } from "@/context/InventoryContext";
import { Sphere } from "@react-three/drei";
import type * as THREE from "three";

interface OrangeProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  itemId: string;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export const Orange = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  itemId,
  onPointerDown,
}: OrangeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Optional: Add subtle animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group
      position={position}
      rotation={rotation as [number, number, number]}
      scale={scale}
      onPointerDown={onPointerDown}
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
  );
};
