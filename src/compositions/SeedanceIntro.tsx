import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile } from "remotion";

const FPS = 25;

// Source: intro_v6.mp4 (23s, 1920x1080, 25fps)
// Cut: remove 0:06-0:07 (brick-house Corvette shot)
const SEG_A_END = 6 * FPS;          // frame 150 — keep 0-6s
const SEG_B_START = 7 * FPS;        // frame 175 — resume at 7s
const SEG_B_END = 23 * FPS;         // frame 575 — original end
const SEG_B_FRAMES = SEG_B_END - SEG_B_START; // 400 frames = 16s
export const TOTAL_FRAMES = SEG_A_END + SEG_B_FRAMES; // 550 frames = 22s

// Badge: dark scrim + M2AI logo, sized to cover the HeyGen watermark blur
// Blur region measured at (1440,800)-(1780,960); badge positioned to cover it
const BADGE = { x: 1310, y: 811, w: 600, h: 137 };

const M2AIBadge: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: BADGE.x,
      top: BADGE.y,
      width: BADGE.w,
      height: BADGE.h,
      backgroundColor: "rgba(0,0,0,0.65)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Img
      src={staticFile("assets/m2ai-logo-transparent.png")}
      style={{ width: BADGE.w, height: BADGE.h, objectFit: "contain" }}
    />
  </div>
);

export const SeedanceIntro: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {/* Segment A: 0-6s of source */}
    <Sequence from={0} durationInFrames={SEG_A_END} name="intro-forest">
      <OffthreadVideo
        src={staticFile("clips/intro_v6.mp4")}
        startFrom={0}
        endAt={SEG_A_END}
      />
    </Sequence>

    {/* Segment B: 7-23s of source (brick-house shot removed) */}
    <Sequence from={SEG_A_END} durationInFrames={SEG_B_FRAMES} name="intro-avatar">
      <OffthreadVideo
        src={staticFile("clips/intro_v6.mp4")}
        startFrom={SEG_B_START}
        endAt={SEG_B_END}
      />
    </Sequence>

    {/* M2AI badge — persistent across full 22s */}
    <M2AIBadge />
  </AbsoluteFill>
);
