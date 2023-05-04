import { Html, useProgress } from "@react-three/drei";
import { ProgressBar } from "@progress/kendo-react-progressbars";

function ThreeDModelLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <ProgressBar
        style={{ width: "350px", height: "22px" }}
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
