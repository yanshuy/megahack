"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type * as THREE from "three";

interface ModelProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  itemId: string;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export const Orange = ({
  position,
  rotation = [0, 0, 0],
  scale = 3,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const { nodes, materials } = useGLTF("../models/orange.glb");
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={12} onPointerDown={onPointerDown}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Orange_Orange_Baked_0.geometry} material={materials.Orange_Baked} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
    </group>
  );
};

useGLTF.preload("../models/orange.glb");
