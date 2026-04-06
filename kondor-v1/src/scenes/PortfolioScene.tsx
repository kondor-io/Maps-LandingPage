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

const PRODUCTS = [
  {
    name: "Kondor Core",
    tagline: "Gestión operativa de base",
    description:
      "Plataforma central de gestión operativa para organizaciones en crecimiento. Estructura, visibilidad y control en un único sistema.",
    status: "En producción",
    statusBg: "rgba(16,185,129,0.12)",
    statusBorder: "rgba(52,211,153,0.25)",
    statusColor: "rgba(167,243,208,0.95)",
  },
  {
    name: "Kondor Flow",
    tagline: "Automatización de procesos",
    description:
      "Sistema de automatización de flujos operativos diseñado para organizaciones con procesos complejos de gestión y seguimiento.",
    status: "En producción",
    statusBg: "rgba(16,185,129,0.12)",
    statusBorder: "rgba(52,211,153,0.25)",
    statusColor: "rgba(167,243,208,0.95)",
    highlight: true,
  },
  {
    name: "Kondor Lens",
    tagline: "Trazabilidad y auditoría",
    description:
      "Módulo de trazabilidad y auditoría para equipos distribuidos. Registro completo de operaciones con criterio de ingeniería.",
    status: "En desarrollo",
    statusBg: "rgba(14,165,233,0.12)",
    statusBorder: "rgba(56,189,248,0.25)",
    statusColor: "rgba(186,230,253,0.95)",
  },
];

// SVG connector paths
const CONNECTOR_PATHS = [
  "M 0 28 Q 50 6 100 28",
  "M 0 10 Q 50 32 100 10",
];

function Connector({
  index,
  pathProgress,
  pulseOffset,
}: {
  index: number;
  pathProgress: number;
  pulseOffset: number;
}) {
  const d = CONNECTOR_PATHS[index % 2];
  const dashTotal = 100;
  const drawnLength = pathProgress * dashTotal;

  // Pulse animation
  const pulseDash = 12;
  const pulseGap = dashTotal - pulseDash;
  const pulsePos = pulseOffset % dashTotal;

  return (
    <svg
      viewBox="0 0 100 40"
      style={{ width: 160, height: 60, overflow: "visible" }}
      preserveAspectRatio="none"
    >
      {/* Aura glow */}
      <path
        d={d}
        fill="none"
        stroke="#ED492F"
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity={0.08 * pathProgress}
      />
      {/* Dashed guide */}
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 10"
        strokeOpacity={pathProgress}
      />
      {/* Main line — drawn progressively via dashoffset */}
      <path
        d={d}
        fill="none"
        stroke="#ED492F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={`${drawnLength} ${dashTotal - drawnLength}`}
        strokeDashoffset="0"
        strokeOpacity={0.75}
        style={{
          filter:
            "drop-shadow(0 0 4px rgba(237,73,47,0.6)) drop-shadow(0 0 8px rgba(237,73,47,0.3))",
        }}
      />
      {/* Traveling pulse */}
      {pathProgress > 0.5 && (
        <path
          d={d}
          fill="none"
          stroke="rgba(255,252,250,0.9)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${pulseDash} ${pulseGap}`}
          strokeDashoffset={-pulsePos}
          style={{
            filter:
              "drop-shadow(0 0 5px rgba(255,255,255,0.5)) drop-shadow(0 0 10px rgba(237,73,47,0.7))",
          }}
        />
      )}
    </svg>
  );
}

