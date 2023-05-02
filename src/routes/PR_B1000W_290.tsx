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
  OrthographicCamera,
  PerspectiveCamera,
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
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
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
      <OrbitControls
        enableZoom={true}
        minDistance={11} // 카메라 최소 거리
        maxDistance={50} // 카메라 최대 거리
        enableDamping={true}
        dampingFactor={0.5} // 이 값을 조절하여 관성 강도를 변경 (0 ~ 1)
      />

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
        <Effects />
      </Suspense>
    </Canvas>
  );
};

//각 팝업들 position(지우면안됩니다)
const tcpPosition = {
  1: [-21.5, 4, 6],
  2: [-13.5, 4, 6],
  3: [-5, 4, 6],
  4: [3, 4, 6],
  5: [-21.5, 4, -1.5],
  6: [-13.5, 4, -1.5],
  7: [-5, 4, -1.5],
};
const tcpDetailPosition = {
  1: [-13, 13, 6],
  2: [-4.5, 13, 6],
  3: [4.2, 13, 6],
  4: [12, 13, 6],
  5: [-13, 13, -1.5],
  6: [-4.5, 13, -1.5],
  7: [4.2, 13, -1.5],
};
const outputPosition = [-18.5, 3, -9.5];
const visionPosition = [6.5, 3, -1.5];
const visionDetailPosition = [8.5, 11, -1.5];
const dryerPosition = [1, 5, -9.5];

const FacilityProcess = (props: any) => {
  const { animations, scene, nodes, materials }: any = useGLTF(
    "./facility_process/scene.gltf"
  );

  // Extract animation actions
  const { ref, actions } = useAnimations(animations);
  const [isVisionDetailShowed, setIsVisionDetailShowed] = useState(false);
  const [isAnimated, setIsAnimated] = useState(true);
  const [active, setActive] = useState(false);
  const [detail, setDetail] = useState<any>(null);

  const processApi = useApi();

  const [mainDataResult, setMainDataResult] = useState<any>(null);
  const [detailDataResult, setDetailDataResult] = useState<any>(null);

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
      const totalRowCnt0 = data.tables[0].RowCount;
      const totalRowCnt1 = data.tables[1].RowCount;
      const totalRowCnt2 = data.tables[2].RowCount;
      const totalRowCnt3 = data.tables[3].RowCount;
      const row0 = data.tables[0].Rows[0];
      const rows1 = data.tables[1].Rows;
      const row2 = data.tables[2].Rows[0];
      const row3 = data.tables[3].Rows[0];

      if (totalRowCnt0 > 0 && totalRowCnt2 > 0 && totalRowCnt3 > 0) {
        const row = { ...row0, ...row2, ...row3 };
        setMainDataResult(row);
      }

      if (totalRowCnt1 > 0) setDetailDataResult(rows1);
    } else {
      console.log("[오류 발생]");
      console.log(data);
    }
  };

  useEffect(() => {
    fetchMainGrid();
  }, []);

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

  const onClickTcpPanelDetail = (tcpNumber: any) => {
    setDetail(tcpNumber);
  };

  return (
    <group dispose={null}>
      <primitive
        object={scene}
        ref={ref}
        onClick={(e: any) => {
          if (!active == false) {
          }
          setActive(!active);
        }}
        {...props}
      />
      {mainDataResult && active == true ? (
        <>
          {/* TCP (1~7구역) */}
          {[1, 2, 3, 4, 5, 6, 7].map((num: number) => {
            return (
              <>
                {/* 메인 판넬 */}
                <TcpPanel
                  tcpNumber={num}
                  position={tcpPosition}
                  data={mainDataResult}
                  onClickDetail={onClickTcpPanelDetail}
                ></TcpPanel>
                {/* 상세 판넬 */}
                {detailDataResult && detail && (
                  <TcpDetailPanel
                    tcpNumber={num}
                    selectedTcpNumber={detail}
                    position={tcpDetailPosition}
                    data={detailDataResult}
                    onClickDetail={onClickTcpPanelDetail}
                  ></TcpDetailPanel>
                )}
              </>
            );
          })}

          {/* 비전 */}
          <Marker rotation={[0, 0, 0]} position={visionPosition}>
            <DataContainer style={{ width: "90px", height: "40px" }}>
              <PanelTable
                label={`비젼`}
                value={mainDataResult[`OP6_배출검사_State`]}
                onClickDetail={() => setIsVisionDetailShowed(true)}
              ></PanelTable>
            </DataContainer>
          </Marker>
          {detailDataResult && isVisionDetailShowed && (
            <VisionDetailPanel
              position={visionDetailPosition}
              data={detailDataResult}
              isSelected={isVisionDetailShowed}
              onClickDetail={() => setIsVisionDetailShowed(false)}
            ></VisionDetailPanel>
          )}

          {/* 세척 및 건조기 */}
          <Marker rotation={[0, 0, 0]} position={dryerPosition}>
            <DataContainer
              style={{
                width: "110px",
                height: "80px",
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)" /* 1열 */,
                gridTemplateRows: "repeat(2, 1fr)" /* 2행 */,
              }}
            >
              <PanelTable
                style={{ width: "110px" }}
                label={`세척기`}
                value={mainDataResult[`Washing_State`]}
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
              <PanelTable
                style={{ width: "110px" }}
                label={`건조기`}
                value={mainDataResult[`AirBlower_State`]}
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
            </DataContainer>
          </Marker>

          {/* 생산 */}
          <Marker rotation={[0, 0, 0]} position={outputPosition}>
            <DataContainer
              style={{
                width: "270px",
                height: "40px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)" /* 1열 */,
                gridTemplateRows: "repeat(1, 1fr)" /* 3행 */,
              }}
            >
              <PanelTable
                label={`OK`}
                value={mainDataResult[`out_ok1`]}
                valueType="Number"
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
              <PanelTable
                label={`OK2`}
                value={mainDataResult[`out_ok2`]}
                valueType="Number"
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
              <PanelTable
                label={`회송`}
                value={mainDataResult[`out_ng`]}
                valueType="Number"
                onClickDetail={onClickTcpPanelDetail}
              ></PanelTable>
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

type TTcpPanel = {
  tcpNumber: number;
  position: { [key: number]: number[] };
  data: any;
  onClickDetail: (n: number) => void;
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
              value={data[`TPC${tcpNum}_State`]}
              onClickDetail={() => onClickDetail(tcpNum)}
            ></PanelTable>
          );
        })}
      </DataContainer>
    </Marker>
  );
};

