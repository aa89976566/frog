export type StoryAct = {
  id: string;
  chapter: string;
  image: string;
  lines: string[];
  aria: string;
  objectPosition: string;
  /** Mobile-first object-position when portrait crops harder */
  objectPositionMobile: string;
  coverScale: number;
  coverScaleMobile: number;
  pillBg: string;
  /** Capsule text on acid/pink/mint fills — near-black only */
  pillFg: "#050505";
  pillLabel: string;
  /** Giant type overlay shown during transition INTO this act */
  enterType?: string;
  ghost: "scatter" | "breathe" | "chase" | "soft";
};

/**
 * Locked five-act film — v5 plate 01 ingested; remaining plates pending v5.
 * Captions are HTML-only; never bake OS into art.
 * Dog lock (all plates that show the dog): tall narrow black triangular ears,
 * coarse white fur, small yellow eyes with hot-pink rings, huge foggy-black nose,
 * rectangular black chest patch. Hero uses the same dog via plate 01.
 */
export const STORY_ACTS: StoryAct[] = [
  {
    id: "act-01",
    chapter: "01",
    image: "/assets/story/01-hope.jpg",
    lines: ["「我以為只要穿得像大家，我就會被喜歡。」"],
    aria: "第一章希望：化妝室鏡前的西裝青蛙，右下尖耳白狗仰望",
    // v5: dog sits lower-right — bias center so ears stay inside cover crop
    objectPosition: "54% 46%",
    objectPositionMobile: "58% 48%",
    coverScale: 1.02,
    coverScaleMobile: 1.04,
    pillBg: "#EFF476",
    pillFg: "#050505",
    pillLabel: "希望",
    enterType: "希望",
    ghost: "soft",
  },
  {
    id: "act-02",
    chapter: "02",
    image: "/assets/story/02-scare.jpg",
    lines: ["「可是他們看見我，還是嚇得四散而逃。」"],
    aria: "第二章驚散：青蛙與尖耳白狗、驚逃人群",
    objectPosition: "50% 30%",
    objectPositionMobile: "50% 32%",
    coverScale: 1.03,
    coverScaleMobile: 1.05,
    pillBg: "#FF3BBF",
    pillFg: "#050505",
    pillLabel: "驚散",
    enterType: "驚散",
    ghost: "scatter",
  },
  {
    id: "act-03",
    chapter: "03",
    image: "/assets/story/03-dog.jpg",
    lines: ["「人群都走了。只有牠，還在看我。」"],
    aria: "第三章留下：高黑耳白毛黃眼粉紅眼圈小狗正面",
    // Protect tall triangular ears at top of frame
    objectPosition: "50% 42%",
    objectPositionMobile: "48% 40%",
    coverScale: 1.02,
    coverScaleMobile: 1.04,
    pillBg: "#52FF20",
    pillFg: "#050505",
    pillLabel: "留下",
    enterType: "留下",
    ghost: "soft",
  },
  {
    id: "act-04",
    chapter: "04",
    image: "/assets/story/04-free.jpg",
    lines: ["「原來我不需要合群。我只需要做回自己。」"],
    aria: "第四章做自己：脫下西裝的青蛙與同一隻尖耳白狗",
    objectPosition: "50% 36%",
    objectPositionMobile: "50% 38%",
    coverScale: 1.02,
    coverScaleMobile: 1.04,
    pillBg: "#EFF476",
    pillFg: "#050505",
    pillLabel: "做自己",
    enterType: "做自己",
    ghost: "breathe",
  },
  {
    id: "act-05",
    chapter: "05",
    image: "/assets/story/05-chase.jpg",
    lines: ["「等等——原來牠不是不怕我，牠只是想咬我！跑啊！」"],
    aria: "第五章嗷嗚：同一隻狗咬住青蛙追逐",
    // Keep both runners and dog ears in frame
    objectPosition: "52% 42%",
    objectPositionMobile: "55% 40%",
    coverScale: 1.03,
    coverScaleMobile: 1.05,
    pillBg: "#FF3BBF",
    pillFg: "#050505",
    pillLabel: "嗷嗚",
    enterType: "嗷嗚！",
    ghost: "chase",
  },
];

/**
 * Hero 獨立主視覺（僅第一屏）。
 * 禁止用於第二章／故事板；禁止裁切眼睛或在圖內加字。
 * 五章故事板路徑見 STORY_ACTS，與本檔完全分離。
 */
export const HERO_MASTER = "/assets/hero/hero-frog-closeup-v10.jpg";

export const LOCKED_STORY_IMAGES: readonly string[] = STORY_ACTS.map((a) => a.image);

export const BRAND = {
  name: "Furmosa",
  campaign: "嗷嗚計畫",
  tagline: "青蛙誰在怕",
  sticker: "FURMOSA\nOWOO",
} as const;

/**
 * Master timeline units (ease:none scrub).
 * Transition overlap ≥40%; outgoing stays at opacity .35–.55 mid-window.
 * No pure-black blank segments between chapters.
 */
export const FILM_SEGMENTS = {
  heroHold: 0.55,
  /** hero → act1 / act→act overlapping crossfade */
  transition: 1.55,
  actHold: 0.72,
  act5Hold: 1.0,
} as const;
