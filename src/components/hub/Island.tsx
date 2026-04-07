import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface IslandProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  floatSpeed?: number;
  floatOffset?: number;
}

/**
 * A single low-poly floating island.
 * Uses an icosahedron with vertex displacement for stylized terrain.
 */
export default function Island({
  position,
  scale = 1,
  color = "#2a2540",
  floatSpeed = 0.5,
  floatOffset = 0,
}: IslandProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Build a displaced icosahedron geometry once
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Pseudo-random displacement based on position (deterministic)
      const noise =
        Math.sin(x * 4.1) * Math.cos(y * 3.7) * Math.sin(z * 2.9) * 0.2;
      // Flatten the bottom half (so it looks like an island, not a sphere)
      const flatten = y < 0 ? y * 0.6 : 0;
      pos.setXYZ(
        i,
        x + noise * x,
        y + noise + flatten,
        z + noise * z,
      );
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Slow floating animation
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime * floatSpeed + floatOffset;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.15;
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        flatShading
        roughness={0.7}
        metalness={0.2}
      />
    </mesh>
  );
}