type TPanelTable = {
  label: string;
  value: number;
  valueType?: "State" | "Number";
  onClickDetail: (n: any) => void;
  style?: any;
};
const PanelTable = ({
  label,
  value,
  valueType = "State",
  onClickDetail,
  style,
}: TPanelTable) => {
  const [isHovering, setIsHovering] = useState(0);

  return (
    <table
      onClick={() => {
        onClickDetail("");
      }}
      onMouseOver={() => setIsHovering(1)}
      onMouseOut={() => setIsHovering(0)}
      style={{
        width: style != undefined ? style.width : "90px",
        height: "35px",
        backgroundColor: isHovering == 1 ? "#3e80ed5e" : "",
        cursor: "Pointer",
      }}
    >
      <tbody>
        <tr>
          <th>{label}</th>
          <td>
            <span
              className={valueType === "Number" ? "number" : "sts sts" + value}
            >
              <span className="light"></span>

              {valueType === "Number"
                ? value
                : Number(value) === 1
                ? "정상"
                : Number(value) === 2
                ? "통신 에러"
                : Number(value) === 3
                ? "작은 고장"
                : Number(value) === 4
                ? "큰 고장"
                : ""}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
type TTcpDetailPanel = {
  tcpNumber: number;
  position: any;
  selectedTcpNumber: number;
  data: any[];
  onClickDetail: (n: any) => void;
};
const TcpDetailPanel = ({
  position,
  tcpNumber,
  selectedTcpNumber,
  data,
  onClickDetail,
}: TTcpDetailPanel) => {
  const tpData = data.filter((row: any) => row.Tp_No === selectedTcpNumber);

  const categories = tpData.map((row: any) => row.Tp_InsertTime);
  const tpJig = tpData.map((row: any) => row.Tp_JIG);
  const tpJigMax = tpData.map((row: any) => row.Tp_JIG_MAX);
  const tpJigMin = tpData.map((row: any) => row.Tp_JIG_MIN);

  const tpWjig = tpData.map((row: any) => row.Tp_WJIG);
  const tpWjigMax = tpData.map((row: any) => row.Tp_WJIG_MAX);
  const tpWjigMin = tpData.map((row: any) => row.Tp_WJIG_MIN);

  const tpVibration = tpData.map((row: any) => row.Tp_Vibration);

  return selectedTcpNumber &&
    String(selectedTcpNumber).charAt(0) === String(tcpNumber) ? (
    <group position={position[tcpNumber]} rotation={[0, 0, 0]}>
      <Marker rotation={[0, 0, 0]}>
        <DataContainer
          onClick={() => onClickDetail(null)}
          style={{
            width: "900px",
            height: "300px",
            padding: "20px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            TPC {selectedTcpNumber}호기{" "}
            {tpData.length > 0 && (
              <>
                ({tpData[0].Tp_InsertTime} ~
                {tpData[tpData.length - 1].Tp_InsertTime})
              </>
            )}
          </p>
          <div style={{ width: "100%", height: "auto", display: "flex" }}>
            <Chart style={{ height: "230px" }}>
              <ChartTitle text="JIG 추이" />
              <ChartLegend position="bottom" orientation="horizontal" />

              <ChartCategoryAxis>
                <ChartCategoryAxisItem
                  categories={categories}
                  visible={false}
                />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="line"
                  tooltip={{ visible: true }}
                  data={tpJigMax}
                  name={"MAX"}
                />
                <ChartSeriesItem
                  type="line"
                  tooltip={{ visible: true }}
                  data={tpJig}
                  name={"JIG"}
                />
                <ChartSeriesItem
                  type="line"
                  tooltip={{ visible: true }}
                  data={tpJigMin}
                  name={"MIN"}
                />
              </ChartSeries>
            </Chart>
            <Chart style={{ height: "230px" }}>
              <ChartTitle text="WJIG 추이" />
              <ChartLegend position="bottom" orientation="horizontal" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem
                  categories={categories}
                  visible={false}
                />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="line"
                  tooltip={{ visible: true }}
                  data={tpWjigMax}
                  name={"MAX"}
                />
                <ChartSeriesItem
                  type="line"
                  tooltip={{ visible: true }}
                  data={tpWjig}
                  name={"WJIG"}
                />
                <ChartSeriesItem
                  type="line"
                  tooltip={{ visible: true }}
                  data={tpWjigMin}
                  name={"MIN"}
                />
              </ChartSeries>
            </Chart>
            <Chart style={{ height: "230px" }}>
              <ChartTitle text="진동 추이" />
              <ChartLegend position="bottom" orientation="horizontal" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem
                  categories={categories}
                  visible={false}
                />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="line"
                  tooltip={{ visible: true }}
                  data={tpVibration}
                  name={"진동"}
                />
              </ChartSeries>
            </Chart>
          </div>
        </DataContainer>
      </Marker>
    </group>
  ) : (
    <></>
  );
};

type TVisionDetailPanel = {
  position: any;
  isSelected: boolean;
  data: any[];
  onClickDetail: (n: any) => void;
};
const VisionDetailPanel = ({
  position,
  isSelected,
  data,
  onClickDetail,
}: TVisionDetailPanel) => {
  const tpData = data.filter((row: any) => row.Tp_No !== "");

  const categories = tpData.map((row: any) => row.Tp_InsertTime);
  const tpJig = tpData.map((row: any) => row.Tp_JIG);

  return isSelected ? (
    <group position={position} rotation={[0, 0, 0]}>
      <Marker rotation={[0, 0, 0]}>
        <DataContainer
          onClick={() => onClickDetail(null)}
          style={{
            width: "320px",
            height: "300px",
            padding: "20px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            비젼 불량 추이
            <br />
            {data.length > 0 && (
              <>
                ({data[0].Tp_InsertTime} ~{data[data.length - 1].Tp_InsertTime})
              </>
            )}
          </p>
          <div style={{ width: "100%", height: "auto", display: "flex" }}>
            <Chart style={{ height: "200px" }}>
              {/* <ChartTitle text="Vision 불량 추이" /> */}
              <ChartLegend position="bottom" orientation="horizontal" />

              <ChartCategoryAxis>
                <ChartCategoryAxisItem
                  categories={categories}
                  visible={false}
                />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="line"
                  tooltip={{ visible: true }}
                  data={tpJig}
                  name={"불량"}
                />
              </ChartSeries>
            </Chart>
          </div>
        </DataContainer>
      </Marker>
    </group>
  ) : (
    <></>
  );
};

export default PR_B1000W_290;
