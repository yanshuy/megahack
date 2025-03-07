"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useInventory } from "@/context/InventoryContext";
import type * as THREE from "three";

interface CarrotProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  itemId: string;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export const Carrot = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  itemId,
  onPointerDown,
}: CarrotProps) => {
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
      {/* Carrot body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.15, 0.6, 16]} />
        <meshStandardMaterial color="#e67e22" roughness={0.7} />
      </mesh>

      {/* Carrot greens */}
      <group position={[0, 0.3, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i * Math.PI) / 2.5) * 0.05,
              0.1 + Math.random() * 0.1,
              Math.cos((i * Math.PI) / 2.5) * 0.05,
            ]}
            rotation={[
              Math.random() * 0.2,
              Math.random() * Math.PI * 2,
              Math.random() * 0.2,
            ]}
          >
            <boxGeometry args={[0.02, 0.2, 0.01]} />
            <meshStandardMaterial color="#27ae60" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
