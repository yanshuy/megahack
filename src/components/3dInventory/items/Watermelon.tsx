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

export const Watermelon = ({
  position,
  rotation = [1.519, -0.421, 0.132],
  scale = 2.842,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("../models/watermelon.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} position={position} rotation={[-90, 90, 0]} scale={0.008} onPointerDown={onPointerDown}>
      <mesh geometry={nodes.Sphere001_Material003_0.geometry} material={materials["Material.003"]} />
    </group>
  );
};

useGLTF.preload("../models/watermelon.glb");
