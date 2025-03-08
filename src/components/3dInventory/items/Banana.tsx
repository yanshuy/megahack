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

export const Banana = ({
  position,
  rotation = [0, 0, 0],
  scale = 0.00001,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const { nodes, materials } = useGLTF("../models/banana.glb");
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={0.01} onPointerDown={onPointerDown}>
      <group rotation={[-Math.PI / 2, 0, 0]} >
        {Object.keys(nodes).map((key) => (
          <mesh key={key} geometry={nodes[key].geometry} material={materials.material_0} />
        ))}
      </group>
    </group>
  );
};

useGLTF.preload("../models/banana.glb");
