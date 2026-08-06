export type StoryAct = {
  id: string;
  chapter: string;
  image: string;
  lines: string[];
  aria: string;
  objectPosition: string;
  coverScale: number;
  pillBg: string;
  pillFg: string;
  pillLabel: string;
  /** Giant type overlay shown during transition INTO this act */
  enterType?: string;
  ghost: "scatter" | "breathe" | "chase" | "soft";
};

/**
 * Locked five-act film — do not regenerate or swap character art.
 */
export const STORY_ACTS: StoryAct[] = [
  {
    id: "act-01",
    chapter: "01",
    image: "/assets/story/01-hope.jpg",
    lines: ["我以為穿成這樣，大家就會喜歡我。"],
    aria: "第一章：西裝青蛙上半身特寫",
    objectPosition: "48% 32%",
    coverScale: 1.28,
    pillBg: "#FFF4A3",
    pillFg: "#2A1040",
    pillLabel: "希望",
    enterType: "合群？",
    ghost: "soft",
  },
  {
    id: "act-02",
    chapter: "02",
    image: "/assets/story/02-scare.jpg",
    lines: ["結果他們看見我，還是嚇得四散而逃。"],
    aria: "第二章：青蛙巨大眼睛超近特寫",
    objectPosition: "50% 18%",
    coverScale: 1.35,
    pillBg: "#FF4EC8",
    pillFg: "#ffffff",
    pillLabel: "驚散",
    enterType: "嚇跑",
    ghost: "scatter",
  },
  {
    id: "act-03",
    chapter: "03",
    image: "/assets/story/03-dog.jpg",
    lines: ["人群散去後，只有牠留在原地看著我。"],
    aria: "第三章：狗正面臉升起",
    objectPosition: "50% 38%",
    coverScale: 1.3,
    pillBg: "#7DFFB2",
    pillFg: "#2A1040",
    pillLabel: "對視",
    enterType: "只有牠",
    ghost: "soft",
  },
  {
    id: "act-04",
    chapter: "04",
    image: "/assets/story/04-free.jpg",
    lines: ["原來我不需要合群，我只需要做回自己。"],
    aria: "第四章：發光身體青蛙從底部顯現",
    objectPosition: "50% 58%",
    coverScale: 1.22,
    pillBg: "#FFF4A3",
    pillFg: "#2A1040",
    pillLabel: "做自己",
    enterType: "做自己",
    ghost: "breathe",
  },
  {
    id: "act-05",
    chapter: "05",
    image: "/assets/story/05-chase.jpg",
    lines: ["然後牠衝了過來——嗷嗚！跑啊！"],
    aria: "第五章：狗咬腿奔跑追逐",
    objectPosition: "52% 62%",
    coverScale: 1.32,
    pillBg: "#FF4EC8",
    pillFg: "#ffffff",
    pillLabel: "嗷嗚",
    enterType: "嗷嗚！",
    ghost: "chase",
  },
];

export const LOCKED_STORY_IMAGES: readonly string[] = STORY_ACTS.map((a) => a.image);

/**
 * Master timeline units (ease:none scrub).
 * Transition ≈ 1.25 vh-units (~125vh) — never a separate black page.
 */
export const FILM_SEGMENTS = {
  heroHold: 0.55,
  /** hero → act1 transition (~125vh) */
  transition: 1.25,
  actHold: 0.7,
  act5Hold: 0.95,
} as const;
