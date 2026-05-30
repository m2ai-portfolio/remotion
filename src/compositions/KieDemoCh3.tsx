import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const FPS = 25;
const ACCENT = "#4a9eff";
const TEXT = "#ffffff";
const MUTED = "#8a8a8a";
const BG = "#000000";

// ============ Section durations ============
const S1_DUR = 15 * FPS; // 375 — Setup checklist
const S2_DUR = 12 * FPS; // 300 — Stock chains
const S3_DUR = 8 * FPS; // 200 — Remotion advantage header (trimmed)
const S4_DUR = 30 * FPS; // 750 — Three advantages
const S5_DUR = 15 * FPS; // 375 — Skills + framework
const S5B_DUR = 20 * FPS; // 500 — Skill examples (2 cards × 10s; each = 7s video + 3s prompt)
const S6_DUR = 10 * FPS; // 250 — Smoke test
const S7_DUR = 25 * FPS; // 625 — Failure taxonomy
const S8_DUR = 12 * FPS; // 300 — Black-box admission

const S1_START = 0;
const S2_START = S1_START + S1_DUR;
const S3_START = S2_START + S2_DUR;
const S4_START = S3_START + S3_DUR;
const S5_START = S4_START + S4_DUR;
const S5B_START = S5_START + S5_DUR;
const S6_START = S5B_START + S5B_DUR;
const S7_START = S6_START + S6_DUR;
const S8_START = S7_START + S7_DUR;

export const TOTAL_FRAMES = S8_START + S8_DUR;

