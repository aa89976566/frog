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
  pillFg: string;
  pillLabel: string;
  /** Giant type overlay shown during transition INTO this act */
  enterType?: string;
  ghost: "scatter" | "breathe" | "chase" | "soft";
};

/**
 * Locked five-act film — v2 ImageGen assets only.
 * Do not regenerate or swap character art.
 */
export const STORY_ACTS: StoryAct[] = [
  {
    id: "act-01",
    chapter: "01",
    image: "/assets/story/01-hope-v2.jpg",
    lines: ["我以為穿成這樣，大家就會喜歡我。"],
    aria: "第一章：西裝青蛙在派對中調整領帶",
    objectPosition: "50% 34%",
    objectPositionMobile: "50% 28%",
    coverScale: 1.18,
    coverScaleMobile: 1.22,
    pillBg: "#FFF4A3",
    pillFg: "#2A1040",
    pillLabel: "希望",
    enterType: "合群？",
    ghost: "soft",
  },
  {
    id: "act-02",
    chapter: "02",
    image: "/assets/story/02-scare-v2.jpg",
    lines: ["結果他們看見我，還是嚇得四散而逃。"],
    aria: "第二章：青蛙巨大臉龐與驚逃人群",
    objectPosition: "50% 36%",
    objectPositionMobile: "50% 30%",
    coverScale: 1.2,
    coverScaleMobile: 1.24,
    pillBg: "#FF4EC8",
    pillFg: "#ffffff",
    pillLabel: "驚散",
    enterType: "嚇跑",
    ghost: "scatter",
  },
  {
    id: "act-03",
    chapter: "03",
    image: "/assets/story/03-dog-v2.jpg",
    lines: ["人群散去後，只有牠留在原地看著我。"],
    aria: "第三章：小狗正面特寫",
    objectPosition: "50% 42%",
    objectPositionMobile: "50% 38%",
    coverScale: 1.16,
    coverScaleMobile: 1.2,
    pillBg: "#7DFFB2",
    pillFg: "#2A1040",
    pillLabel: "對視",
    enterType: "只有牠",
    ghost: "soft",
  },
  {
    id: "act-04",
    chapter: "04",
    image: "/assets/story/04-free-v2.jpg",
    lines: ["原來我不需要合群，我只需要做回自己。"],
    aria: "第四章：發光青蛙做回自己",
    objectPosition: "48% 52%",
    objectPositionMobile: "50% 48%",
    coverScale: 1.12,
    coverScaleMobile: 1.14,
    pillBg: "#FFF4A3",
    pillFg: "#2A1040",
    pillLabel: "做自己",
    enterType: "做自己",
    ghost: "breathe",
  },
  {
    id: "act-05",
    chapter: "05",
    image: "/assets/story/05-chase-v2.jpg",
    lines: ["然後牠衝了過來——嗷嗚！跑啊！"],
    aria: "第五章：狗咬住青蛙腿追逐",
    objectPosition: "68% 40%",
    objectPositionMobile: "78% 34%",
    coverScale: 1.18,
    coverScaleMobile: 1.28,
    pillBg: "#FF4EC8",
    pillFg: "#ffffff",
    pillLabel: "嗷嗚",
    enterType: "嗷嗚！",
    ghost: "chase",
  },
];

export const HERO_MASTER = "/assets/hero/hero-master-v2.jpg";

export const LOCKED_STORY_IMAGES: readonly string[] = STORY_ACTS.map((a) => a.image);

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
