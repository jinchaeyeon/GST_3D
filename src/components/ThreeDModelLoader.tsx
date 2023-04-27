import { Html, useProgress } from "@react-three/drei";
import { ProgressBar } from "@progress/kendo-react-progressbars";

function ThreeDModelLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <ProgressBar value={progress} />
    </Html>
  );
}

export default ThreeDModelLoader;