// ============ Helpers ============
const fadeIn = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  brollSrc?: string;
  brollPlaybackRate?: number;
  brollStartFrom?: number;
  brollEndAt?: number;
  brollOpacity?: number;
}> = ({
  children,
  style,
  brollSrc,
  brollPlaybackRate,
  brollStartFrom,
  brollEndAt,
  brollOpacity = 0.32,
}) => (
  <AbsoluteFill style={{ backgroundColor: BG }}>
    {brollSrc && (
      <>
        <AbsoluteFill style={{ opacity: brollOpacity }}>
          <OffthreadVideo
            src={staticFile(brollSrc)}
            playbackRate={brollPlaybackRate}
            startFrom={brollStartFrom}
            endAt={brollEndAt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </>
    )}
    <AbsoluteFill
      style={{
        padding: "120px 160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        color: TEXT,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);

const SectionLabel: React.FC<{ num: string; text: string; opacity: number }> = ({
  num,
  text,
  opacity,
}) => (
  <div
    style={{
      opacity,
      fontSize: 28,
      fontWeight: 600,
      color: ACCENT,
      letterSpacing: 4,
      textTransform: "uppercase",
      marginBottom: 32,
    }}
  >
    {num} · {text}
  </div>
);

// ============ §1 Setup checklist ============
const SetupChecklist: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    { label: "Kie.ai API key", note: "or any video-gen provider" },
    { label: "API Key management", note: "centralized secrets store" },
    { label: "Remotion 4.0", note: "React-based programmatic video" },
    { label: "Claude Code skills", note: "seedance-prompt + seedance-shot-prompt + remotion" },
    { label: "R2 frame hosting", note: "rclone copy → public r2.dev URLs" },
  ];
  return (
    <Card brollSrc="clips/c8_slow_rotate.mp4">
      <SectionLabel num="01" text="Setup" opacity={fadeIn(frame, 0)} />
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          marginBottom: 60,
          opacity: fadeIn(frame, 6),
          transform: `translateY(${slideUp(frame, 6)}px)`,
        }}
      >
        5 things you need
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {items.map((it, i) => {
          const start = 30 + i * 18;
          return (
            <div
              key={it.label}
              style={{
                opacity: fadeIn(frame, start),
                transform: `translateY(${slideUp(frame, start)}px)`,
                display: "flex",
                alignItems: "baseline",
                gap: 32,
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  color: ACCENT,
                  fontWeight: 700,
                  width: 56,
                }}
              >
                0{i + 1}
              </div>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600 }}>{it.label}</div>
                <div style={{ fontSize: 26, color: MUTED, marginTop: 4 }}>
                  {it.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// ============ §2 Stock Seedance chains ============
const ChainsExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Card brollSrc="clips/c8_chase_to_wire.mp4" brollEndAt={12 * FPS}>
      <SectionLabel num="02" text="Stock Seedance2" opacity={fadeIn(frame, 0)} />
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          marginBottom: 48,
          opacity: fadeIn(frame, 6),
          transform: `translateY(${slideUp(frame, 6)}px)`,
        }}
      >
        What you get: chains
      </div>
      <div
        style={{
          fontSize: 32,
          fontFamily: '"SF Mono", Menlo, Consolas, monospace',
          color: ACCENT,
          backgroundColor: "#0e1620",
          padding: "28px 36px",
          borderRadius: 8,
          marginBottom: 56,
          opacity: fadeIn(frame, 30),
          transform: `translateY(${slideUp(frame, 30)}px)`,
        }}
      >
        Extend the @video1 &amp; use its last frame as the starting point.
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          opacity: fadeIn(frame, 60),
        }}
      >
        {["S1", "S2", "S3"].map((s, i) => (
          <React.Fragment key={s}>
            <div
              style={{
                width: 200,
                height: 120,
                border: `3px solid ${ACCENT}`,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                fontWeight: 700,
                opacity: fadeIn(frame, 60 + i * 20),
              }}
            >
              {s}
            </div>
            {i < 2 && (
              <div
                style={{
                  fontSize: 56,
                  color: MUTED,
                  opacity: fadeIn(frame, 70 + i * 20),
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div
        style={{
          fontSize: 32,
          color: MUTED,
          marginTop: 48,
          fontStyle: "italic",
          opacity: fadeIn(frame, 130),
        }}
      >
        Same engine. More shots.
      </div>
    </Card>
  );
};

// ============ §3 Remotion advantage header ============
const RemotionAdvantageHeader: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Card
      style={{ justifyContent: "center", alignItems: "flex-start" }}
      brollSrc="clips/lemans_chase.mp4"
      brollPlaybackRate={8 / 15}
    >
      <SectionLabel num="03" text="Why Remotion + Skills" opacity={fadeIn(frame, 0)} />
      <div
        style={{
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1.15,
          marginTop: 24,
          opacity: fadeIn(frame, 12),
          transform: `translateY(${slideUp(frame, 12)}px)`,
        }}
      >
        Chains stay inside <span style={{ color: MUTED }}>one engine.</span>
      </div>
      <div
        style={{
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1.15,
          marginTop: 24,
          opacity: fadeIn(frame, 60),
          transform: `translateY(${slideUp(frame, 60)}px)`,
        }}
      >
        Remotion lets you{" "}
        <span style={{ color: ACCENT }}>compose across engines.</span>
      </div>
    </Card>
  );
};

// ============ §4 Three advantages (with video receipts) ============
const AdvantageReceipt: React.FC<{
  num: string;
  heading: string;
  body: string;
  receiptCaption: string;
  videoSrc: string;
  videoStartFrom: number;
  videoEndAt: number;
}> = ({ num, heading, body, receiptCaption, videoSrc, videoStartFrom, videoEndAt }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <AbsoluteFill style={{ opacity: 0.45 }}>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          startFrom={videoStartFrom}
          endAt={videoEndAt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          padding: "120px 160px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: TEXT,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: ACCENT,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: fadeIn(frame, 0),
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            marginBottom: 20,
            opacity: fadeIn(frame, 6),
            transform: `translateY(${slideUp(frame, 6)}px)`,
          }}
        >
          {heading}
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#d8d8d8",
            maxWidth: 1400,
            lineHeight: 1.4,
            opacity: fadeIn(frame, 18),
          }}
        >
          {body}
        </div>
        <div
          style={{
            fontSize: 24,
            color: ACCENT,
            marginTop: 36,
            fontFamily: '"SF Mono", Menlo, Consolas, monospace',
            opacity: fadeIn(frame, 36),
          }}
        >
          ↳ {receiptCaption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ThreeAdvantages: React.FC = () => {
  const SUB_DUR = 10 * FPS; // 250 each
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Sequence from={0} durationInFrames={SUB_DUR} name="4a-typography">
        <AdvantageReceipt
          num="A · Typography that doesn't garble"
          heading="Text on top, not inside"
          body="Seedance destroys lettering, logos, and HUD every time — text_garbling is failure mode #7. Remotion overlays render typography post-generation."
          receiptCaption="receipt: intro.mp4 — M2AI badge covering HeyGen watermark"
          videoSrc="clips/intro_canonical.mp4"
          videoStartFrom={0}
          videoEndAt={SUB_DUR}
        />
      </Sequence>
      <Sequence from={SUB_DUR} durationInFrames={SUB_DUR} name="4b-mixed-aspect">
        <AdvantageReceipt
          num="B · Mixed-source composition"
          heading="Different aspects, one timeline"
          body="Seedance chains can only chain Seedance. Remotion stitches 1720×1380 + 864×496 + 1920×1080 into one frame via object-fit, no re-encode."
          receiptCaption="receipt: kie-ch2-loop-v3.mp4 — three different source aspects"
          videoSrc="clips/kie-ch2-loop-v3.mp4"
          videoStartFrom={28 * FPS}
          videoEndAt={38 * FPS}
        />
      </Sequence>
      <Sequence from={SUB_DUR * 2} durationInFrames={SUB_DUR} name="4c-time-control">
        <AdvantageReceipt
          num="C · Time control on existing footage"
          heading="2x without re-generating"
          body="Seedance can't speed up its own outputs after the fact. Remotion's playbackRate compresses 84s of source into 55s of output — no extra credits burned."
          receiptCaption="receipt: kie-ch2-loop-v3.mp4 — sections A/B/C at 2x"
          videoSrc="clips/kie-ch2-loop-v3.mp4"
          videoStartFrom={0}
          videoEndAt={SUB_DUR}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ §5 Skills + FRAMES framework ============
const SkillsFramework: React.FC = () => {
  const frame = useCurrentFrame();
  const letters = [
    { l: "F", w: "Frame" },
    { l: "R", w: "Reaction" },
    { l: "A", w: "Audio" },
    { l: "M", w: "Mood" },
    { l: "E", w: "Edit Plan" },
    { l: "S", w: "Shot" },
  ];
  return (
    <Card brollSrc="clips/red_c8.mp4">
      <SectionLabel num="05" text="The Skills" opacity={fadeIn(frame, 0)} />
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          marginBottom: 16,
          opacity: fadeIn(frame, 8),
        }}
      >
        <span style={{ color: ACCENT, fontFamily: "monospace" }}>seedance-prompt</span>
        <span style={{ color: MUTED }}> · multi-shot timelines</span>
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          marginBottom: 16,
          opacity: fadeIn(frame, 24),
        }}
      >
        <span style={{ color: ACCENT, fontFamily: "monospace" }}>seedance-shot-prompt</span>
        <span style={{ color: MUTED }}> · linear A→B shots</span>
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          marginBottom: 48,
          opacity: fadeIn(frame, 38),
        }}
      >
        <span style={{ color: ACCENT, fontFamily: "monospace" }}>remotion</span>
        <span style={{ color: MUTED }}> · composition layer</span>
      </div>
      <div
        style={{
          fontSize: 32,
          color: MUTED,
          marginBottom: 28,
          opacity: fadeIn(frame, 60),
        }}
      >
        Two prompt skills impose the FRAMES framework:
      </div>
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {letters.map((x, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 80 + i * 14),
              transform: `translateY(${slideUp(frame, 80 + i * 14)}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 220,
            }}
          >
            <div
              style={{
                fontSize: 120,
                fontWeight: 700,
                color: ACCENT,
                lineHeight: 1,
              }}
            >
              {x.l}
            </div>
            <div style={{ fontSize: 30, fontWeight: 500, marginTop: 12 }}>
              {x.w}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============ §5b Skill examples ============
const SkillVideoCard: React.FC<{
  skillName: string;
  role: string;
  videoSrc: string;
  videoStartFrom?: number;
  videoEndAt?: number;
}> = ({ skillName, role, videoSrc, videoStartFrom, videoEndAt }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          startFrom={videoStartFrom}
          endAt={videoEndAt}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          muted
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          padding: "60px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: TEXT,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div style={{ opacity: fadeIn(frame, 0) }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Skill in action
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              fontFamily: '"SF Mono", Menlo, Consolas, monospace',
              color: ACCENT,
            }}
          >
            {skillName}
          </div>
          <div style={{ fontSize: 30, color: "#d8d8d8", marginTop: 6 }}>
            {role}
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            color: MUTED,
            fontFamily: '"SF Mono", Menlo, Consolas, monospace',
            opacity: fadeIn(frame, 18),
          }}
        >
          ↳ skill output next
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SkillPromptCard: React.FC<{
  skillName: string;
  title: string;
  rows: [string, string][];
}> = ({ skillName, title, rows }) => {
  const frame = useCurrentFrame();
  return (
    <Card>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: ACCENT,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 14,
          opacity: fadeIn(frame, 0, 6),
        }}
      >
        {skillName} · output
      </div>
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          marginBottom: 38,
          opacity: fadeIn(frame, 4, 6),
          transform: `translateY(${interpolate(
            frame,
            [4, 12],
            [20, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )}px)`,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {rows.map(([label, content], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 32,
              alignItems: "baseline",
              opacity: fadeIn(frame, 10 + i * 6, 8),
              fontFamily: '"SF Mono", Menlo, Consolas, monospace',
            }}
          >
            <div
              style={{
                color: ACCENT,
                fontSize: 26,
                fontWeight: 700,
                minWidth: 320,
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 30, color: "#dddddd" }}>{content}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const SkillExamples: React.FC = () => {
  const VIDEO_DUR = 7 * FPS; // 175
  const PROMPT_DUR = 3 * FPS; // 75
  const SLOT = VIDEO_DUR + PROMPT_DUR; // 250

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* §5b1 — seedance-prompt */}
      <Sequence from={0} durationInFrames={VIDEO_DUR} name="5b1-video">
        <SkillVideoCard
          skillName="seedance-prompt"
          role="Multi-shot timelines · narrative across multiple framings"
          videoSrc="clips/c8_wireframe_to_pov.mp4"
          videoStartFrom={4 * FPS}
          videoEndAt={11 * FPS}
        />
      </Sequence>
      <Sequence from={VIDEO_DUR} durationInFrames={PROMPT_DUR} name="5b1-prompt">
        <SkillPromptCard
          skillName="seedance-prompt"
          title="multi-shot timeline (8s)"
          rows={[
            ["Shot 1 · 0–2s", "Wireframe re-establish"],
            ["Shot 2 · 2–4s", "Dive through windshield"],
            ["Shot 3 · 4–6s", "Wireframe → photoreal dissolve"],
            ["Shot 4 · 6–8s", "Stable PDR POV"],
          ]}
        />
      </Sequence>

      {/* §5b2 — seedance-shot-prompt */}
      <Sequence from={SLOT} durationInFrames={VIDEO_DUR} name="5b2-video">
        <SkillVideoCard
          skillName="seedance-shot-prompt"
          role="Linear A→B shots · transitions, chases, reveals"
          videoSrc="clips/lemans_chase_15s.mp4"
          videoStartFrom={3 * FPS}
          videoEndAt={10 * FPS}
        />
      </Sequence>
      <Sequence from={SLOT + VIDEO_DUR} durationInFrames={PROMPT_DUR} name="5b2-prompt">
        <SkillPromptCard
          skillName="seedance-shot-prompt"
          title="linear A→B shot (15s)"
          rows={[
            ["SCENE", "#7 GT3 R chasing #4 C8.R · Mulsanne chicane"],
            ["CAMERA", "low trackside tracking → lift-back"],
            ["ACTION", "flat-out → brake → through chicane"],
            ["MOOD", "overcast · desaturated forest backdrop"],
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ §6 Smoke test ============
const SmokeTest: React.FC = () => {
  const frame = useCurrentFrame();
  const stages = [
    { n: "1", t: "Generic motion", d: "Anonymous subject. Same arc. Confirms model can do this duration at all." },
    { n: "2", t: "Identity-only", d: "Named subject. Near-static. Confirms identity holds without motion stress." },
    { n: "3", t: "Combined", d: "Only if 1 and 2 both pass. If 3 fails: don't grind. The model has a ceiling." },
  ];
  return (
    <Card brollSrc="clips/direction_flip.mp4" brollPlaybackRate={8 / 10}>
      <SectionLabel num="06" text="Best Practice" opacity={fadeIn(frame, 0)} />
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          marginBottom: 16,
          opacity: fadeIn(frame, 8),
          transform: `translateY(${slideUp(frame, 8)}px)`,
        }}
      >
        3-stage smoke test
      </div>
      <div
        style={{
          fontSize: 30,
          color: MUTED,
          marginBottom: 40,
          opacity: fadeIn(frame, 18),
        }}
      >
        30 minutes vs 2 days.
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {stages.map((s, i) => (
          <div
            key={s.n}
            style={{
              flex: 1,
              opacity: fadeIn(frame, 40 + i * 24),
              transform: `translateY(${slideUp(frame, 40 + i * 24)}px)`,
              border: `2px solid ${ACCENT}`,
              borderRadius: 12,
              padding: 28,
            }}
          >
            <div style={{ fontSize: 60, fontWeight: 700, color: ACCENT }}>
              {s.n}
            </div>
            <div style={{ fontSize: 32, fontWeight: 600, marginTop: 8 }}>
              {s.t}
            </div>
            <div style={{ fontSize: 22, color: "#cccccc", marginTop: 12, lineHeight: 1.4 }}>
              {s.d}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============ §7 Failure taxonomy ============
const FailureTaxonomy: React.FC = () => {
  const frame = useCurrentFrame();
  const modes = [
    ["api_xor_constraint", "Provider rejects anchors + references combined."],
    ["identity_drift", "Anchor mode loses specific markings; output goes generic."],
    ["motion_reversal", "First/last frames interpreted in temporal reverse."],
    ["boomerang_interpolation", "Similar anchors → forward → back → forward."],
    ["no_motion_reference_only", "Reference-only mode kills motion entirely."],
    ["hallucination", "Reference mode adds parts that don't exist (exhaust pipe on a C8)."],
    ["text_garbling", "HUD, logos, captions always destroyed."],
    ["input_stacking_ineffective", "More signals don't raise the model's ceiling."],
  ];
  return (
    <Card
      style={{ padding: "80px 120px" }}
      brollSrc="clips/F35_2.mp4"
      brollPlaybackRate={15 / 25}
    >
      <SectionLabel num="07" text="What Goes Wrong" opacity={fadeIn(frame, 0)} />
      <div
        style={{
          fontSize: 76,
          fontWeight: 700,
          marginBottom: 20,
          opacity: fadeIn(frame, 8),
          transform: `translateY(${slideUp(frame, 8)}px)`,
        }}
      >
        8 failure modes
      </div>
      <div
        style={{
          fontSize: 26,
          color: MUTED,
          marginBottom: 36,
          opacity: fadeIn(frame, 18),
        }}
      >
        Name the failure. Stop fighting it.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 56,
          rowGap: 22,
        }}
      >
        {modes.map(([name, def], i) => (
          <div
            key={name}
            style={{
              opacity: fadeIn(frame, 36 + i * 14),
              transform: `translateX(${interpolate(
                frame,
                [36 + i * 14, 36 + i * 14 + 18],
                [-30, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )}px)`,
              borderLeft: `3px solid ${ACCENT}`,
              paddingLeft: 20,
            }}
          >
            <div
              style={{
                fontFamily: '"SF Mono", Menlo, Consolas, monospace',
                fontSize: 26,
                fontWeight: 700,
                color: ACCENT,
                marginBottom: 4,
              }}
            >
              {name}
            </div>
            <div style={{ fontSize: 22, color: "#cccccc", lineHeight: 1.35 }}>
              {def}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============ §8 Black-box admission ============
const BlackBoxAdmission: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Card
      style={{ justifyContent: "center" }}
      brollSrc="clips/blurr_flip_script.mp4"
      brollEndAt={12 * FPS}
    >
      <SectionLabel num="08" text="The Mistake" opacity={fadeIn(frame, 0)} />
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          marginTop: 32,
          marginBottom: 28,
          opacity: fadeIn(frame, 8),
          transform: `translateY(${slideUp(frame, 8)}px)`,
        }}
      >
        "The ceiling is the model,
      </div>
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          marginBottom: 32,
          opacity: fadeIn(frame, 24),
          transform: `translateY(${slideUp(frame, 24)}px)`,
        }}
      >
        not the inputs."
      </div>
      <div
        style={{
          fontSize: 36,
          color: ACCENT,
          fontStyle: "italic",
          marginTop: 24,
          opacity: fadeIn(frame, 60),
        }}
      >
        Input stacking doesn't raise the ceiling.
      </div>
      <div
        style={{
          fontSize: 24,
          color: MUTED,
          marginTop: 28,
          opacity: fadeIn(frame, 78),
        }}
      >
        — Blurr AAR, 2026-04-17. Two days, four attempts, one salvageable clip.
      </div>
    </Card>
  );
};

// ============ Main composition ============
export const KieDemoCh3: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: BG }}>
    <Sequence from={S1_START} durationInFrames={S1_DUR} name="01-setup">
      <SetupChecklist />
    </Sequence>
    <Sequence from={S2_START} durationInFrames={S2_DUR} name="02-chains">
      <ChainsExplainer />
    </Sequence>
    <Sequence from={S3_START} durationInFrames={S3_DUR} name="03-remotion-header">
      <RemotionAdvantageHeader />
    </Sequence>
    <Sequence from={S4_START} durationInFrames={S4_DUR} name="04-three-advantages">
      <ThreeAdvantages />
    </Sequence>
    <Sequence from={S5_START} durationInFrames={S5_DUR} name="05-skills-framework">
      <SkillsFramework />
    </Sequence>
    <Sequence from={S5B_START} durationInFrames={S5B_DUR} name="05b-skill-examples">
      <SkillExamples />
    </Sequence>
    <Sequence from={S6_START} durationInFrames={S6_DUR} name="06-smoke-test">
      <SmokeTest />
    </Sequence>
    <Sequence from={S7_START} durationInFrames={S7_DUR} name="07-failure-taxonomy">
      <FailureTaxonomy />
    </Sequence>
    <Sequence from={S8_START} durationInFrames={S8_DUR} name="08-black-box">
      <BlackBoxAdmission />
    </Sequence>
  </AbsoluteFill>
);
