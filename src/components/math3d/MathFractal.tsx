import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MathFractalProps {
  iterations?: number;
  color?: string;
  scale?: number;
}

export const MathFractal = ({ iterations = 5, color = '#00ff00', scale = 1 }: MathFractalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const cubes = useMemo(() => {
    const cubes: Array<{ position: [number, number, number]; scale: number; delay: number }> = [];
    function generate(center: [number, number, number], size: number, level: number) {
      if (level <= 0) return;
      const positions: Array<[number, number, number]> = [
        [center[0], center[1] + size, center[2]],
        [center[0] - size, center[1] - size, center[2] - size],
        [center[0] + size, center[1] - size, center[2] - size],
        [center[0], center[1] - size, center[2] + size],
      ];
      positions.forEach((pos, idx) => {
        cubes.push({ position: pos, scale: size * 0.3, delay: (iterations - level) * 0.5 + idx * 0.1 });
        generate(pos, size * 0.5, level - 1);
      });
    }
    generate([0, 0, 0], scale, iterations);
    return cubes;
  }, [iterations, scale]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.01;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    groupRef.current.children.forEach((child, i) => {
      const cube = child as THREE.Mesh;
      const data = cubes[i];
      if (!data) return;
      const t = state.clock.elapsedTime - data.delay;
      const s = data.scale * (0.5 + 0.5 * Math.sin(t * 2));
      cube.scale.setScalar(Math.max(0.1, s));
      cube.position.y = data.position[1] + Math.sin(t * 1.5) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.position}>
          <boxGeometry args={[c.scale, c.scale, c.scale]} />
          <meshStandardMaterial color={color} transparent opacity={0.7} emissive={color} emissiveIntensity={0.2} roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
};
