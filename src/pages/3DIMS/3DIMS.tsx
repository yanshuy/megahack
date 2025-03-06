import { Experience } from "@/components/3dInventory/Experience"
import { Canvas } from "@react-three/fiber"
import { InventoryControls } from "@/components/3dInventory/InventoryControls"
import { InventoryProvider } from "@/context/InventoryContext"

const ThreeDIMS = () => {
  return (
    <div className="relative w-full h-screen">
      <InventoryProvider>
        <Canvas
          shadows
          camera={{
            position: [25, 10, 45],
            fov: 35,
          }}
        >
          <Experience />
        </Canvas>
        <InventoryControls />
      </InventoryProvider>
    </div>
  )
}

export default ThreeDIMS

