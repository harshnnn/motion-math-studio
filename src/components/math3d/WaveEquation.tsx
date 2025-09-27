import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaveEquationProps {
  size?: number;
  amplitude?: number;
  frequency?: number;
  color?: string;
}

export const WaveEquation = ({ size = 8, amplitude = 1, frequency = 2, color = '#ff00ff' }: WaveEquationProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, pointsGeometry } = useMemo(() => {
    const segments = 80;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(segments * segments * 3);
    for (let i = 0; i < segments * segments; i++) {
      positions[i * 3] = (Math.random() - 0.5) * size;
      positions[i * 3 + 1] = (Math.random() - 0.5) * size;
      positions[i * 3 + 2] = 0;
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geometry, pointsGeometry };
  }, [size]);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const r = Math.sqrt(x * x + y * y);
        positions[i + 2] = amplitude * Math.sin(frequency * r - state.clock.elapsedTime * 3) * Math.exp(-r * 0.1);
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const r = Math.sqrt(x * x + y * y);
        positions[i + 2] = amplitude * 0.5 * Math.sin(frequency * r - state.clock.elapsedTime * 2 + Math.PI) * Math.exp(-r * 0.15);
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial color={color} transparent opacity={0.6} wireframe emissive={color} emissiveIntensity={0.1} />
      </mesh>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial color={color} size={0.02} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
};
