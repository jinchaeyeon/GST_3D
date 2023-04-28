import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  Html,
  ContactShadows,
  Environment,
  Lightformer,
  useProgress,
} from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { DataContainer } from "../CommonStyled";
import ThreeDModelLoader from "../components/ThreeDModelLoader";
import { useApi } from "../hooks/api";
import { Iparameters } from "../store/types";
import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";
import { useRecoilState } from "recoil";
import { isLoading } from "../store/atoms";

const PR_B1000W_290: React.FC = () => {
  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [5, 5, 15], fov: 50 }}
    >
      <Suspense fallback={<ThreeDModelLoader />}>
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
      </Suspense>
    </Canvas>
  );
};
const FacilityProcess = (props: any) => {
  const { animations, scene, nodes, materials }: any = useGLTF(
    "./facility_process/scene.gltf"
  );

  const [loading, setLoading] = useRecoilState(isLoading);

  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    console.log("ttt1");
    setLoading(true);
  }, []);
  useEffect(() => {
    console.log("ttt2");
    if (scene) {
      console.log(false);
      setLoading(false);
    } else {
      console.log(true);
      setLoading(true);
    }
  }, [scene]);

  // Extract animation actions
  const { ref, actions } = useAnimations(animations);
  const [isAnimated, setIsAnimated] = useState(true);
  const [active, setActive] = useState(false);
  const [detail, setDetail] = useState(0);
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const processApi = useApi();

  const [mainDataResult, setMainDataResult] = useState<any>(null);

  const parameters: Iparameters = {
    procedureName: "P_PR_B1000W_290_Q",
    pageNumber: 0,
    pageSize: 0,
    parameters: {
      "@p_work_type": "Q",
    },
  };

  const fetchMainGrid = async () => {
    let data: any;
    try {
      data = await processApi<any>("procedure", parameters);
    } catch (error) {
      data = null;
    }
    if (data.isSuccess === true) {
      const totalRowCnt1 = data.tables[0].RowCount;
      const totalRowCnt2 = data.tables[1].RowCount;
      const totalRowCnt3 = data.tables[2].RowCount;
      const row1 = data.tables[0].Rows[0];
      const row2 = data.tables[1].Rows[0];
      const row3 = data.tables[2].Rows[0];
      const row = { ...row1, ...row2, ...row3 };

      if (totalRowCnt1 > 0 && totalRowCnt2 > 0 && totalRowCnt3 > 0)
        setMainDataResult(row);
    } else {
      console.log("[오류 발생]");
      console.log(data);
    }
  };

  useEffect(() => {
    fetchMainGrid();
  }, []);

  //각 팝업들 position(지우면안됩니다)
  const tcpPosition = {
    1: [-21, 5, 6],
    2: [-12.5, 5, 6],
    3: [-4.5, 5, 6],
    4: [4, 5, 6],
    5: [-21, 5, -1.5],
    6: [-12.5, 5, -1.5],
    7: [-4.5, 5, -1.5],
  };
  const tcpDetailPosition = {
    1: [-22, 9, 6],
    2: [-13.5, 9, 6],
    3: [-5.2, 9, 6],
    4: [3, 9, 6],
    5: [-22, 9, -1.5],
    6: [-13.5, 9, -1.5],
    7: [-5.2, 9, -1.5],
  };
  const outputPosition = [-18.5, 3, -9.5];
  const visionPosition = [6.5, 3, -1.5];
  const dryerPosition = [1, 5, -9.5];

  useEffect(() => {
    if (actions["Animation"]) {
      actions["Animation"].play();
    }
  }, [actions]);

  // useEffect(() => {
  //   if (actions["Animation"]) {
  //     if (isAnimated) {
  //       actions["Animation"].play();
  //     } else {
  //       actions["Animation"].stop();
  //     }
  //   }
  // }, [actions, isAnimated]);

  const onClickTcpPanelDetail = () => {};

  return (
    <group dispose={null}>
      <primitive
        object={scene}
        ref={ref}
        onClick={(e: any) => {
          if (!active == false) {
            setDetail(0);
          }
          setActive(!active);
        }}
        {...props}
      />
      {mainDataResult && active == true ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7].map((num: number) => {
            return (
              <TcpPanel
                tcpNumber={num}
                position={tcpPosition}
                data={mainDataResult}
                onClickDetail={onClickTcpPanelDetail}
              ></TcpPanel>
            );
          })}

          <Marker rotation={[0, 0, 0]} position={visionPosition}>
            <DataContainer style={{width: "140px", height: "60px"}}>
              <PanelTable
                label={`비젼`}
                state={mainDataResult[`OP6_배출검사_State`]}
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
            </DataContainer>
          </Marker>
          <Marker rotation={[0, 0, 0]} position={dryerPosition}>
            <DataContainer
              style={{
                width: "140px", height: "120px",
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)" /* 1열 */,
                gridTemplateRows: "repeat(2, 1fr)" /* 2행 */,
              }}
            >
              <PanelTable
                label={`세척기`}
                state={mainDataResult[`Washing_State`]}
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
              <PanelTable
                label={`건조기`}
                state={mainDataResult[`AirBlower_State`]}
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
            </DataContainer>
          </Marker>
          <Marker rotation={[0, 0, 0]} position={outputPosition}>
            <DataContainer
              style={{
                width: "360px", height: "60px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)" /* 1열 */,
                gridTemplateRows: "repeat(1, 1fr)" /* 3행 */,
              }}
            >
              <PanelTable
                label={`OK`}
                state={mainDataResult[`out_ok1`]}
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
              <PanelTable
                label={`OK2`}
                state={mainDataResult[`out_ok2`]}
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
              <PanelTable
                label={`회송`}
                state={mainDataResult[`out_ng`]}
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
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

type TTcpPanel = {
  tcpNumber: number;
  position: { [key: number]: number[] };
  data: any;
  onClickDetail: () => void;
};

const TcpPanel = ({ tcpNumber, position, data, onClickDetail }: TTcpPanel) => {
  return (
    <Marker rotation={[0, 0, 0]} position={position[tcpNumber]}>
      <DataContainer
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)" /* 2열 */,
          gridTemplateRows: "repeat(2, 1fr)" /* 2행 */,
        }}
      >
        {[1, 2, 3, 4].map((num: number) => {
          const tcpNum = Number(String(tcpNumber) + String(num));
          return (
            <PanelTable
              label={`TPC${tcpNum}`}
              state={data[`TPC${tcpNum}_State`]}
              onClickDetail={onClickDetail}
            ></PanelTable>
          );
        })}
      </DataContainer>
    </Marker>
  );
};

type TPanelTable = {
  label: string;
  state: number;
  onClickDetail: () => void;
};
const PanelTable = ({ label, state, onClickDetail }: TPanelTable) => {
  return (
    <table
      onClick={() => {
        onClickDetail();
      }}
      style={{ width: "120px", height: "60px" }}
    >
      <tbody>
        <tr>
          <th>{label}</th>
          <td>
            <span className="run">
              <span className="light"></span>
              {state}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PR_B1000W_290;
