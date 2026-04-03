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

const CARDS = [
  {
    icon: "◎",
    title: "Quiénes somos",
    body: "Una arquitectura de pensamiento digital diseñada para la anticipación absoluta.",
    accent: false,
  },
  {
    icon: "⚡",
    title: "Qué hacemos",
    body: "Decodificamos la complejidad para devolver simplicidad operativa y autonomía total.",
    accent: true,
  },
  {
    icon: "◎",
    title: "Qué obtienes",
    body: "Sistemas que aprenden y procesos que se superan a sí mismos por diseño.",
    accent: false,
  },
];

export const AboutScene: React.FC = () => {
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

  // Section header
  const headerY = interpolate(frame, [fps * 0.2, fps * 0.8], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerOpacity = interpolate(frame, [fps * 0.2, fps * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cards spring entrance
  const cardAnimations = CARDS.map((_, i) => {
    const delay = fps * (0.7 + i * 0.22);
    const cardSpring = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
      durationInFrames: fps * 0.8,
    });
    const y = interpolate(cardSpring, [0, 1], [60, 0]);
    const opacity = interpolate(cardSpring, [0, 1], [0, 1]);
    return { y, opacity };
  });

  // Accent line width animation for featured card
  const accentLineWidth = interpolate(
    frame,
    [fps * 1.2, fps * 1.8],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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

      {/* Top edge line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 120px",
        }}
      >
        {/* Section header */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            marginBottom: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: "rgba(237,73,47,0.7)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#ED492F",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Nuestra identidad
            </span>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 900,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Más que una empresa de software,
            <br />
            <span style={{ color: "#ED492F" }}>un ecosistema de criterio.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
          }}
        >
          {CARDS.map(({ title, body, accent }, i) => {
            const { y, opacity } = cardAnimations[i];
            return (
              <div
                key={title}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  position: "relative",
                  borderRadius: 20,
                  border: accent
                    ? "1px solid rgba(237,73,47,0.35)"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: accent
                    ? "rgba(237,73,47,0.08)"
                    : "rgba(255,255,255,0.05)",
                  padding: "36px 32px",
                  overflow: "hidden",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 2,
                    width: accent ? `${accentLineWidth}%` : "0%",
                    background:
                      "linear-gradient(90deg, rgba(237,73,47,0.4), #ED492F, rgba(237,73,47,0.4))",
                  }}
                />

                {/* Icon placeholder */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: accent
                      ? "rgba(237,73,47,0.2)"
                      : "rgba(255,255,255,0.07)",
                    border: accent
                      ? "1px solid rgba(237,73,47,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                    fontSize: 20,
                    color: accent ? "#ED492F" : "rgba(255,255,255,0.75)",
                  }}
                >
                  {i === 0 ? "◎" : i === 1 ? "⚡" : "◎"}
                </div>

                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.65,
                  }}
                >
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
