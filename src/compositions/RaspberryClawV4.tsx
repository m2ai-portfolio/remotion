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

// V4 edits (cumulative on the trimmed mp4):
//   - cut 00:16.25 - 00:18.13 (new)
//   - cut 00:19.24 - 00:39.20 (V3)
//   - cut 00:59.00 - 01:00.00 (new, spans subB/subC boundary)
//   - cut 01:19.04 - 01:21.00 (V3)
//   - cut 02:21.04 - 02:36.04 (V2)
//   - 2x speed 02:38 - 03:20 (muted, audio missing in source)
//   - end at 03:45 (truncate)
//   - 0.5s opacity crossfades at speed boundaries
//   - intro overlay (specs + RPi 5 image) for first 20s
//   - voice narration overlay at 2:00 (hg-voice1.wav, 6.9s)

const XFADE = 15;
const NARRATION_FRAME = 30 * 120; // 2:00 timeline
const NARRATION_DUR = Math.round(6.92 * 30);
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

// newSubA1: src 0 - 16.25     -> dur 488
// newSubA2: src 18.13 - 19.24 -> dur 33
// newSubB:  src 39.20 - 78.97 -> dur 1193
// newSubC:  src 81.93 - 141.04 -> dur 1773
// fast2x:   src 158 - 200 @ 2x -> timeline 630, overlaps subC by XFADE
// outro:    src 200 - 225      -> timeline 750, overlaps fast2x by XFADE
const SEGMENTS: readonly Seg[] = [
  { id: "subA1",  from: 0,    startFrom: 0,    durationInFrames: 488 },
  { id: "subA2",  from: 488,  startFrom: 544,  durationInFrames: 33 },
  { id: "subB",   from: 521,  startFrom: 1176, durationInFrames: 1193 },
  { id: "subC",   from: 1714, startFrom: 2458, durationInFrames: 1773 },
  { id: "fast2x", from: 3487 - XFADE, startFrom: 4740, durationInFrames: 630, playbackRate: 2, muted: true, fade: true },
  { id: "outro",  from: 4102 - XFADE, startFrom: 6000, durationInFrames: 750, muted: true, fade: true },
];

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
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
              }}
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

export const RaspberryClawV4: React.FC = () => (
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

    <Sequence
      from={NARRATION_FRAME}
      durationInFrames={NARRATION_DUR}
      name="narration"
    >
      <Audio src={staticFile("audio/hg-voice1.wav")} />
    </Sequence>
  </AbsoluteFill>
);
