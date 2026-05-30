import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";

const FPS = 25;

// Section A1: 0:00 - 0:19 at 2x (skip 0:19-0:37 file-upload clicks)
const A1_SOURCE_START = 0;
const A1_SOURCE_END = 19 * FPS; // 475
const A1_DURATION = Math.floor((A1_SOURCE_END - A1_SOURCE_START) / 2); // 237

// Section A2: 0:37 - 0:40 at 2x
const A2_SOURCE_START = 37 * FPS; // 925
const A2_SOURCE_END = 40 * FPS; // 1000
const A2_DURATION = Math.floor((A2_SOURCE_END - A2_SOURCE_START) / 2); // 37

// Section B: 1:30 - 2:03 at 2x
const B_SOURCE_START = 90 * FPS; // 2250
const B_SOURCE_END = 123 * FPS; // 3075
const B_DURATION = Math.floor((B_SOURCE_END - B_SOURCE_START) / 2); // 412

// Section C: 2:13 - 2:24 at 2x
const C_SOURCE_START = 133 * FPS; // 3325
const C_SOURCE_END = 144 * FPS; // 3600
const C_DURATION = Math.floor((C_SOURCE_END - C_SOURCE_START) / 2); // 137

// Section D: 2:24 - 2:31 normal
const D_SOURCE_START = 144 * FPS; // 3600
const D_SOURCE_END = 151 * FPS; // 3775
const D_DURATION = D_SOURCE_END - D_SOURCE_START; // 175

// Section E: seedance loop x2 (5.041667s each at 24fps source)
const SEEDANCE_LOOP_FRAMES = Math.round(5.041667 * FPS); // 126
const E_DURATION = SEEDANCE_LOOP_FRAMES * 2; // 252

// Section F: m2ai loop (5.466633s at 30fps source)
const F_DURATION = Math.round(5.466633 * FPS); // 137

const A1_START = 0;
const A2_START = A1_START + A1_DURATION; // 237
const B_START = A2_START + A2_DURATION; // 274
const C_START = B_START + B_DURATION; // 686
const D_START = C_START + C_DURATION; // 823
const E_START = D_START + D_DURATION; // 998
const F_START = E_START + E_DURATION; // 1250

export const TOTAL_FRAMES = F_START + F_DURATION; // 1387

const PillarboxVideo: React.FC<{
  src: string;
  startFrom?: number;
  endAt?: number;
  playbackRate?: number;
}> = ({ src, startFrom, endAt, playbackRate }) => (
  <AbsoluteFill
    style={{
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <OffthreadVideo
      src={staticFile(src)}
      startFrom={startFrom}
      endAt={endAt}
      playbackRate={playbackRate}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      muted
    />
  </AbsoluteFill>
);

export const KieDemoCh2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence from={A1_START} durationInFrames={A1_DURATION} name="A1-prompt-start-2x">
      <PillarboxVideo
        src="clips/KieDemo1.mp4"
        startFrom={A1_SOURCE_START}
        endAt={A1_SOURCE_END}
        playbackRate={2}
      />
    </Sequence>

    <Sequence from={A2_START} durationInFrames={A2_DURATION} name="A2-prompt-end-2x">
      <PillarboxVideo
        src="clips/KieDemo1.mp4"
        startFrom={A2_SOURCE_START}
        endAt={A2_SOURCE_END}
        playbackRate={2}
      />
    </Sequence>

    <Sequence from={B_START} durationInFrames={B_DURATION} name="B-settings-2x">
      <PillarboxVideo
        src="clips/KieDemo1.mp4"
        startFrom={B_SOURCE_START}
        endAt={B_SOURCE_END}
        playbackRate={2}
      />
    </Sequence>

    <Sequence from={C_START} durationInFrames={C_DURATION} name="C-run-wait-2x">
      <PillarboxVideo
        src="clips/KieDemo1.mp4"
        startFrom={C_SOURCE_START}
        endAt={C_SOURCE_END}
        playbackRate={2}
      />
    </Sequence>

    <Sequence from={D_START} durationInFrames={D_DURATION} name="D-finished">
      <PillarboxVideo
        src="clips/KieDemo1.mp4"
        startFrom={D_SOURCE_START}
        endAt={D_SOURCE_END}
      />
    </Sequence>

    <Sequence
      from={E_START}
      durationInFrames={SEEDANCE_LOOP_FRAMES}
      name="E-seedance-loop-1"
    >
      <PillarboxVideo src="clips/seedance_loop.mp4" />
    </Sequence>
    <Sequence
      from={E_START + SEEDANCE_LOOP_FRAMES}
      durationInFrames={SEEDANCE_LOOP_FRAMES}
      name="E-seedance-loop-2"
    >
      <PillarboxVideo src="clips/seedance_loop.mp4" />
    </Sequence>

    <Sequence from={F_START} durationInFrames={F_DURATION} name="F-m2ai-website">
      <PillarboxVideo src="clips/m2ai_loop.mp4" />
    </Sequence>
  </AbsoluteFill>
);
