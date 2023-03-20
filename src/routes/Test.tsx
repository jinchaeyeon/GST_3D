import React, { Suspense, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, GroupProps } from "@react-three/fiber";
import { useGLTF, Stats, useAnimations } from "@react-three/drei";
import { Environment, OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group, TextureLoader } from "three";
import * as THREE from "three";
import { FaMapMarkerAlt } from "react-icons/fa";
import { DataResult, process, State } from "@progress/kendo-data-query";
import { Iparameters, TPermissions } from "../store/types";
import { useApi } from "../hooks/api";
import { convertDateToStr, UsePermissions } from "../components/CommonFunction";
const Test: React.FC = () => {
  return (
    <Canvas shadows camera={{ position: [5, 0, 0] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.7} position={[1000, 1000, 1000]} />
        <directionalLight intensity={0.7} position={[0, 0, 5]} />
        <OrbitControls />
        <Model />
      </Suspense>
    </Canvas>
  );
};

const Model = (props: any) => {
  const { nodes, materials }: any = useGLTF("/dna_lab_machine/scene.gltf");
  const processApi = useApi();

  const [mainDataState, setMainDataState] = useState<State>({
    sort: [],
  });
  const [mainDataResult, setMainDataResult] = useState<DataResult>(
    process([], mainDataState)
  );

  const [filters, setFilters] = useState({
    pgSize: 20,
    orgdiv: "01",
    cboLocation: "01",
    frdt: new Date("2019-05-17 10:20:30"),
    todt: new Date(),
    cboPerson: "",
    itemcd: "",
    itemnm: "",
    custcd: "",
    custnm: "",
    lotnum: "",
    reckey: "",
  });

  const parameters: Iparameters = {
    procedureName: "P_MA_A3400W_Q",
    pageNumber: 1,
    pageSize: filters.pgSize,
    parameters: {
      "@p_work_type": "LIST",
      "@p_orgdiv": filters.orgdiv,
      "@p_location": filters.cboLocation,
      "@p_frdt": convertDateToStr(filters.frdt),
      "@p_todt": convertDateToStr(filters.todt),
      "@p_person": filters.cboPerson,
      "@p_itemcd": filters.itemcd,
      "@p_itemnm": filters.itemnm,
      "@p_custcd": filters.custcd,
      "@p_custnm": filters.custnm,
      "@p_lotnum": filters.lotnum,
      "@p_reckey": filters.reckey,
      "@p_find_row_value": null,
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
      const totalRowCnt = data.tables[0].RowCount;
      const rows = data.tables[0].Rows;

      if (totalRowCnt > 0)
        setMainDataResult((prev) => {
          return {
            data: rows,
            total: totalRowCnt,
          };
        });
    } else {
      console.log("[오류 발생]");
      console.log(data);
    }
  };

  React.useEffect(() => {
    fetchMainGrid();
  }, [filters]);

  const gltf = useLoader(GLTFLoader, "./dna_lab_machine/scene.gltf");
  const { animations } = useGLTF("./dna_lab_machine/scene.gltf");
  const { ref, actions } = useAnimations(animations);

  React.useEffect(() => {
    if (actions["Scene"]) {
      actions["Scene"].play();
    }
  }, [actions]);

  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        scale={1}
        physicallyCorrectLights
      />
      <group position={[-0.2, 3, 1.5]} rotation={[5, 0, -7.85]}>
        <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <div
            style={{
              position: "absolute",
              fontSize: 10,
              letterSpacing: -0.5,
              left: 17.5,
            }}
          >
            {mainDataResult.data.length != 0
              ? mainDataResult.data[0].reckey
              : ""}
          </div>
          <FaMapMarkerAlt style={{ color: "indianred" }} />
        </Marker>
      </group>
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

export default Test;
