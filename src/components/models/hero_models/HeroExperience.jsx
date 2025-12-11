import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

const RotatingRoom = ({ isMobile }) => {
  const roomRef = useRef();

  useFrame((state, delta) => {
    // Add subtle automatic rotation
    roomRef.current.rotation.x += delta * 0.15;
    roomRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group
      ref={roomRef}
      scale={isMobile ? 0.8 : 1.2}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <Room />
    </group>
  );
};

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 35 }}>
      {/* deep blue ambient */}
      <ambientLight intensity={0.2} color="#1a1a40" />
      {/* Configure OrbitControls with free movement */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxDistance={15}
        minDistance={4}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <RotatingRoom isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
