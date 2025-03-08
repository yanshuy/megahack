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

export const Avocado = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  itemId,
  onPointerDown,
}: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("../models/avacado.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale} onPointerDown={onPointerDown}>
      <mesh geometry={nodes.Sphere001_Avacado_0.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere003_Avacado_0.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere003_Avacado_0_1.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere003_Avacado_0_2.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere003_Avacado_0_3.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere003_Avacado_0_4.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere003_Avacado_0_5.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere002_Avacado_0.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere002_Avacado_0_1.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.Sphere002_Avacado_0_2.geometry} material={materials.Avacado} />
      <mesh geometry={nodes.pCylinder2_Material_0.geometry} material={materials.Material} />
    </group>
  );
};

useGLTF.preload("../models/avacado.glb");
