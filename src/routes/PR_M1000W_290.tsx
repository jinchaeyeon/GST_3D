import React, { useEffect, useMemo, useRef, useState } from "react";
import { applyProps, Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  Html,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { FaMapMarkerAlt } from "react-icons/fa";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { DataContainer } from "../CommonStyled";

const PR_M1000W_290: React.FC = () => {
  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [5, 5, 15], fov: 50 }}
    >
      <color attach="background" args={["#15151a"]} />

      <FacilityProcess position={[-5, -1.5, 0]} />
      <hemisphereLight intensity={0.5} />
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[0, -1.16, 0]}
        scale={15}
        blur={0.5}
        opacity={1}
        far={20}
      />

      <OrbitControls />
      <Environment resolution={512}>
        {/* Ceiling */}
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 9]}
          scale={[10, 1, 1]}
        />
        {/* Sides */}
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-50, 2, 0]}
          scale={[100, 2, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[50, 2, 0]}
          scale={[100, 2, 1]}
        />
        {/* Key */}
        <Lightformer
          form="ring"
          color="red"
          intensity={10}
          scale={2}
          position={[10, 5, 10]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>
      {/* <Car></Car> */}
      <Effects />
    </Canvas>
  );
};

const FacilityProcess = (props: any) => {
  const { animations, scene, nodes, materials }: any = useGLTF(
    "./전체공정도작업/전체공정작업_재질정리-애니작업-2(Bake).gltf"
  );

  // Extract animation actions
  const { ref, actions } = useAnimations(animations);

  useEffect(() => {
    if (actions["Animation"]) {
      actions["Animation"].play();
    }
  }, [actions]);

  return (
    <primitive object={scene} scale={[0.01, 0.01, 0.01]} ref={ref} {...props} />
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

export function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.2}
        mipmapBlur
        luminanceSmoothing={0}
        intensity={0.2}
      />
    </EffectComposer>
  );
}

export default PR_M1000W_290;
