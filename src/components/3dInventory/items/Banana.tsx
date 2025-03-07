"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useInventory } from "@/context/InventoryContext";
import type * as THREE from "three";

interface BananaProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  itemId: string;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export const Banana = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  itemId,
  onPointerDown,
}: BananaProps) => {
  const meshRef = useRef<THREE.Group>(null);

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
      ref={meshRef}
    >
      {/* Create a curved banana shape using a curved cylinder */}
      <mesh>
        <torusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#f1c40f" roughness={0.5} />
      </mesh>

      {/* Add a second torus for the complete banana shape */}
      <mesh rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#f1c40f" roughness={0.5} />
      </mesh>
    </group>
  );
};
