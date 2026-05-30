import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";

export const FPS = 30;
export const WIDTH = 1518;
export const HEIGHT = 1380;

// Source: RaspberryClaw_trimmed.mp4 (245.0s, 30fps).
// Edits requested:
//   - cut 02:21.04 - 02:36.04 (15s removed)
//   - 2x speed from 02:38 - 03:20 (audio is missing in this range, so it's muted)
//   - normal speed 03:20 - 03:45
//   - end at 03:45

type Seg = {
  id: string;
  startFrom: number;          // source frame
  durationInFrames: number;   // timeline frames
  playbackRate?: number;
  muted?: boolean;
};

const SEGMENTS: readonly Seg[] = [
  // 0:00 -> 2:21.04 normal w/ audio
  { id: "intro",    startFrom: 0,    durationInFrames: 4231 },
  // (2:21.04 - 2:36.04 cut)
  // 2:36.04 -> 2:38 normal w/ audio
  { id: "bridge",   startFrom: 4681, durationInFrames: 59 },
  // 2:38 -> 3:20 at 2x (no audio in source from 2:38; muted to be safe)
  { id: "fast2x",   startFrom: 4740, durationInFrames: 630, playbackRate: 2, muted: true },
  // 3:20 -> 3:45 normal
  { id: "outro",    startFrom: 6000, durationInFrames: 750, muted: true },
];

const TIMELINE = (() => {
  let offset = 0;
  return SEGMENTS.map((s) => {
    const t = { ...s, from: offset };
    offset += s.durationInFrames;
    return t;
  });
})();

export const TOTAL_FRAMES = TIMELINE.reduce(
  (sum, s) => sum + s.durationInFrames,
  0,
);

export const RaspberryClawV2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {TIMELINE.map((s) => (
      <Sequence
        key={s.id}
        from={s.from}
        durationInFrames={s.durationInFrames}
        name={s.id}
      >
        <OffthreadVideo
          src={staticFile("clips/RaspberryClaw_trimmed.mp4")}
          startFrom={s.startFrom}
          playbackRate={s.playbackRate ?? 1}
          muted={s.muted ?? false}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Sequence>
    ))}
  </AbsoluteFill>
);
