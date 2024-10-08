import { Button } from "@progress/kendo-react-buttons";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import {
  KeyboardEvent,
  useCallback,
  useState,
  useEffect,
  Suspense,
  useRef,
} from "react";
import { useHistory } from "react-router-dom";
import { passwordExpirationInfoState, loginResultState } from "../store/atoms";
import { useApi } from "../hooks/api";
import { useSetRecoilState } from "recoil";
import { FormInput, FormComboBox } from "../components/Editors";
import { LoginAppName, LoginBox } from "../CommonStyled";
import { resetLocalStorage } from "../components/CommonFunction";
import { isLoading } from "../store/atoms";
import Loading from "../components/Loading";
import cookie from "react-cookies";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Vector3 } from "three";
import ClipLoader from "react-spinners/ClipLoader";

interface IFormData {
  langCode: string;
  companyCode: string | { company_code: string };
  userId: string;
  password: string;
}

const Login: React.FC = () => {
  const processApi = useApi();
  const history = useHistory();
  const setLoginResult = useSetRecoilState(loginResultState);
  const setPwExpInfo = useSetRecoilState(passwordExpirationInfoState);
  const setLoading = useSetRecoilState(isLoading);
  const [ifShowCompanyList, setIfShowCompanyList] = useState(false);

  const handleSubmit = (data: { [name: string]: any }) => {
    processLogin(data);
  };

  const processLogin = useCallback(
    async (formData: { [name: string]: any }) => {
      try {
        setLoading(true);

        let para: IFormData = Object.assign(
          {},
          {
            langCode: formData.langCode,
            companyCode: formData.companyCode,
            userId: formData.userId,
            password: formData.password,
          }
        );

        if (typeof para.companyCode !== "string") {
          para.companyCode = para.companyCode.company_code;
        }

        const response = await processApi<any>("login", para);

        const {
          token,
          refreshToken,
          userId,
          userName,
          role,
          companyCode,
          serviceName,
          customerName,
          defaultCulture,
          loginKey,
          passwordExpirationInfo,
        } = response;

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 60);
        cookie.save("refreshToken", refreshToken, {
          path: "/",
          expires,
          // secure : true,
          // httpOnly : true
        });

        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);

        setLoginResult({
          langCode: defaultCulture,
          userId,
          userName,
          role,
          companyCode,
          serviceName,
          customerName,
          loginKey,
        });

        setPwExpInfo(passwordExpirationInfo);

        history.replace("/Home");
        setLoading(false);
      } catch (e: any) {
        console.log("login error", e);
        setLoading(false);
        alert(e.message);
      }
    },
    []
  );

  const companyCodeKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.key === "'") {
      setIfShowCompanyList((prev) => !prev);
    }
  };

  useEffect(() => {
    resetLocalStorage();
  }, []);

  const videoRef: any = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // 원하는 배속으로 설정
    }
  }, []);

  return (
    <LoginBox>
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        ref={videoRef}
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover", // 비디오가 부모 요소를 가득 채우도록 설정
          // filter: "saturate(50%)",
        }}
      >
        <source src="bg_video_compressed.mp4" type="video/mp4" />
      </video>

      <Canvas
        gl={{ logarithmicDepthBuffer: true, antialias: true }}
        dpr={[1, 1.5]}
        camera={{ position: [5.2, 2.7, 5.2], fov: 30 }}
      >
        <Suspense fallback={<ThreeDModelLoader />}>
          {/* 전체적인 조명 */}
          <ambientLight intensity={0.1} />
          {/* 윗쪽에서 오는 빛 */}
          <spotLight intensity={1} position={[0, 1000, 0]} />
          {/* 뒷쪽에서 오는 빛 */}
          <spotLight intensity={1} position={[0, 0, -1000]} />

          {/* 추가적인 광원 */}
          <directionalLight
            intensity={0.5}
            position={[-1000, 1000, 1000]}
            color={"rgba(0, 47, 255, 0.5)"}
          />
          <directionalLight
            intensity={0.5}
            position={[1000, 1000, 1000]}
            // color={"rgba(0, 47, 255, 0.1)"}
          />

          <RobotArm />
        </Suspense>
      </Canvas>

      <div className="container">
        <div className="item">
          <Form
            onSubmit={handleSubmit}
            render={() => (
              <FormElement>
                <LoginAppName>
                  <div className="logo"></div>
                </LoginAppName>
                <fieldset className={"k-form-fieldset"}>
                  {ifShowCompanyList ? (
                    <Field
                      name={"companyCode"}
                      label={"회사코드"}
                      component={FormComboBox}
                      ifGetCompanyCode={true}
                      valueField="company_code"
                      textField="name"
                      onKeyDown={companyCodeKeyDown}
                      columns={[
                        {
                          sortOrder: 0,
                          fieldName: "company_code",
                          caption: "회사코드",
                          columnWidth: 100,
                          dataAlignment: "center",
                        },
                        {
                          sortOrder: 0,
                          fieldName: "name",
                          caption: "업체명",
                          columnWidth: 100,
                          dataAlignment: "center",
                        },
                        {
                          sortOrder: 0,
                          fieldName: "service_name",
                          caption: "서비스명",
                          columnWidth: 100,
                          dataAlignment: "center",
                        },
                      ]}
                    />
                  ) : (
                    <Field
                      name={"companyCode"}
                      label={"회사코드"}
                      component={FormInput}
                      onKeyDown={companyCodeKeyDown}
                    />
                  )}

                  <Field name={"userId"} label={"ID"} component={FormInput} />
                  <Field
                    name={"password"}
                    label={"PW"}
                    type={"password"}
                    component={FormInput}
                  />
                </fieldset>
                <Button
                  className="login-btn"
                  themeColor={"primary"}
                  size="large"
                >
                  Login
                </Button>
              </FormElement>
            )}
          ></Form>
        </div>
        <div className="copy-right">
          &copy;GST Co., Ltd. All rights reserved.
        </div>
      </div>
      <Loading />
    </LoginBox>
  );
};

const RobotArm = () => {
  const { animations, scene }: any = useGLTF("/robot_arm/scene.gltf");

  const { ref, actions } = useAnimations(animations);

  useEffect(() => {
    if (actions["Animation"]) {
      actions["Animation"].play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (actions["Animation"]) {
      actions["Animation"].timeScale = 0.5; // Half the speed
    }
  });
  const windowWidth = useRef(window.innerWidth);
  const target =
    windowWidth.current > 768
      ? new Vector3(0, 0, 0)
      : new Vector3(1.5, 1.5, 1.5);

  return (
    <group>
      <primitive
        object={scene}
        ref={ref}
        scale={windowWidth.current > 768 ? 0.015 : 0.0035}
        position={windowWidth.current > 768 ? [1, -1, 1] : [1.5, 2, 1.5]}
        rotation={
          windowWidth.current > 768 ? [0, Math.PI / 6, 0] : [0, Math.PI / 7, 0]
        }
      />

      {/* 카메라 컨트롤 */}
      <OrbitControls
        enableZoom={true}
        target={target} // 회전 중심점 설정
        minDistance={5} // 카메라 최소 거리
        maxDistance={10} // 카메라 최대 거리
        enableDamping={true}
        dampingFactor={0.5} // 이 값을 조절하여 관성 강도를 변경 (0 ~ 1)
      />
    </group>
  );
};
export default Login;

function ThreeDModelLoader() {
  return (
    <Html
      center
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ClipLoader color="#2db3b7" size={150} loading={true} />;
    </Html>
  );
}
