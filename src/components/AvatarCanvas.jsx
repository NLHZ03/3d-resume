import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Float, Environment } from "@react-three/drei";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import * as THREE from "three";

// 注册 MeshoptDecoder
function gltfSetup(loader) {
  loader.setMeshoptDecoder(MeshoptDecoder);
}

// 各章节的相机预设位置 + 目标焦点
const SECTION_CAMERAS = {
  about: { position: [0, 1.5, 4], target: [0, 1, 0] },
  skills: { position: [3, 1.5, 3], target: [0, 1, 0] },
  projects: { position: [-3, 1.8, 3], target: [0, 1.1, 0] },
  contact: { position: [0, 1.2, 2.5], target: [0, 1, 0] },
};

// 加载并渲染 avatar 模型,带缓慢自转
function AvatarModel({ autoRotateRef }) {
  const groupRef = useRef();
  const { scene } = useGLTF("/models/avatar.glb", true, false, gltfSetup);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (autoRotateRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
        <primitive object={scene} />
      </Float>
    </group>
  );
}

// 相机控制器:进场动画 + 章节切换平滑过渡
function CameraRig({ activeSection, controlsRef, autoRotateRef }) {
  const { camera } = useThree();
  const phase = useRef("intro"); // "intro" → "ready"
  const startTime = useRef(null);
  const tmpTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    // 进场起始:远处高位
    camera.position.set(0, 3, 12);
  }, [camera]);

  useFrame(() => {
    const controls = controlsRef.current;
    const preset = SECTION_CAMERAS[activeSection] || SECTION_CAMERAS.about;

    if (phase.current === "intro") {
      if (startTime.current === null) startTime.current = performance.now();
      const elapsed = (performance.now() - startTime.current) / 1000;
      const t = Math.min(elapsed / 2.5, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic

      camera.position.x += (preset.position[0] - camera.position.x) * eased * 0.08;
      camera.position.y += (preset.position[1] - camera.position.y) * eased * 0.08;
      camera.position.z += (preset.position[2] - camera.position.z) * eased * 0.08;

      if (controls) controls.target.lerp(tmpTarget.current.set(...preset.target), 0.1);

      if (t >= 1) {
        phase.current = "ready";
        autoRotateRef.current = true;
      }
    } else {
      // ready 阶段:用户未交互时,相机平滑跟随章节预设
      if (autoRotateRef.current) {
        camera.position.x += (preset.position[0] - camera.position.x) * 0.04;
        camera.position.y += (preset.position[1] - camera.position.y) * 0.04;
        camera.position.z += (preset.position[2] - camera.position.z) * 0.04;
        if (controls) controls.target.lerp(tmpTarget.current.set(...preset.target), 0.04);
      }
    }

    if (controls) {
      controls.update();
    }
  });

  return null;
}

// 加载提示
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 select-none">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-600 border-t-neutral-300" />
        <span className="text-sm tracking-wide text-neutral-300">Loading...</span>
      </div>
    </Html>
  );
}

export default function AvatarCanvas({ activeSection }) {
  const autoRotateRef = useRef(true);
  const controlsRef = useRef();

  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 35 }} dpr={[1, 2]} shadows>
      <color attach="background" args={["#0a0a0a"]} />

      {/* 环境贴图:给 PBR 材质提供真实反射,质感显著提升 */}
      <Environment preset="studio" />

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
        <AvatarModel autoRotateRef={autoRotateRef} />
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
          autoRotateRef.current = false; // 交互时暂停自转和相机过渡
        }}
        onEnd={() => {
          // 松手后延迟恢复
          setTimeout(() => {
            autoRotateRef.current = true;
          }, 1500);
        }}
      />
    </Canvas>
  );
}
