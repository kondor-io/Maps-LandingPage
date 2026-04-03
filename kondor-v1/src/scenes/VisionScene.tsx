import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const PILLARS = [
  {
    title: "Ingeniería de criterio",
    body: "Cada sistema se diseña y construye con buenas prácticas, sin atajos. Aplicamos estándares de ingeniería reales en cada capa del producto.",
  },
  {
    title: "Marca madre",
    body: "Kondor es la empresa detrás de distintos productos y verticales. No somos un solo producto: somos la plataforma que los hace posibles.",
  },
  {
    title: "Evolución continua",
    body: "Acompañamos a las organizaciones en su transformación tecnológica para que puedan operar con el nivel de una gran corporación.",
  },
];

export const VisionScene: React.FC = () => {
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

  // Right subtitle
  const subOpacity = interpolate(frame, [fps * 0.6, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pillar animations
  const pillarAnimations = PILLARS.map((_, i) => {
    const delay = fps * (0.8 + i * 0.22);
    const s = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
      durationInFrames: fps * 0.8,
    });
    return {
      y: interpolate(s, [0, 1], [50, 0]),
      opacity: interpolate(s, [0, 1], [0, 1]),
    };
  });

  // Bottom divider
  const dividerOpacity = interpolate(frame, [fps * 2.0, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent bottom line width
  const accentLineWidth = interpolate(frame, [fps * 0.5, fps * 1.5], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
            "linear-gradient(135deg, rgba(237,73,47,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: `${accentLineWidth}%`,
          background:
            "linear-gradient(90deg, transparent, rgba(237,73,47,0.4), transparent)",
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
        {/* Header row */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
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
                style={{ width: 32, height: 1, background: "#ED492F" }}
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
                Nuestra visión
              </span>
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 60,
                fontWeight: 900,
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Tecnología real,
              <br />
              construida con{" "}
              <span style={{ color: "#ED492F" }}>rigor</span>.
            </h2>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              maxWidth: 360,
              textAlign: "right",
              opacity: subOpacity,
            }}
          >
            Somos cuatro personas con criterio técnico claro. Creamos sistemas
            para que las medianas organizaciones puedan operar como grandes
            corporaciones.
          </p>
        </div>

        {/* Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
          }}
        >
          {PILLARS.map(({ title, body }, i) => {
            const { y, opacity } = pillarAnimations[i];
            return (
              <div
                key={title}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  position: "relative",
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  padding: "36px 32px",
                  overflow: "hidden",
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(237,73,47,0.15)",
                    border: "1px solid rgba(237,73,47,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                    fontSize: 20,
                    color: "#ED492F",
                  }}
                >
                  {i === 0 ? "⬡" : i === 1 ? "⬢" : "↑"}
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
                    fontSize: 14,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                  }}
                >
                  {body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div
          style={{
            opacity: dividerOpacity,
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            Nuestro foco inicial son las agencias de productores de seguros,
            pero nuestra visión es más amplia: cualquier organización que
            quiera dar el salto tecnológico.
          </p>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#ED492F",
              letterSpacing: "0.02em",
            }}
          >
            Ver nuestros sistemas →
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
