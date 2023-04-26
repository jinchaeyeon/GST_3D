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
import { Button } from "@progress/kendo-react-buttons";
import { useSetRecoilState } from "recoil";
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

const PR_M1000W_290: React.FC = () => {
  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [5, 5, 15], fov: 50 }}
    >
      <color attach="background" args={["#15151a"]} />

      <FacilityProcess position={[-5, -1.5, 0]} scale={[0.01, 0.01, 0.01]} />
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
    "./facility_process/secene.gltf"
  );
  // Extract animation actions
  const { ref, actions } = useAnimations(animations);
  const [isAnimated, setIsAnimated] = useState(true);
  const [active, setActive] = useState(false);
  const [detail, setDetail] = useState(0);
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  useEffect(() => {
    if (actions["Animation"]) {
      if (isAnimated) {
        actions["Animation"].play();
      } else {
        actions["Animation"].stop();
      }
    }
  }, [actions, isAnimated]);
  console.log(detail);
  return (
    <group dispose={null}>
      <primitive
        object={scene}
        ref={ref}
        onClick={(e: any) => {
          console.log(e);
          console.log(e.eventObject);

          setIsAnimated((prev) => !prev);
          if (!active == false) {
            setDetail(0);
          }
          setActive(!active);
        }}
        {...props}
      />
      {active == true ? (
        <>
          <Marker rotation={[0, 0, 0]} position={[4, 5, 6]}>
            <DataContainer>
              <table
                onClick={() => {
                  if (detail == 1) {
                    setDetail(0);
                  } else {
                    setDetail(1);
                  }
                }}
                style={{ float: "left", width: "120px", height: "60px" }}
              >
                <tr>
                  <th>품명</th>
                  <td>1</td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>1</td>
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
              <table
                onClick={() => {
                  if (detail == 2) {
                    setDetail(0);
                  } else {
                    setDetail(2);
                  }
                }}
                style={{ float: "right", width: "120px", height: "60px" }}
              >
                <tr>
                  <th>품명</th>
                  <td>2</td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>2</td>
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
              <table
                style={{ float: "left", width: "120px", height: "60px" }}
              >
                <tr>
                  <th>품명</th>
                  <td>3</td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>3</td>
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
              <table
                style={{ float: "right", width: "120px", height: "60px" }}
              >
                <tr>
                  <th>품명</th>
                  <td>4</td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>4</td>
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
          {detail == 1 ? (
            <>
              <group position={[3, 9, 6]} rotation={[0, 0, 0]}>
                <Marker rotation={[0, 0, 0]}>
                  <DataContainer style={{ width: "180px", height: "auto" }}>
                    <Chart style={{ height: "130px" }}>
                      <ChartCategoryAxis>
                        <ChartCategoryAxisItem categories={categories} />
                      </ChartCategoryAxis>
                      <ChartSeries>
                        <ChartSeriesItem
                          type="area"
                          data={[0, 0, 0, 0, 0, 0, 0]}
                        />
                        <ChartSeriesItem
                          type="area"
                          data={[165, 210, 287, 144, 190, 167, 212]}
                        />
                        <ChartSeriesItem
                          type="area"
                          data={[0, 0, 0, 0, 0, 0, 0]}
                        />
                      </ChartSeries>
                    </Chart>
                  </DataContainer>
                </Marker>
              </group>
            </>
          ) : detail == 2 ? (
            <>
              <group position={[3, 9, 6]} rotation={[0, 0, 0]}>
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
          <Marker rotation={[0, 0, 0]} position={[-4.5, 5, 6]}>
            <DataContainer>
              <table
                style={{ float: "left", width: "120px", height: "60px" }}
              >
                <tr>
                  <th>품명</th>
                  <td>5</td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>5</td>
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
              <table
                style={{ float: "right", width: "120px", height: "60px" }}
              >
                <tr>
                  <th>품명</th>
                  <td>6</td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>6</td>
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
              <table
                style={{ float: "left", width: "120px", height: "60px" }}
              >
                <tr>
                  <th>품명</th>
                  <td>7</td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>7</td>
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
              <table
                style={{ float: "right", width: "120px", height: "60px" }}
              >
                <tr>
                  <th>품명</th>
                  <td>8</td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>8</td>
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
        </>
      ) : (
        ""
      )}
    </group>
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
