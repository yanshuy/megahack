import { OrbitControls, Stage } from "@react-three/drei";
import { Rack } from "./Rack";
import { InventoryItems } from "./InventoryItems";

export const Experience = () => {
  return (
    <>
      <Stage
        intensity={1.5}
        environment="city"
        shadows={{
          type: "accumulative",
          color: "#85ffbd",
          colorBlend: 2,
          opacity: 2,
        }}
        adjustCamera={1.3}
        // Position the stage to center on the rack
        position={[15, 5, 38]}
      >
        <Rack />
        <InventoryItems />
      </Stage>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        target={[15.285, 5.164, 38.998]}
      />
    </>
  );
};
