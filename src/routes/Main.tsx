import React, { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useGLTF, Stats } from "@react-three/drei";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";

const Main: React.FC = () => {
  return (
    <Canvas shadows camera={{ position: [3, 2, -3] }}>
      <ambientLight intensity={0.7} />
      <spotLight intensity={0.7} position={[1000, 1000, 1000]} />
      <directionalLight intensity={0.7} position={[0, 0, 5]} />
      <OrbitControls autoRotate />
      <Suspense fallback={null}>
        {/* <Model /> */}
        <Model2 />
        {/* <Model3 /> */}
      </Suspense>
    </Canvas>
  );
};

const Model = () => {
  //const gltf = useLoader(GLTFLoader, "./house/scene.gltf");
  // const gltf = useLoader(GLTFLoader, "./shiba/scene.gltf");
  const gltf = useLoader(GLTFLoader, "./dna_lab_machine/scene.gltf");

  // return <primitive object={gltf.scene} scale={0.008} />;
  return <primitive object={gltf.scene} scale={1} physicallyCorrectLights />;
};
const Model2 = () => {
  //const gltf = useLoader(GLTFLoader, "./house/scene.gltf");
  const gltf = useLoader(GLTFLoader, "./shiba/scene.gltf");

  // return <primitive object={gltf.scene} scale={0.008} />;
  return <primitive object={gltf.scene} scale={1} physicallyCorrectLights />;
};
const Model3 = () => {
  const gltf = useLoader(GLTFLoader, "./wooden_bridge_pack/scene.gltf");

  // return <primitive object={gltf.scene} scale={0.008} />;
  return <primitive object={gltf.scene} scale={1} physicallyCorrectLights />;
};

export default Main;
