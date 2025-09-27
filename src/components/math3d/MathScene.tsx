import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

interface MathSceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  enableZoom?: boolean;
  autoRotate?: boolean;
  className?: string;
}

const Lighting = () => (
  <>
    <ambientLight intensity={0.3} />
    <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
    <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" castShadow />
  </>
);

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="#00ffff" wireframe />
  </mesh>
);

export const MathScene = ({
  children,
  cameraPosition = [5, 5, 5],
  enableZoom = true,
  autoRotate = false,
  className = '',
}: MathSceneProps) => {
  return (
    <div className={`canvas-container ${className}`}>
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={60} near={0.1} far={100} />
        <Lighting />
        <Environment preset="night" />
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        <OrbitControls enableZoom={enableZoom} enablePan={false} autoRotate={autoRotate} autoRotateSpeed={0.5} maxDistance={15} minDistance={2} />
      </Canvas>
    </div>
  );
};
