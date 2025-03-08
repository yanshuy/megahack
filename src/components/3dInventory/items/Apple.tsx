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

export const Apple = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("../models/apple.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} position={[position[0], position[1] - 0.5, position[2]]} rotation={rotation} scale={0.0005} onPointerDown={onPointerDown}>
      <mesh
        geometry={nodes.apple_apple_u1_v1_0.geometry}
        material={materials.apple_u1_v1}
        scale={100}
      />
    </group>
  );
};

useGLTF.preload("../models/apple.glb");
