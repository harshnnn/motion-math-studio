import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParametricSurfaceProps {
  color?: string;
  opacity?: number;
  wireframe?: boolean;
}

export const ParametricSurface = ({ color = '#00ffff', opacity = 0.8, wireframe = false }: ParametricSurfaceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const segments = 50;
    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const u = (i / segments) * Math.PI * 2;
        const v = (j / segments) * Math.PI * 2;
        const x = Math.cos(u) * (3 + Math.cos(v));
        const y = Math.sin(u) * (3 + Math.cos(v));
        const z = Math.sin(v) + Math.sin(u * 3) * 0.3;
        vertices.push(x, y, z);
        const nx = Math.cos(u) * Math.cos(v);
        const ny = Math.sin(u) * Math.cos(v);
        const nz = Math.sin(v);
        normals.push(nx, ny, nz);
        uvs.push(i / segments, j / segments);
      }
    }
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j;
        const b = i * (segments + 1) + (j + 1);
        const c = (i + 1) * (segments + 1) + (j + 1);
        const d = (i + 1) * (segments + 1) + j;
        indices.push(a, b, d, b, c, d);
      }
    }
    g.setIndex(indices);
    g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    return g;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color={color} transparent opacity={opacity} wireframe={wireframe} emissive={color} emissiveIntensity={0.2} roughness={0.1} metalness={0.8} />
    </mesh>
  );
};
