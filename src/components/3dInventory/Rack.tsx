import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"

export function Rack(props) {
  const { nodes, materials } = useGLTF("../models/scene.gltf")
  return (
    <group {...props} dispose={null}>
      <group position={[15.285, 5.164, 38.998]} rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, -5.164]} scale={1.484}>
          <mesh
            castShadow
            geometry={(nodes.Storage_Rack_Solid_Glass_0 as THREE.Mesh).geometry}
            material={materials.Solid_Glass}
            position={[0.946, 3.908, 0]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("../models/scene.gltf")

