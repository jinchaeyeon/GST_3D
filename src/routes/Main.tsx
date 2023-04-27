import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTooltip,
  TooltipContext,
} from "@progress/kendo-react-charts";
import ThreeDModelLoader from "../components/ThreeDModelLoader";

const Main: React.FC = () => {
  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [5, 5, 15], fov: 50 }}
    >
      <Suspense fallback={<ThreeDModelLoader />}>
        <color attach="background" args={["#15151a"]} />

        <Machine position={[-5, -1.5, 0]} />
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
        <Car></Car>
        <Effects />
      </Suspense>
    </Canvas>
  );
};

const Car = () => {
  const { scene, nodes, materials }: any = useGLTF("/lambo.glb");
  const [active, setActive] = useState(false);
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  useMemo(() => {
    applyProps(materials.emitbrake, {
      emissiveIntensity: 30,
      toneMapped: false,
    });
    applyProps(materials.LightsFrontLed, {
      emissiveIntensity: 30,
      toneMapped: false,
    });
  }, [nodes, materials]);

  return (
    <group dispose={null}>
      <group position={[0, 3.5, 0]} rotation={[0, 0, 0]}>
        <Marker rotation={[0, 0, 0]}>
          <DataContainer>
            <table
              onClick={() => {
                setActive(!active);
              }}
            >
              <tr>
                <th>품명</th>
                <td>TEST1234</td>
              </tr>
              <tr>
                <th>수량</th>
                <td>520</td>
              </tr>
              <tr>
                <th>상태</th>
                <td>
                  <span className="run">
                    <span className="light"></span>가동
                  </span>
                </td>
              </tr>
            </table>
          </DataContainer>
        </Marker>
        {active == true ? (
          <>
            <group position={[5, 1.5, 0]} rotation={[0, 0, 0]}>
              <Marker rotation={[0, 0, 0]}>
                <DataContainer style={{ width: "180px", height: "auto" }}>
                  <Chart style={{ height: "130px" }}>
                    <ChartCategoryAxis>
                      <ChartCategoryAxisItem categories={categories} />
                    </ChartCategoryAxis>
                    <ChartSeries>
                      <ChartSeriesItem
                        type="area"
                        data={[123, 276, 310, 212, 240, 156, 98]}
                      />
                      <ChartSeriesItem
                        type="area"
                        data={[165, 210, 287, 144, 190, 167, 212]}
                      />
                      <ChartSeriesItem
                        type="area"
                        data={[56, 140, 195, 46, 123, 78, 95]}
                      />
                    </ChartSeries>
                  </Chart>
                </DataContainer>
              </Marker>
            </group>
          </>
        ) : (
          ""
        )}
      </group>
      <group>
        <primitive object={scene} scale={0.015} physicallyCorrectLights />
      </group>
    </group>
  );
};

const Lantern = () => {
  const { scene, nodes, materials }: any = useGLTF(
    "/beacon_lantern/scene.gltf"
  );

  useMemo(() => {
    applyProps(materials.emit, {
      emissiveIntensity: 10,
      toneMapped: false,
    });
  }, [nodes, materials]);
  return (
    <>
      <group position={[0, 3, 0]} rotation={[0, 0, 0]}>
        <Marker rotation={[0, 0, 0]}>
          <FaMapMarkerAlt style={{ color: "indianred" }} />
        </Marker>
      </group>
      <primitive object={scene} scale={15} physicallyCorrectLights />
    </>
  );
};
const Machine = (props: any) => {
  const { animations, scene, nodes, materials }: any = useGLTF(
    "./dna_lab_machine/scene.gltf"
  );

  // Extract animation actions
  const { ref, actions } = useAnimations(animations);

  useEffect(() => {
    if (actions["Scene"]) {
      actions["Scene"].play();
    }
  }, [actions]);

  return <primitive object={scene} scale={1} ref={ref} {...props} />;
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

export default Main;
