import "./index.css";
import { Composition } from "remotion";
import { KondorVideo } from "./Composition";

// Total: 90+300+240+240+300+240+240+150 = 1800 frames, minus 7×20 transitions = 1660
const TOTAL_FRAMES = 1660;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KondorPromo"
        component={KondorVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
