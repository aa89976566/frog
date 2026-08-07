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
  /** Capsule text is always black on candy fills */
  pillFg: "#111111";
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
    coverScale: 1.08,
    coverScaleMobile: 1.12,
    pillBg: "#E8FF00",
    pillFg: "#111111",
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
    coverScale: 1.14,
    coverScaleMobile: 1.2,
    pillBg: "#FF2D95",
    pillFg: "#111111",
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
    coverScale: 1.1,
    coverScaleMobile: 1.16,
    pillBg: "#39FF14",
    pillFg: "#111111",
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
    coverScale: 1.1,
    coverScaleMobile: 1.16,
    pillBg: "#E8FF00",
    pillFg: "#111111",
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
    coverScale: 1.12,
    coverScaleMobile: 1.18,
    pillBg: "#FF2D95",
    pillFg: "#111111",
    pillLabel: "嗷嗚",
    enterType: "嗷嗚！",
    ghost: "chase",
  },
];

/** Hero core = first story plate — same locked dog, never the old master breed. */
export const HERO_MASTER = STORY_ACTS[0].image;

export const LOCKED_STORY_IMAGES: readonly string[] = STORY_ACTS.map((a) => a.image);

export const BRAND = {
  name: "Furmosa",
  campaign: "嗷嗚計畫",
  tagline: "青蛙誰在怕",
  sticker: "FURMOSA\nOWOO",
} as const;

/**
 * Master timeline units (ease:none scrub).
 * Transition ≈ 1.35 vh-units — outgoing + incoming overlap ≥35%; no >18vh black void.
 */
export const FILM_SEGMENTS = {
  heroHold: 0.5,
  /** hero → act1 / act→act transition */
  transition: 1.35,
  actHold: 0.65,
  act5Hold: 0.9,
} as const;
