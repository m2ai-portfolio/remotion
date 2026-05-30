import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";

export const FPS = 30;
export const WIDTH = 1518;
export const HEIGHT = 1380;

// Generated from silencedetect (-30dB / 1.5s) on the original 959.5s recording.
// Each segment maps to a slice of the source video; edit start_from / duration_in_frames
// to fine-tune cuts, then re-render with: npx remotion render RaspberryClaw out.mp4

type Seg = { id: number; startFrom: number; durationInFrames: number };

const SEGMENTS: readonly Seg[] = [
  { id: 1, startFrom: 0, durationInFrames: 1110 },
  { id: 2, startFrom: 1196, durationInFrames: 70 },
  { id: 3, startFrom: 1302, durationInFrames: 349 },
  { id: 4, startFrom: 1761, durationInFrames: 281 },
  { id: 5, startFrom: 2099, durationInFrames: 255 },
  { id: 6, startFrom: 2453, durationInFrames: 48 },
  { id: 7, startFrom: 2601, durationInFrames: 29 },
  { id: 8, startFrom: 2695, durationInFrames: 144 },
  { id: 9, startFrom: 2875, durationInFrames: 195 },
  { id: 10, startFrom: 3120, durationInFrames: 233 },
  { id: 11, startFrom: 5943, durationInFrames: 69 },
  { id: 12, startFrom: 6552, durationInFrames: 18 },
  { id: 13, startFrom: 6609, durationInFrames: 19 },
  { id: 14, startFrom: 6787, durationInFrames: 58 },
  { id: 15, startFrom: 7086, durationInFrames: 34 },
  { id: 16, startFrom: 8605, durationInFrames: 76 },
  { id: 17, startFrom: 8743, durationInFrames: 34 },
  { id: 18, startFrom: 9503, durationInFrames: 305 },
  { id: 19, startFrom: 9860, durationInFrames: 133 },
  { id: 20, startFrom: 10093, durationInFrames: 98 },
  { id: 21, startFrom: 12989, durationInFrames: 15 },
  { id: 22, startFrom: 13459, durationInFrames: 15 },
  { id: 23, startFrom: 13571, durationInFrames: 16 },
  { id: 24, startFrom: 14953, durationInFrames: 15 },
  { id: 25, startFrom: 19765, durationInFrames: 16 },
  { id: 26, startFrom: 20726, durationInFrames: 42 },
  { id: 27, startFrom: 20813, durationInFrames: 92 },
  { id: 28, startFrom: 20943, durationInFrames: 32 },
  { id: 29, startFrom: 21006, durationInFrames: 111 },
  { id: 30, startFrom: 21153, durationInFrames: 15 },
  { id: 31, startFrom: 21851, durationInFrames: 118 },
  { id: 32, startFrom: 22200, durationInFrames: 40 },
  { id: 33, startFrom: 22558, durationInFrames: 15 },
  { id: 34, startFrom: 22640, durationInFrames: 52 },
  { id: 35, startFrom: 22897, durationInFrames: 59 },
  { id: 36, startFrom: 23340, durationInFrames: 49 },
  { id: 37, startFrom: 23462, durationInFrames: 67 },
  { id: 38, startFrom: 23616, durationInFrames: 15 },
  { id: 39, startFrom: 24643, durationInFrames: 18 },
  { id: 40, startFrom: 24702, durationInFrames: 15 },
  { id: 41, startFrom: 24792, durationInFrames: 15 },
  { id: 42, startFrom: 24862, durationInFrames: 15 },
  { id: 43, startFrom: 24912, durationInFrames: 159 },
  { id: 44, startFrom: 25103, durationInFrames: 18 },
  { id: 45, startFrom: 25364, durationInFrames: 43 },
  { id: 46, startFrom: 25696, durationInFrames: 61 },
  { id: 47, startFrom: 25969, durationInFrames: 61 },
  { id: 48, startFrom: 26182, durationInFrames: 2604 },
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

export const RaspberryClaw: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {TIMELINE.map((s) => (
      <Sequence
        key={s.id}
        from={s.from}
        durationInFrames={s.durationInFrames}
        name={`seg-${s.id}`}
      >
        <OffthreadVideo
          src={staticFile("clips/RaspberryClaw.mp4")}
          startFrom={s.startFrom}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Sequence>
    ))}
  </AbsoluteFill>
);
