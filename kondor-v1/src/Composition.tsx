import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { IntroScene } from "./scenes/IntroScene";
import { HeroScene } from "./scenes/HeroScene";
import { AboutScene } from "./scenes/AboutScene";
import { VisionScene } from "./scenes/VisionScene";
import { PortfolioScene } from "./scenes/PortfolioScene";
import { TeamScene } from "./scenes/TeamScene";
import { CTAScene } from "./scenes/CTAScene";
import { OutroScene } from "./scenes/OutroScene";

// Scene durations (frames @ 30fps)
const INTRO = 90;       // 3s
const HERO = 300;       // 10s
const ABOUT = 240;      // 8s
const VISION = 240;     // 8s
const PORTFOLIO = 300;  // 10s
const TEAM = 240;       // 8s
const CTA = 240;        // 8s
const OUTRO = 150;      // 5s

// Transition duration
const T = 20; // frames

// Total: 90+300+240+240+300+240+240+150 - 7×20 = 1800 - 140 = 1660

const FADE = fade();
const TIMING = linearTiming({ durationInFrames: T });

export const KondorVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={INTRO} premountFor={T}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={FADE} timing={TIMING} />

      <TransitionSeries.Sequence durationInFrames={HERO} premountFor={T}>
        <HeroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={FADE} timing={TIMING} />

      <TransitionSeries.Sequence durationInFrames={ABOUT} premountFor={T}>
        <AboutScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={FADE} timing={TIMING} />

      <TransitionSeries.Sequence durationInFrames={VISION} premountFor={T}>
        <VisionScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={FADE} timing={TIMING} />

      <TransitionSeries.Sequence durationInFrames={PORTFOLIO} premountFor={T}>
        <PortfolioScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={FADE} timing={TIMING} />

      <TransitionSeries.Sequence durationInFrames={TEAM} premountFor={T}>
        <TeamScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={FADE} timing={TIMING} />

      <TransitionSeries.Sequence durationInFrames={CTA} premountFor={T}>
        <CTAScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={FADE} timing={TIMING} />

      <TransitionSeries.Sequence durationInFrames={OUTRO} premountFor={T}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
