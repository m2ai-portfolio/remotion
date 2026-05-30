import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";

export const FPS = 30;
export const WIDTH = 1518;
export const HEIGHT = 1380;

// Source: RaspberryClaw_trimmed.mp4 (245.0s, 30fps).
// V3 edits:
//   - cut 00:19.24 - 00:39.20 (dead air in intro)
//   - cut 01:19.04 - 01:21.00 (dead air in intro)
//   - cut 02:21.04 - 02:36.04 (large gap, original ask)
//   - 2x speed 02:38 - 03:20 (audio missing here, muted)
//   - end at 03:45 (truncate)
//   - drop the 1.96s "bridge" segment that caused flicker
//   - 15-frame (0.5s) crossfades at speed-change boundaries

const XFADE = 15;

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
  from: number;                 // timeline frame
  startFrom: number;            // source frame
  durationInFrames: number;
  playbackRate?: number;
  muted?: boolean;
  fade?: boolean;
};

// subA: 0 - 19.24s     -> dur 577
// subB: 39.20 - 79.04s -> dur 1195
// subC: 81.00 - 141.04s -> dur 1801
// fast2x: 158 - 200s @ 2x -> timeline 630, overlaps subC by XFADE
// outro: 200 - 225s -> timeline 750, overlaps fast2x by XFADE
const SEGMENTS: readonly Seg[] = [
  { id: "subA",   from: 0,    startFrom: 0,    durationInFrames: 577 },
  { id: "subB",   from: 577,  startFrom: 1176, durationInFrames: 1195 },
  { id: "subC",   from: 1772, startFrom: 2430, durationInFrames: 1801 },
  { id: "fast2x", from: 3573 - XFADE, startFrom: 4740, durationInFrames: 630, playbackRate: 2, muted: true, fade: true },
  { id: "outro",  from: 4188 - XFADE, startFrom: 6000, durationInFrames: 750,  muted: true, fade: true },
];

export const TOTAL_FRAMES =
  SEGMENTS[SEGMENTS.length - 1].from +
  SEGMENTS[SEGMENTS.length - 1].durationInFrames;

export const RaspberryClawV3: React.FC = () => (
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
  </AbsoluteFill>
);
