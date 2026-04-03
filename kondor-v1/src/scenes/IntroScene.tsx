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
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

// Particles around the logo
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2;
  const r = 160 + (i % 5) * 18;
  return {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
    size: 1.5 + (i % 3),
    delay: i * 3,
    speed: 0.6 + (i % 4) * 0.15,
  };
});

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fade in background
  const bgOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo spring entrance
  const logoScale = spring({
    frame: frame - fps * 0.3,
    fps,
    config: { damping: 200 },
    durationInFrames: fps * 1.2,
  });
  const logoOpacity = interpolate(frame, [fps * 0.3, fps * 0.9], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Tagline entrance
  const taglineY = interpolate(frame, [fps * 0.8, fps * 1.4], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const taglineOpacity = interpolate(frame, [fps * 0.8, fps * 1.4], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Scan line animation
  const scanY = interpolate(frame, [fps * 0.5, fps * 1.8], [-200, 1280], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Glow pulse
  const glowPulse = interpolate(
    frame % (fps * 1.5),
    [0, fps * 0.75, fps * 1.5],
    [0.4, 1, 0.4],
    { extrapolateRight: "clamp" }
  );

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps * 0.5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Accent ring scale
  const ringScale = spring({
    frame: frame - fps * 0.2,
    fps,
    config: { damping: 80, stiffness: 60 },
    durationInFrames: fps * 1.5,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0d10",
        opacity: bgOpacity * fadeOut,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Radial background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(237,73,47,${0.18 * glowPulse}) 0%, rgba(30,30,36,0.6) 45%, transparent 75%)`,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(237,73,47,0.8) 30%, rgba(255,255,255,0.9) 50%, rgba(237,73,47,0.8) 70%, transparent)",
          boxShadow: "0 0 20px rgba(237,73,47,0.6)",
          pointerEvents: "none",
        }}
      />

      {/* Animated accent ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          border: "1px solid rgba(237,73,47,0.35)",
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          boxShadow: `0 0 ${60 * glowPulse}px rgba(237,73,47,0.25)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          border: "1px solid rgba(237,73,47,0.15)",
          transform: `translate(-50%, -50%) scale(${ringScale * 0.92 + 0.08})`,
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p, i) => {
        const pOpacity = interpolate(
          frame,
          [p.delay, p.delay + fps * 0.4, fps * 2.4],
          [0, 0.7, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const drift =
          Math.sin((frame * p.speed * Math.PI * 2) / fps + i) * 8;
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
              transform: `translate(calc(-50% + ${p.x + drift}px), calc(-50% + ${p.y}px))`,
              boxShadow: "0 0 6px rgba(237,73,47,0.9)",
            }}
          />
        );
      })}

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${0.4 + logoScale * 0.6})`,
            filter: `drop-shadow(0 0 ${30 * glowPulse}px rgba(237,73,47,0.7))`,
          }}
        >
          <Img
            src={staticFile("kondor.png")}
            style={{ width: 200, height: "auto" }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 48,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(237,73,47,0.8), transparent)",
            }}
          />
          <p
            style={{
              fontSize: 14,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Software Factory
          </p>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "white",
              margin: 0,
              letterSpacing: "-0.02em",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Ingeniería con{" "}
            <span style={{ color: "#ED492F" }}>criterio</span>
          </h1>
        </div>
      </div>

      {/* Corner HUD decorations */}
      {[
        { top: 32, left: 32 },
        { top: 32, right: 32 },
        { bottom: 32, left: 32 },
        { bottom: 32, right: 32 },
      ].map((pos, i) => {
        const cornerOpacity = interpolate(
          frame,
          [fps * 0.6 + i * 4, fps * 1.0 + i * 4],
          [0, 0.5],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 24,
              height: 24,
              borderTop: pos.bottom !== undefined ? "none" : "1px solid rgba(237,73,47,0.6)",
              borderBottom: pos.top !== undefined ? "none" : "1px solid rgba(237,73,47,0.6)",
              borderLeft: pos.right !== undefined ? "none" : "1px solid rgba(237,73,47,0.6)",
              borderRight: pos.left !== undefined ? "none" : "1px solid rgba(237,73,47,0.6)",
              opacity: cornerOpacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
