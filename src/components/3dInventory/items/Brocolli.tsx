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

export const Broccoli = ({
  position,
  rotation = [180, 180, 20],
  scale = 1,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("../models/broccoli.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} position={[position[0], position[1] - 0.5, position[2]]} rotation={[160, 0, 0]} scale={0.05} onPointerDown={onPointerDown}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.capusta_low_Material_u1_v1} />
      <mesh geometry={nodes.Object_3.geometry} material={materials.capusta_low_Material_u1_v1} />
    </group>
  );
};

useGLTF.preload("../models/broccoli.glb");
