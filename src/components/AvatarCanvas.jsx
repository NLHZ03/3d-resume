import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Float, Environment, useProgress, Lightformer } from "@react-three/drei";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import * as THREE from "three";

// Register MeshoptDecoder
function gltfSetup(loader) {
  loader.setMeshoptDecoder(MeshoptDecoder);
}

// Camera presets per section: model stays centered (shared target),
// camera orbits closer to make the model dominate the frame
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const MODEL_CENTER = [0, 1, 0];
const SECTION_CAMERAS = {
  about: {
    position: isMobile ? [0, 1.5, 5] : [0, 1.5, 3.5],
    target: MODEL_CENTER,
  },
  skills: {
    position: isMobile ? [3, 1.5, 4.5] : [2.8, 1.5, 2.8],
    target: MODEL_CENTER,
  },
  reel: {
    position: isMobile ? [3.5, 1.8, 4.5] : [4, 1.8, 3],
    target: MODEL_CENTER,
  },
  projects: {
    position: isMobile ? [-3, 1.8, 4.5] : [-2.8, 1.8, 2.8],
    target: MODEL_CENTER,
  },
  contact: {
    position: isMobile ? [0, 1.2, 3.5] : [0, 1.2, 2.4],
    target: MODEL_CENTER,
  },
};

// Load and render the avatar model with mouse-follow behavior
function AvatarModel() {
  const groupRef = useRef();
  const { scene } = useGLTF("/models/avatar.glb", true, false, gltfSetup);
  const { pointer } = useThree();
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;
    // Mouse follow: pointer (-1~1) maps to rotation (±1.2 rad Y, ±0.5 rad X)
    targetRotY.current = pointer.x * 1.2;
    targetRotX.current = -pointer.y * 0.5;

    // Smooth interpolation, returns to center on release
    groupRef.current.rotation.y +=
      (targetRotY.current - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x +=
      (targetRotX.current - groupRef.current.rotation.x) * 0.08;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.2}>
        <primitive object={scene} />
      </Float>
    </group>
  );
}

// Camera rig: intro animation + smooth section transitions
function CameraRig({ activeSection, controlsRef, autoRotateRef }) {
  const { camera } = useThree();
  const phase = useRef("intro");
  const startTime = useRef(null);
  const tmpTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    camera.position.set(0, 3, 12);
  }, [camera]);

  useFrame(() => {
    const controls = controlsRef.current;
    const preset = SECTION_CAMERAS[activeSection] || SECTION_CAMERAS.about;

    if (phase.current === "intro") {
      if (startTime.current === null) startTime.current = performance.now();
      const elapsed = (performance.now() - startTime.current) / 1000;
      const t = Math.min(elapsed / 2.5, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      camera.position.x += (preset.position[0] - camera.position.x) * eased * 0.08;
      camera.position.y += (preset.position[1] - camera.position.y) * eased * 0.08;
      camera.position.z += (preset.position[2] - camera.position.z) * eased * 0.08;

      if (controls)
        controls.target.lerp(tmpTarget.current.set(...preset.target), 0.1);

      if (t >= 1) {
        phase.current = "ready";
        autoRotateRef.current = true;
      }
    } else {
      // ready: camera smoothly follows section preset when user is idle
      if (autoRotateRef.current) {
        camera.position.x += (preset.position[0] - camera.position.x) * 0.04;
        camera.position.y += (preset.position[1] - camera.position.y) * 0.04;
        camera.position.z += (preset.position[2] - camera.position.z) * 0.04;
        if (controls)
          controls.target.lerp(tmpTarget.current.set(...preset.target), 0.04);
      }
    }

    if (controls) controls.update();
  });

  return null;
}

// Loading fallback: real percentage progress bar
function LoadingFallback() {
  const { progress } = useProgress();
  const pct = Math.round(progress);
  return (
    <Html center>
      <div className="flex w-48 flex-col items-center gap-3 select-none">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-600 border-t-neutral-300" />
        <span className="text-xs tracking-wide text-neutral-300">
          Loading 3D Avatar · {pct}%
        </span>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-violet-400 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

export default function AvatarCanvas({ activeSection }) {
  const autoRotateRef = useRef(true);
  const controlsRef = useRef();

  return (
    <Canvas camera={{ position: [0, 1.5, 3.5], fov: 30 }} dpr={[1, 2]} shadows gl={{ alpha: true }}>
      {/* Environment map: locally generated (no CDN dependency) for PBR reflections.
          Canvas is transparent (alpha) so the CSS atmosphere layer behind shows through. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2} position={[0, 4, 0]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.5} position={[4, 2, 4]} scale={[3, 3, 1]} />
        <Lightformer intensity={1} position={[-4, 2, -4]} scale={[3, 3, 1]} />
      </Environment>

      <ambientLight intensity={1.2} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 3, -5]} intensity={1} />

      <Suspense fallback={<LoadingFallback />}>
        <AvatarModel />
      </Suspense>

      <CameraRig
        activeSection={activeSection}
        controlsRef={controlsRef}
        autoRotateRef={autoRotateRef}
      />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={1.5}
        maxDistance={8}
        onStart={() => {
          autoRotateRef.current = false;
        }}
        onEnd={() => {
          setTimeout(() => {
            autoRotateRef.current = true;
          }, 1500);
        }}
      />
    </Canvas>
  );
}
