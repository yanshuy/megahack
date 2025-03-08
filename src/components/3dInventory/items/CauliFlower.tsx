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

export const Cauliflower = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("../models/CauliFlower.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} position={[position[0], position[1] -0.5, position[2]]} rotation={rotation} scale={10} onPointerDown={onPointerDown}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.cauliflower_u1_v1} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.cauliflower_u1_v1} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.cauliflower_u1_v1} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.cauliflower_u1_v1} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.cauliflower_u1_v1} />
      </group>
    </group>
  );
};

useGLTF.preload("../models/CauliFlower.glb");
