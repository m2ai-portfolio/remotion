import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";

const FPS = 24;

// Source clips: all 864x496 @ 24fps, h264 + AAC.
// Output: 1920x1080 with slight horizontal pillarbox (source aspect 1.742, target 1.778).
// Clip 6 trims the first 3 seconds (3 * 24 = 72 source frames).

type ClipSpec = {
  name: string;
  file: string;
  durationInFrames: number;
  startFrom: number;
};

const CLIPS: readonly ClipSpec[] = [
  { name: "clip1-hike-reveal",       file: "clip1.mp4",            durationInFrames: 241, startFrom: 0 },
  { name: "clip2-porch-entry",       file: "clip2.mp4",            durationInFrames: 241, startFrom: 0 },
  { name: "clip3-interior-noise",    file: "clip3.mp4",            durationInFrames: 241, startFrom: 0 },
  { name: "clip4-basement-decision", file: "clip4.mp4",            durationInFrames: 314, startFrom: 0 },
  { name: "clip5-bigbad-shrug",      file: "clip5.mp4",            durationInFrames: 314, startFrom: 0 },
  { name: "clip6-shout-advance",     file: "clip6_needs_cut.mp4",  durationInFrames: 242, startFrom: 72 },
  { name: "clip7-stacey-searching",  file: "clip7.mp4",            durationInFrames: 169, startFrom: 0 },
  { name: "clip8-gran-turismo",      file: "clip8.mp4",            durationInFrames: 362, startFrom: 0 },
];

const SEQUENCES = (() => {
  let offset = 0;
  return CLIPS.map((c) => {
    const seq = { ...c, from: offset };
    offset += c.durationInFrames;
    return seq;
  });
})();

export const TOTAL_FRAMES = SEQUENCES.reduce(
  (sum, s) => sum + s.durationInFrames,
  0,
); // 2124 frames @ 24fps = 88.5s

export { FPS };

export const HorrorRomcom: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {SEQUENCES.map((s) => (
      <Sequence
        key={s.name}
        from={s.from}
        durationInFrames={s.durationInFrames}
        name={s.name}
      >
        <OffthreadVideo
          src={staticFile(`clips/horror-romcom/${s.file}`)}
          startFrom={s.startFrom}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Sequence>
    ))}
  </AbsoluteFill>
);
