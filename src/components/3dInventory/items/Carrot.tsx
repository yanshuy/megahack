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

export const Carrot = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("../models/carrot.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={group} position={[position[0] , position[1], position[2] + 0.5]} rotation={rotation} scale={0.005} onPointerDown={onPointerDown}>
      <group position={[305.827, 0, -24.307]}>
        <mesh geometry={nodes.body_body_0.geometry} material={materials.body} />
        <mesh geometry={nodes.body_body1_0.geometry} material={materials.body1} />
        <mesh geometry={nodes.body_leaf_0.geometry} material={materials.leaf} />
      </group>
      <mesh geometry={nodes.leaf_1_leaf_0.geometry} material={materials.leaf} position={[85.554, 35.908, 17.077]} />
      <mesh geometry={nodes.leaf_2_leaf_0.geometry} material={materials.leaf} position={[31.419, 80.792, -25.479]} />
      <mesh geometry={nodes.leaf_3_leaf_0.geometry} material={materials.leaf} position={[90.995, 36.78, -83.716]} />
      <mesh geometry={nodes.leaf_4_leaf_0.geometry} material={materials.leaf} position={[28.523, -6.755, -25.479]} />
      <mesh geometry={nodes.leaf_5_leaf_0.geometry} material={materials.leaf} position={[54.044, 55.545, -19.355]} />
      <mesh geometry={nodes.leaf_6_leaf_0.geometry} material={materials.leaf} position={[65.983, 6.066, -32.552]} />
      <mesh geometry={nodes.leaf_7_leaf_0.geometry} material={materials.leaf} position={[65.517, 41.251, -60.308]} />
    </group>
  );
};

useGLTF.preload("../models/carrot.glb");
