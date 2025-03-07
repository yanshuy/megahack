import { Experience } from "@/components/3dInventory/Experience"
import { Canvas } from "@react-three/fiber"
import { InventoryProvider } from "@/context/InventoryContext"
import { InventoryControls } from "@/components/3dInventory/InventoryControls"

const ThreeDIMS = () => {
  return (
    <div className="relative w-full h-screen" id="threed">
      <InventoryProvider>
        <Canvas
          shadows
          camera={{
            position: [60, 9, -3],
            fov: 35,
          }}
        >
          <Experience />
        </Canvas>
      </InventoryProvider>
    </div>
  )
}

export default ThreeDIMS

