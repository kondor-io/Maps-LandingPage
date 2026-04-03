import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

// Orbiting glow orbs
const ORBS = [
  { angle: 30, r: 400, size: 320, opacity: 0.12, speed: 0.008 },
  { angle: 160, r: 360, size: 260, opacity: 0.1, speed: -0.006 },
  { angle: 280, r: 420, size: 200, opacity: 0.08, speed: 0.005 },
];

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps * 0.5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Tag
  const tagOpacity = interpolate(frame, [fps * 0.2, fps * 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline entrance
  const h2Spring = spring({
    frame: frame - fps * 0.35,
    fps,
    config: { damping: 200 },
    durationInFrames: fps * 1.0,
  });
  const h2Y = interpolate(h2Spring, [0, 1], [50, 0]);
  const h2Opacity = interpolate(h2Spring, [0, 1], [0, 1]);

  // Subtitle
  const subOpacity = interpolate(frame, [fps * 0.9, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [fps * 0.9, fps * 1.5], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button
  const ctaScale = spring({
    frame: frame - fps * 1.4,
    fps,
    config: { damping: 200 },
    durationInFrames: fps * 0.6,
  });
  const ctaOpacity = interpolate(
    frame,
    [fps * 1.4, fps * 1.9],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // CTA pulse (button glow breathe)
  const ctaPulseFrac = (frame % (fps * 2)) / (fps * 2);
  const ctaGlow = interpolate(ctaPulseFrac, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  // Bottom note
  const noteOpacity = interpolate(frame, [fps * 2.0, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Grid overlay opacity
  const gridOpacity = 0.035;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1E1E24",
        opacity: fadeIn * fadeOut,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 72% 65%, rgba(237,73,47,0.92) 0%, rgba(180,45,22,0.55) 28%, rgba(30,30,36,1) 58%)",
        }}
      />

      {/* Orbiting glow orbs */}
      {ORBS.map((orb, i) => {
        const currentAngle =
          ((orb.angle + frame * orb.speed * 180) / Math.PI) * (Math.PI / 180);
        const x = Math.cos(currentAngle) * orb.r;
        const y = Math.sin(currentAngle) * orb.r;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `rgba(237,73,47,${orb.opacity})`,
              filter: "blur(80px)",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Additional corner glow */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "rgba(237,73,47,0.14)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(237,73,47,0.1)",
          filter: "blur(90px)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: gridOpacity,
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
          padding: "0 200px",
          gap: 0,
          textAlign: "center",
        }}
      >
        {/* Tag */}
        <div
          style={{
            opacity: tagOpacity,
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{ width: 24, height: 1, background: "rgba(237,73,47,0.8)" }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#ED492F",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Conversemos
          </span>
          <div
            style={{ width: 24, height: 1, background: "rgba(237,73,47,0.8)" }}
          />
        </div>

        {/* Main headline */}
        <div
          style={{
            opacity: h2Opacity,
            transform: `translateY(${h2Y}px)`,
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            ¿Tu organización está lista
            <br />
            para el{" "}
            <span
              style={{
                color: "#ED492F",
                textShadow: "0 0 40px rgba(237,73,47,0.45)",
              }}
            >
              siguiente nivel
            </span>
            ?
          </h2>
        </div>

        {/* Subtitle */}
        <p
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            margin: "0 0 40px",
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            maxWidth: 600,
          }}
        >
          Somos cuatro personas con criterio técnico y visión clara. Sin
          presentaciones largas: hablemos sobre lo que podemos construir juntos.
        </p>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${0.7 + ctaScale * 0.3})`,
            marginBottom: 32,
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#ED492F",
              color: "white",
              fontWeight: 700,
              fontSize: 16,
              padding: "16px 40px",
              borderRadius: 18,
              boxShadow: `0 0 ${60 * ctaGlow}px rgba(237,73,47,0.5), 0 8px 32px rgba(237,73,47,0.35)`,
            }}
          >
            Solicitar una conversación
            <span style={{ fontSize: 18 }}>→</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
              fontSize: 14,
              padding: "16px 20px",
              borderRadius: 14,
            }}
          >
            Ver casos y recursos
          </div>
        </div>

        {/* Note */}
        <p
          style={{
            opacity: noteOpacity,
            margin: 0,
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Sin compromisos. Sin presentaciones largas. Solo una conversación
          honesta.
        </p>
      </div>
    </AbsoluteFill>
  );
};
