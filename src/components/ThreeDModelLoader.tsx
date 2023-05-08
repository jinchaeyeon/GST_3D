import { Html, useProgress } from "@react-three/drei";
import { ProgressBar } from "@progress/kendo-react-progressbars";
import ClipLoader from "react-spinners/ClipLoader";

function ThreeDModelLoader() {
  const { progress } = useProgress();

  return (
    <Html
      center
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ClipLoader color="#2184bb" size={150} loading={true} />
      <ProgressBar
        style={{ width: "350px", height: "22px", marginTop: "50px" }}
        value={progress}
        label={(props) => {
          return (
            <p>
              Loading{" "}
              <strong style={{ fontWeight: 900 }}>
                {props.value ? props.value.toFixed(2) : 0}%
              </strong>
            </p>
          );
        }}
        labelPlacement="center"
      />
      ;
    </Html>
  );
}

export default ThreeDModelLoader;
