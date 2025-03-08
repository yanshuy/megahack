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

export const WheatSeeds = ({
  position,
  rotation = [-Math.PI / 2, 0, 0],
  scale = 1,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("../models/wheat_seeds.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale} onPointerDown={onPointerDown}>
      {Array.from({ length: 33 }, (_, i) => {
        const objectName = `Object_${i + 2}`;
        return (
          <mesh key={i} geometry={nodes[objectName].geometry} material={materials.Standardmaterial} />
        );
      })}
    </group>
  );
};

useGLTF.preload("../models/wheat_seeds.glb");
