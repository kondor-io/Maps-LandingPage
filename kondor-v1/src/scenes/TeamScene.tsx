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
  weights: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

const TEAM = [
  { id: "K-01", name: "Lucas", role: "Co-Fundador", img: staticFile("lucas.jpg") },
  { id: "K-02", name: "Joaquín", role: "Co-Fundador", img: staticFile("joaco.jfif") },
  { id: "K-03", name: "Nicolás", role: "Co-Fundador", img: staticFile("Nico.jfif") },
  { id: "K-04", name: "Santiago", role: "Co-Fundador", img: staticFile("santi.jfif") },
];

export const TeamScene: React.FC = () => {
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

  // Header
  const headerOpacity = interpolate(frame, [fps * 0.2, fps * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(frame, [fps * 0.2, fps * 0.8], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card animations — staggered spring entrance
  const cardAnimations = TEAM.map((_, i) => {
    const delay = fps * (0.6 + i * 0.2);
    const s = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
      durationInFrames: fps * 0.9,
    });
    return {
      y: interpolate(s, [0, 1], [80, 0]),
      opacity: interpolate(s, [0, 1], [0, 1]),
      scale: interpolate(s, [0, 1], [0.9, 1]),
    };
  });

  // Reveal gradient for overlay — builds up after cards are visible
  const overlayReveal = interpolate(frame, [fps * 1.8, fps * 2.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Status indicator pulse
  const pulseFrac = (frame % (fps * 2)) / (fps * 2);
  const pulseScale = interpolate(pulseFrac, [0, 0.5, 1], [1, 1.5, 1]);

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

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 500,
          borderRadius: "50%",
          background: "rgba(237,73,47,0.06)",
          filter: "blur(120px)",
          transform: "translate(-50%, -50%)",
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
          gap: 48,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{ width: 32, height: 1, background: "rgba(237,73,47,0.7)" }}
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
                Kondor Team
              </span>
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 56,
                fontWeight: 900,
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Las mentes detrás
              <br />
              <span style={{ color: "#ED492F" }}>del despegue.</span>
            </h2>
          </div>

          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 10,
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: headerOpacity,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#ED492F",
                transform: `scale(${pulseScale})`,
                boxShadow: "0 0 8px rgba(237,73,47,0.8)",
              }}
            />
            4 tripulantes · equipo activo
          </div>
        </div>

        {/* Team grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {TEAM.map(({ id, name, role, img }, i) => {
            const { y, opacity, scale } = cardAnimations[i];
            return (
              <div
                key={id}
                style={{
                  opacity,
                  transform: `translateY(${y}px) scale(${scale})`,
                  position: "relative",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.09)",
                  aspectRatio: "3/4",
                }}
              >
                {/* ID badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    zIndex: 10,
                    fontSize: 9,
                    fontFamily: "monospace",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.18em",
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 6,
                    padding: "3px 8px",
                  }}
                >
                  {id}
                </div>

                {/* Photo */}
                <Img
                  src={img}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: `grayscale(${interpolate(
                      overlayReveal,
                      [0, 1],
                      [40, 0]
                    )}%)`,
                  }}
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "60px 20px 20px",
                    background:
                      "linear-gradient(to top, rgba(20,20,28,0.97) 55%, transparent 100%)",
                    opacity: overlayReveal,
                  }}
                >
                  <div
                    style={{
                      width: interpolate(overlayReveal, [0, 1], [0, 24]),
                      height: 1,
                      background: "rgba(237,73,47,0.6)",
                      marginBottom: 10,
                    }}
                  />
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: 20,
                      fontWeight: 900,
                      color: "white",
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 10,
                      fontWeight: 600,
                      color: "rgba(237,73,47,0.8)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {role}
                  </p>
                </div>

                {/* Top accent line on hover (static reveal) */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                      "linear-gradient(90deg, transparent, #ED492F, transparent)",
                    opacity: overlayReveal * 0.8,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
