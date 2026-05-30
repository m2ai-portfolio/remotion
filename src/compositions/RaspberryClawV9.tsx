import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";

export const FPS = 30;
export const WIDTH = 1518;
export const HEIGHT = 1380;

// V9 changes from V8:
//   - Ambient background music ("Circuit Blue") at volume 0.08 across full timeline
//   - Track is 189s (no loop needed; V9 only consumes ~115.4s)
//   - Same cuts, narration, and intro overlay as V8

const XFADE = 15;

const NARRATION_INTRO_DUR = Math.round(84.85 * 30); // 2546 frames
const NARRATION_OUTRO_DUR = Math.round(12.93 * 30); // 388 frames

const INTRO_OVERLAY_DUR = 30 * 20;

const FadeInVideo: React.FC<{
  src: string;
  startFrom: number;
  playbackRate?: number;
  muted?: boolean;
  fadeFrames: number;
}> = ({ src, startFrom, playbackRate = 1, muted = false, fadeFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeFrames], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <OffthreadVideo
        src={src}
        startFrom={startFrom}
        playbackRate={playbackRate}
        muted={muted}
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
      />
    </AbsoluteFill>
  );
};

type Seg = {
  id: string;
  from: number;
  startFrom: number;
  durationInFrames: number;
  playbackRate?: number;
  muted?: boolean;
  fade?: boolean;
};

// V8 timeline (3461 frames total = 115.37s @ 30fps) — same as V7:
//   subA1            V8 [   0,  488)  src [   0,  488) 1x
//   subA2            V8 [ 488,  521)  src [ 544,  577) 1x
//   subB1            V8 [ 521, 1500)  src [1176, 2155) 1x   — Cut A boundary
//   subC1a           V8 [1500, 2640)  src [2664, 3804) 1x   — Cut C boundary
//   fast2x_pre_post  V8 [2640, 2766)  src [4876, 5128) 2x   — fade-in
//   fast2x_post      V8 [2766, 3461)  src [5960, 7350) 2x   — Cut B boundary; recap section
const SEGMENTS: readonly Seg[] = [
  { id: "subA1",            from: 0,    startFrom: 0,    durationInFrames: 488,  muted: true },
  { id: "subA2",            from: 488,  startFrom: 544,  durationInFrames: 33,   muted: true },
  { id: "subB1",            from: 521,  startFrom: 1176, durationInFrames: 979,  muted: true },
  { id: "subC1a",           from: 1500, startFrom: 2664, durationInFrames: 1140, muted: true },
  { id: "fast2x_pre_post",  from: 2640, startFrom: 4876, durationInFrames: 126,  playbackRate: 2, muted: true, fade: true },
  { id: "fast2x_post",      from: 2766, startFrom: 5960, durationInFrames: 695,  playbackRate: 2, muted: true },
];

const NARRATION_OUTRO_FRAME = 2766;

export const TOTAL_FRAMES =
  SEGMENTS[SEGMENTS.length - 1].from +
  SEGMENTS[SEGMENTS.length - 1].durationInFrames;

const MIN_REQS: readonly string[] = [
  "Node.js 18 or newer",
  "4 GB RAM (8 GB recommended)",
  "~2 GB free disk",
  "Linux, macOS, or Windows",
  "Internet connection",
  "Telegram Bot Token + Chat ID",
];

const PI_STATS: readonly [string, string][] = [
  ["SoC", "Broadcom BCM2712"],
  ["CPU", "Quad-core Cortex-A76 @ 2.4 GHz"],
  ["RAM", "8 GB LPDDR4X-4267"],
  ["GPU", "VideoCore VII"],
  ["Network", "GbE + Wi-Fi 6 + BT 5.0"],
  ["USB", "2 x USB 3.0, 2 x USB 2.0"],
  ["Power", "5V/5A USB-C (~15W max)"],
];

const IntroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const slideIn = interpolate(frame, [0, 18], [120, 0], {
    extrapolateRight: "clamp",
  });
  const slideOut = interpolate(
    frame,
    [INTRO_OVERLAY_DUR - 18, INTRO_OVERLAY_DUR],
    [0, 120],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = interpolate(
    frame,
    [0, 12, INTRO_OVERLAY_DUR - 12, INTRO_OVERLAY_DUR],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const transform = `translateX(${slideIn + slideOut}%)`;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          right: "3%",
          top: "4%",
          width: "40%",
          height: "92%",
          background: "rgba(13, 17, 23, 0.93)",
          border: "2px solid rgba(255,255,255,0.10)",
          borderRadius: 28,
          padding: "44px 40px",
          color: "white",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          transform,
          opacity,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              opacity: 0.55,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            ClaudeClaw
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.1 }}>
            Minimum Requirements
          </div>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: 26,
            lineHeight: 1.6,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {MIN_REQS.map((r) => (
            <li
              key={r}
              style={{ display: "flex", alignItems: "baseline", gap: 14 }}
            >
              <span style={{ color: "#7ee787", fontSize: 22 }}>{"▸"}</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 700 }}>
            Tested on Raspberry Pi 5 (8 GB)
          </div>

          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "42%",
                aspectRatio: "1 / 1",
                background: "white",
                borderRadius: 16,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Img
                src={staticFile("assets/rpi5.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <table
              style={{
                flex: 1,
                fontSize: 19,
                lineHeight: 1.45,
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                {PI_STATS.map(([k, v]) => (
                  <tr key={k}>
                    <td
                      style={{
                        opacity: 0.6,
                        verticalAlign: "top",
                        paddingRight: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {k}
                    </td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const RaspberryClawV9: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {SEGMENTS.map((s) => (
      <Sequence
        key={s.id}
        from={s.from}
        durationInFrames={s.durationInFrames}
        name={s.id}
      >
        {s.fade ? (
          <FadeInVideo
            src={staticFile("clips/RaspberryClaw_trimmed.mp4")}
            startFrom={s.startFrom}
            playbackRate={s.playbackRate ?? 1}
            muted={s.muted ?? false}
            fadeFrames={XFADE}
          />
        ) : (
          <OffthreadVideo
            src={staticFile("clips/RaspberryClaw_trimmed.mp4")}
            startFrom={s.startFrom}
            playbackRate={s.playbackRate ?? 1}
            muted={s.muted ?? false}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        )}
      </Sequence>
    ))}

    <Sequence from={0} durationInFrames={INTRO_OVERLAY_DUR} name="intro-overlay">
      <IntroOverlay />
    </Sequence>

    <Sequence from={0} durationInFrames={NARRATION_INTRO_DUR} name="narration-intro">
      <Audio src={staticFile("audio/narration_intro_v3a.mp3")} />
    </Sequence>

    <Sequence
      from={NARRATION_OUTRO_FRAME}
      durationInFrames={NARRATION_OUTRO_DUR}
      name="narration-outro"
    >
      <Audio src={staticFile("audio/narration_outro_v3a.mp3")} />
    </Sequence>

    <Sequence from={0} durationInFrames={TOTAL_FRAMES} name="bg-music">
      <Audio src={staticFile("audio/circuit_blue.mp3")} volume={0.08} />
    </Sequence>
  </AbsoluteFill>
);
