import "./index.css";
import { Composition } from "remotion";
import { z } from "zod";
import { ScriptVideo } from "./compositions/ScriptVideo";
import type { ScriptVideoProps } from "./compositions/ScriptVideo";
import { SeedanceIntro, TOTAL_FRAMES } from "./compositions/SeedanceIntro";
import { KieDemoCh2, TOTAL_FRAMES as KIE_CH2_FRAMES } from "./compositions/KieDemoCh2";
import { KieDemoCh3, TOTAL_FRAMES as KIE_CH3_FRAMES } from "./compositions/KieDemoCh3";
import { HorrorRomcom, TOTAL_FRAMES as HR_FRAMES, FPS as HR_FPS } from "./compositions/HorrorRomcom";
import {
  RaspberryClaw,
  TOTAL_FRAMES as RC_FRAMES,
  FPS as RC_FPS,
  WIDTH as RC_WIDTH,
  HEIGHT as RC_HEIGHT,
} from "./compositions/RaspberryClaw";
import {
  RaspberryClawV2,
  TOTAL_FRAMES as RC2_FRAMES,
  FPS as RC2_FPS,
  WIDTH as RC2_WIDTH,
  HEIGHT as RC2_HEIGHT,
} from "./compositions/RaspberryClawV2";
import {
  RaspberryClawV3,
  TOTAL_FRAMES as RC3_FRAMES,
  FPS as RC3_FPS,
  WIDTH as RC3_WIDTH,
  HEIGHT as RC3_HEIGHT,
} from "./compositions/RaspberryClawV3";
import {
  RaspberryClawV4,
  TOTAL_FRAMES as RC4_FRAMES,
  FPS as RC4_FPS,
  WIDTH as RC4_WIDTH,
  HEIGHT as RC4_HEIGHT,
} from "./compositions/RaspberryClawV4";
import {
  RaspberryClawV5,
  TOTAL_FRAMES as RC5_FRAMES,
  FPS as RC5_FPS,
  WIDTH as RC5_WIDTH,
  HEIGHT as RC5_HEIGHT,
} from "./compositions/RaspberryClawV5";
import {
  RaspberryClawV6,
  TOTAL_FRAMES as RC6_FRAMES,
  FPS as RC6_FPS,
  WIDTH as RC6_WIDTH,
  HEIGHT as RC6_HEIGHT,
} from "./compositions/RaspberryClawV6";
import {
  RaspberryClawV7,
  TOTAL_FRAMES as RC7_FRAMES,
  FPS as RC7_FPS,
  WIDTH as RC7_WIDTH,
  HEIGHT as RC7_HEIGHT,
} from "./compositions/RaspberryClawV7";
import {
  RaspberryClawV8,
  TOTAL_FRAMES as RC8_FRAMES,
  FPS as RC8_FPS,
  WIDTH as RC8_WIDTH,
  HEIGHT as RC8_HEIGHT,
} from "./compositions/RaspberryClawV8";
import {
  RaspberryClawV9,
  TOTAL_FRAMES as RC9_FRAMES,
  FPS as RC9_FPS,
  WIDTH as RC9_WIDTH,
  HEIGHT as RC9_HEIGHT,
} from "./compositions/RaspberryClawV9";
import type { SoundwaveScript, SceneWithTiming } from "./lib/types";

const scriptVideoSchema = z.object({
  script: z.any(),
  sceneTiming: z.any(),
});

// Sample script for Studio preview
const sampleScript: SoundwaveScript = {
  meta: {
    title: "Soundwave Demo",
    description: "A test video to verify scene rendering",
    fps: 30,
    width: 1920,
    height: 1080,
    theme: {
      primary: "#4a5e3f",
      secondary: "#7a9b6d",
      background: "#f4f6f3",
      text: "#ffffff",
    },
  },
  scenes: [
    {
      type: "title",
      narration: "Welcome to Soundwave",
      props: {
        heading: "Soundwave",
        subheading: "Programmatic Video Production",
      },
    },
    {
      type: "showcase",
      narration: "See what we can build",
      props: {
        images: ["assets/placeholder.png"],
        caption: "Built with Remotion + React",
        animation: "zoom",
      },
    },
    {
      type: "asciinema",
      narration: "Watch the pipeline in action",
      props: {
        cast: "casts/sample.cast",
        theme: "dark",
        showHeader: true,
        headerTitle: "soundwave pipeline",
        speed: 1,
      },
    },
    {
      type: "callToAction",
      narration: "Get started today",
      props: {
        heading: "Ready to Create?",
        buttonText: "Get Started",
        url: "soundwave.dev",
      },
    },
  ],
};

