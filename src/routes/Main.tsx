import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FaMapMarkerAlt } from "react-icons/fa";
import * as THREE from "three";

const Main: React.FC = () => {
  return (
    <Canvas shadows camera={{ position: [3, 2, -3] }}>
      <ambientLight intensity={0.7} />
      <spotLight intensity={0.7} position={[1000, 1000, 1000]} />
      <directionalLight intensity={0.7} position={[0, 0, 5]} />
      <OrbitControls />
      {/* autoRotate */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
};

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./dna_lab_machine/scene.gltf");

  const { animations } = useGLTF("./dna_lab_machine/scene.gltf");
  // Extract animation actions
  const { ref, actions } = useAnimations(animations);

  useEffect(() => {
    if (actions["Scene"]) {
      actions["Scene"].play();
    }
  }, [actions]);

  return (
    <>
      <group position={[0, 3, 0]} rotation={[0, 0, 0]}>
        <Marker rotation={[0, 0, 0]}>
          <div
            style={{
              position: "absolute",
              fontSize: 10,
              letterSpacing: -0.5,
              left: 17.5,
            }}
          >
            test
          </div>
          <FaMapMarkerAlt style={{ color: "indianred" }} />
        </Marker>
      </group>
      <primitive
        ref={ref}
        object={gltf.scene}
        scale={1}
        physicallyCorrectLights
      />
    </>
  );
};

function Marker({ children, ...props }: any) {
  const ref = useRef<any>();
  // This holds the local occluded state
  const [isOccluded, setOccluded] = useState();
  const [isInRange, setInRange] = useState<any>();
  const isVisible = isInRange && !isOccluded;
  // Test distance
  const vec = new THREE.Vector3();
  useFrame((state) => {
    if (ref.current != undefined) {
      const range =
        state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <=
        10;
      if (range !== isInRange) setInRange(range);
    }
  });
  return (
    <group>
      <Html
        transform
        occlude
        onOcclude={setOccluded}
        style={{
          transition: "all 0.2s",
        }}
        {...props}
      >
        {children}
      </Html>
    </group>
  );
}
export default Main;
