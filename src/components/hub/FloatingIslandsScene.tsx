import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Island from "./Island";

/**
 * Camera rig: slow orbit + mouse parallax.
 * Reads pointer from R3F state and lerps the camera toward an offset.
 */
function CameraRig() {
  const targetRef = useRef(new THREE.Vector3());

  useFrame(({ camera, pointer, clock }) => {
    // Slow base orbit
    const t = clock.elapsedTime * 0.1;
    const baseX = Math.sin(t) * 0.6;
    const baseZ = 8 + Math.cos(t) * 0.3;

    // Mouse parallax offset
    targetRef.current.set(
      baseX + pointer.x * 1.2,
      pointer.y * 0.6 + 1,
      baseZ,
    );
    camera.position.lerp(targetRef.current, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function FloatingIslandsScene() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 1, 8], fov: 55 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#07070d");
      }}
    >
      <Suspense fallback={null}>
        {/* Atmospheric fog for depth */}
        <fog attach="fog" args={["#07070d", 6, 22]} />

        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight
          position={[-5, 5, 3]}
          intensity={1.2}
          color="#a78bfa"
        />
        <directionalLight
          position={[5, -2, 2]}
          intensity={0.6}
          color="#22d3ee"
        />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#f0abfc" />

        {/* Island arrangement */}
        <Island position={[-3, -0.5, -1]} scale={1.4} color="#2a2540" floatOffset={0} />
        <Island position={[2.5, 0.3, -2]} scale={1.1} color="#1f1a35" floatOffset={1.5} />
        <Island position={[0, -1.2, 1]} scale={1.6} color="#252040" floatOffset={3} />
        <Island position={[-1.8, 1.5, -3]} scale={0.7} color="#1a1530" floatOffset={2} />
        <Island position={[3.5, -0.8, 0]} scale={0.8} color="#221c38" floatOffset={4.5} />
        <Island position={[-3.5, 1.8, 1]} scale={0.5} color="#1c1730" floatOffset={5} />

        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