// Generate timing without audio (for Studio preview)
function generatePreviewTiming(
  script: SoundwaveScript,
): SceneWithTiming[] {
  const fps = script.meta.fps;
  const defaultDuration = 4 * fps; // 4 seconds per scene
  let currentFrame = 0;

  return script.scenes.map((scene) => {
    const timing: SceneWithTiming = {
      scene,
      audioDurationMs: 4000,
      audioPath: "",
      startFrame: currentFrame,
      durationInFrames: defaultDuration,
    };
    currentFrame += defaultDuration;
    return timing;
  });
}

const previewTiming = generatePreviewTiming(sampleScript);
const totalFrames = previewTiming.reduce(
  (sum, st) => sum + st.durationInFrames,
  0,
);

const defaultProps: ScriptVideoProps = {
  script: sampleScript,
  sceneTiming: previewTiming,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SeedanceIntro"
        component={SeedanceIntro}
        durationInFrames={TOTAL_FRAMES}
        fps={25}
        width={1920}
        height={1080}
      />
      <Composition
        id="KieDemoCh2"
        component={KieDemoCh2}
        durationInFrames={KIE_CH2_FRAMES}
        fps={25}
        width={1920}
        height={1080}
      />
      <Composition
        id="KieDemoCh3"
        component={KieDemoCh3}
        durationInFrames={KIE_CH3_FRAMES}
        fps={25}
        width={1920}
        height={1080}
      />
      <Composition
        id="HorrorRomcom"
        component={HorrorRomcom}
        durationInFrames={HR_FRAMES}
        fps={HR_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="RaspberryClaw"
        component={RaspberryClaw}
        durationInFrames={RC_FRAMES}
        fps={RC_FPS}
        width={RC_WIDTH}
        height={RC_HEIGHT}
      />
      <Composition
        id="RaspberryClawV2"
        component={RaspberryClawV2}
        durationInFrames={RC2_FRAMES}
        fps={RC2_FPS}
        width={RC2_WIDTH}
        height={RC2_HEIGHT}
      />
      <Composition
        id="RaspberryClawV3"
        component={RaspberryClawV3}
        durationInFrames={RC3_FRAMES}
        fps={RC3_FPS}
        width={RC3_WIDTH}
        height={RC3_HEIGHT}
      />
      <Composition
        id="RaspberryClawV4"
        component={RaspberryClawV4}
        durationInFrames={RC4_FRAMES}
        fps={RC4_FPS}
        width={RC4_WIDTH}
        height={RC4_HEIGHT}
      />
      <Composition
        id="RaspberryClawV5"
        component={RaspberryClawV5}
        durationInFrames={RC5_FRAMES}
        fps={RC5_FPS}
        width={RC5_WIDTH}
        height={RC5_HEIGHT}
      />
      <Composition
        id="RaspberryClawV6"
        component={RaspberryClawV6}
        durationInFrames={RC6_FRAMES}
        fps={RC6_FPS}
        width={RC6_WIDTH}
        height={RC6_HEIGHT}
      />
      <Composition
        id="RaspberryClawV7"
        component={RaspberryClawV7}
        durationInFrames={RC7_FRAMES}
        fps={RC7_FPS}
        width={RC7_WIDTH}
        height={RC7_HEIGHT}
      />
      <Composition
        id="RaspberryClawV8"
        component={RaspberryClawV8}
        durationInFrames={RC8_FRAMES}
        fps={RC8_FPS}
        width={RC8_WIDTH}
        height={RC8_HEIGHT}
      />
      <Composition
        id="RaspberryClawV9"
        component={RaspberryClawV9}
        durationInFrames={RC9_FRAMES}
        fps={RC9_FPS}
        width={RC9_WIDTH}
        height={RC9_HEIGHT}
      />
      <Composition
        id="ScriptVideo"
        schema={scriptVideoSchema}
        component={ScriptVideo}
        durationInFrames={totalFrames}
        fps={sampleScript.meta.fps}
        width={sampleScript.meta.width}
        height={sampleScript.meta.height}
        defaultProps={defaultProps}
      />
    </>
  );
};
