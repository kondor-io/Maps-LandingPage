import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

// Floating particles for outro
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  x: ((i * 137.5) % 1920) - 960,
  y: ((i * 97.3) % 1080) - 540,
  size: 1 + (i % 3) * 0.8,
  delay: i * 3,
  driftX: (((i % 5) - 2) * 12),
  driftY: -20 - (i % 8) * 6,
  speed: 0.3 + (i % 5) * 0.1,
}));

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Final fade out to black
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps * 1.2, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Logo spring entrance
  const logoSpring = spring({
    frame: frame - fps * 0.3,
    fps,
    config: { damping: 200 },
    durationInFrames: fps * 1.2,
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Glow pulse
  const glowFrac = (frame % (fps * 2.5)) / (fps * 2.5);
  const glow = interpolate(glowFrac, [0, 0.5, 1], [0.4, 1, 0.4]);

  // URL entrance
  const urlOpacity = interpolate(frame, [fps * 0.9, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [fps * 0.9, fps * 1.5], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [fps * 1.3, fps * 1.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ring animations
  const ring1Scale = spring({
    frame: frame - fps * 0.1,
    fps,
    config: { damping: 60, stiffness: 50 },
    durationInFrames: fps * 2,
  });
  const ring2Scale = spring({
    frame: frame - fps * 0.3,
    fps,
    config: { damping: 60, stiffness: 40 },
    durationInFrames: fps * 2,
  });
  const ring3Scale = spring({
    frame: frame - fps * 0.5,
    fps,
    config: { damping: 60, stiffness: 35 },
    durationInFrames: fps * 2,
  });

  // Particles drift
  const particleProgress = interpolate(frame, [0, durationInFrames], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0d10",
        opacity: fadeIn * fadeOut,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Deep background radial */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(237,73,47,${0.2 * glow}) 0%, rgba(20,20,28,0.8) 40%, transparent 70%)`,
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => {
        const pOpacity = interpolate(
          frame,
          [p.delay, p.delay + fps * 0.6, durationInFrames - fps * 0.6],
          [0, 0.6, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const driftX = p.driftX * particleProgress;
        const driftY = p.driftY * particleProgress * p.speed * 3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "#ED492F",
              opacity: pOpacity,
              transform: `translate(calc(-50% + ${p.x + driftX}px), calc(-50% + ${p.y + driftY}px))`,
              boxShadow: "0 0 4px rgba(237,73,47,0.8)",
            }}
          />
        );
      })}

      {/* Expanding rings */}
      {[
        { scale: ring1Scale, opacity: interpolate(ring1Scale, [0, 0.3, 1], [0, 0.3, 0]) },
        { scale: ring2Scale * 1.4, opacity: interpolate(ring2Scale, [0, 0.3, 1], [0, 0.2, 0]) },
        { scale: ring3Scale * 2.0, opacity: interpolate(ring3Scale, [0, 0.3, 1], [0, 0.15, 0]) },
      ].map(({ scale, opacity }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(237,73,47,0.6)",
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity,
          }}
        />
      ))}

      {/* Inner glow ring — static */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "1px solid rgba(237,73,47,0.25)",
          transform: `translate(-50%, -50%) scale(${logoSpring})`,
          boxShadow: `0 0 ${50 * glow}px rgba(237,73,47,0.2)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 ${40 * glow}px rgba(237,73,47,0.7)) drop-shadow(0 0 80px rgba(237,73,47,0.3))`,
          }}
        >
          <Img
            src={staticFile("kondor.png")}
            style={{ width: 220, height: "auto" }}
          />
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 60,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(237,73,47,0.7), transparent)",
            }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 300,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.08em",
            }}
          >
            kondor.dev
          </p>
        </div>

        {/* Tagline */}
        <p
          style={{
            opacity: taglineOpacity,
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Ingeniería con criterio
        </p>
      </div>

      {/* Corner marks */}
      {[
        { top: 32, left: 32 },
        { top: 32, right: 32 },
        { bottom: 32, left: 32 },
        { bottom: 32, right: 32 },
      ].map((pos, i) => {
        const cornerOpacity = interpolate(
          frame,
          [fps * 0.4 + i * 5, fps * 0.9 + i * 5, durationInFrames - fps * 0.8],
          [0, 0.45, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 20,
              height: 20,
              borderTop: "bottom" in pos ? "none" : "1px solid rgba(237,73,47,0.55)",
              borderBottom: "top" in pos ? "none" : "1px solid rgba(237,73,47,0.55)",
              borderLeft: "right" in pos ? "none" : "1px solid rgba(237,73,47,0.55)",
              borderRight: "left" in pos ? "none" : "1px solid rgba(237,73,47,0.55)",
              opacity: cornerOpacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
