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
 * Locked five-act film — approved v3 story plates only.
 * Captions are HTML-only; never bake OS into art.
 * Dog lock (act 03): black pointed ears, white coarse fur,
 * round yellow eyes, black nose + black chest — do not swap breeds.
 */
export const STORY_ACTS: StoryAct[] = [
  {
    id: "act-01",
    chapter: "01",
    image: "/assets/story/01-hope.jpg",
    lines: ["「我以為只要穿得像大家，我就會被喜歡。」"],
    aria: "第一章希望：西裝青蛙在派對中調整領帶",
    // Extreme face + striped tie
    objectPosition: "48% 18%",
    objectPositionMobile: "50% 20%",
    coverScale: 1.32,
    coverScaleMobile: 1.42,
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
    aria: "第二章驚散：青蛙巨大臉龐與驚逃人群",
    // Extreme frog eyes + pink halo
    objectPosition: "52% 26%",
    objectPositionMobile: "50% 28%",
    coverScale: 1.36,
    coverScaleMobile: 1.48,
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
    aria: "第三章留下：黑尖耳白毛黃眼小狗正面特寫",
    // Extreme dog nose + round yellow eyes
    objectPosition: "28% 38%",
    objectPositionMobile: "20% 36%",
    coverScale: 1.4,
    coverScaleMobile: 1.55,
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
    aria: "第四章做自己：青蛙做回自己",
    // Extreme bare frog face + raised arms
    objectPosition: "50% 30%",
    objectPositionMobile: "48% 26%",
    coverScale: 1.28,
    coverScaleMobile: 1.38,
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
    aria: "第五章嗷嗚：狗咬住青蛙追逐",
    // Extreme chase bite + panic face (action right)
    objectPosition: "70% 40%",
    objectPositionMobile: "78% 38%",
    coverScale: 1.34,
    coverScaleMobile: 1.5,
    pillBg: "#FF2D95",
    pillFg: "#111111",
    pillLabel: "嗷嗚",
    enterType: "嗷嗚！",
    ghost: "chase",
  },
];

export const HERO_MASTER = "/assets/hero/hero-master-v2.jpg";

export const LOCKED_STORY_IMAGES: readonly string[] = STORY_ACTS.map((a) => a.image);

export const BRAND = {
  name: "Furmosa",
  campaign: "嗷嗚計畫",
  tagline: "青蛙誰在怕",
  sticker: "FURMOSA\nOWOO",
} as const;

/**
 * Master timeline units (ease:none scrub).
 * Transition ≈ 1.25 vh-units (~125vh) — never a separate black page.
 */
export const FILM_SEGMENTS = {
  heroHold: 0.55,
  /** hero → act1 / act→act transition (~125vh) */
  transition: 1.25,
  actHold: 0.7,
  act5Hold: 0.95,
} as const;