export const PortfolioScene: React.FC = () => {
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

  // Node springs — each one enters sequentially
  const nodeAnimations = PRODUCTS.map((_, i) => {
    const delay = fps * (0.7 + i * 0.4);
    const s = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
      durationInFrames: fps * 0.8,
    });
    return {
      scale: interpolate(s, [0, 1], [0.6, 1]),
      opacity: interpolate(s, [0, 1], [0, 1]),
    };
  });

  // Connector paths drawn progressively
  const connectorProgress = [0, 1].map((i) => {
    return interpolate(
      frame,
      [fps * (1.1 + i * 0.4), fps * (1.7 + i * 0.4)],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  });

  // Pulse offset for connectors
  const pulseOffset = interpolate(frame, [0, fps * 2.4], [0, 100], {
    extrapolateRight: "extend",
  });

  // Detail panel
  const detailOpacity = interpolate(frame, [fps * 2.0, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Active product index cycles through automatically
  const activeIndex = Math.min(
    Math.floor(
      interpolate(frame, [fps * 1.5, fps * 8], [0, 3], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    ),
    2
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent, rgba(0,0,0,0.12), transparent)",
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(237,73,47,0.35), transparent)",
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
        {/* Header */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 52,
            gap: 40,
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
                style={{ width: 32, height: 1, background: "rgba(255,255,255,0.4)" }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Portfolio
              </span>
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 52,
                fontWeight: 900,
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Hoja de ruta
              <br />
              <span style={{ color: "#ED492F" }}>de nuestros sistemas.</span>
            </h2>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: 380,
              textAlign: "right",
            }}
          >
            Recorrido del ecosistema: cada producto representa una capa del
            sistema operativo de tu organización.
          </p>
        </div>

        {/* Roadmap row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            marginBottom: 32,
          }}
        >
          {PRODUCTS.map((product, i) => {
            const { scale, opacity } = nodeAnimations[i];
            const isActive = activeIndex === i;
            return (
              <div
                key={product.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Node */}
                <div
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 200,
                    padding: "24px 20px",
                    borderRadius: 20,
                    border: isActive
                      ? "1px solid rgba(237,73,47,0.55)"
                      : product.highlight
                      ? "1px solid rgba(237,73,47,0.25)"
                      : "1px solid rgba(255,255,255,0.1)",
                    background: isActive
                      ? "rgba(237,73,47,0.1)"
                      : "rgba(255,255,255,0.04)",
                    position: "relative",
                    textAlign: "center",
                    boxShadow: isActive
                      ? "0 0 40px rgba(237,73,47,0.15)"
                      : "none",
                  }}
                >
                  {/* Top highlight for featured */}
                  {product.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 20,
                        right: 20,
                        height: 2,
                        borderRadius: 2,
                        background:
                          "linear-gradient(90deg, transparent, #ED492F, transparent)",
                        opacity: 0.8,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      border: isActive
                        ? "1px solid rgba(237,73,47,0.4)"
                        : "1px solid rgba(255,255,255,0.1)",
                      background: isActive
                        ? "rgba(237,73,47,0.15)"
                        : "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                      fontSize: 22,
                    }}
                  >
                    {i === 0 ? "◈" : i === 1 ? "⟁" : "◉"}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 4px",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "white",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 12px",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {product.tagline}
                  </p>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "4px 10px",
                      borderRadius: 8,
                      background: product.statusBg,
                      border: `1px solid ${product.statusBorder}`,
                      color: product.statusColor,
                    }}
                  >
                    {product.status}
                  </span>
                </div>

                {/* Connector */}
                {i < PRODUCTS.length - 1 && (
                  <Connector
                    index={i}
                    pathProgress={connectorProgress[i]}
                    pulseOffset={pulseOffset + i * 33}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          style={{
            opacity: detailOpacity,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            padding: "20px 28px",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 10,
              fontFamily: "monospace",
              color: "rgba(237,73,47,0.8)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {PRODUCTS[activeIndex].name}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
            }}
          >
            {PRODUCTS[activeIndex].description}
          </p>
        </div>

        <p
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            opacity: detailOpacity,
          }}
        >
          Más sistemas en desarrollo. Hablá con el equipo para conocer la hoja
          de ruta completa.
        </p>
      </div>
    </AbsoluteFill>
  );
};
