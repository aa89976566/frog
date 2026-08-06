export type StoryAct = {
  id: string;
  chapter: string;
  image: string;
  lines: string[];
  aria: string;
  /** object-position for cinematic crop */
  objectPosition: string;
  /** Caption pill accent colors */
  pillBg: string;
  pillFg: string;
  pillLabel: string;
  /** Onion-skin mode for emotional beats */
  ghost: "none" | "scatter" | "breathe" | "chase";
  /** Giant type interlude after this chapter (optional) */
  interlude?: string;
};

/**
 * Locked five-act film strip — do not regenerate or swap character art.
 */
export const STORY_ACTS: StoryAct[] = [
  {
    id: "act-01",
    chapter: "01",
    image: "/assets/story/01-hope.jpg",
    lines: ["我以為穿成這樣，大家就會喜歡我。"],
    aria: "第一章：西裝青蛙站在派對入口，期待被喜歡",
    objectPosition: "center 42%",
    pillBg: "#F3F597",
    pillFg: "#12081c",
    pillLabel: "希望",
    ghost: "none",
    interlude: "合群？",
  },
  {
    id: "act-02",
    chapter: "02",
    image: "/assets/story/02-scare.jpg",
    lines: ["結果他們看見我，還是嚇得四散而逃。"],
    aria: "第二章：青蛙特寫，人群四散逃離",
    objectPosition: "center 28%",
    pillBg: "#FF38C7",
    pillFg: "#ffffff",
    pillLabel: "驚散",
    ghost: "scatter",
  },
  {
    id: "act-03",
    chapter: "03",
    image: "/assets/story/03-dog.jpg",
    lines: ["人群散去後，只有牠留在原地看著我。"],
    aria: "第三章：空場只剩一隻狗直視鏡頭",
    objectPosition: "center 40%",
    pillBg: "#39FF14",
    pillFg: "#12081c",
    pillLabel: "對視",
    ghost: "none",
    interlude: "只有牠",
  },
  {
    id: "act-04",
    chapter: "04",
    image: "/assets/story/04-free.jpg",
    lines: ["原來我不需要合群，我只需要做回自己。"],
    aria: "第四章：青蛙做回自己",
    objectPosition: "center 48%",
    pillBg: "#6E2DFF",
    pillFg: "#F3F597",
    pillLabel: "做自己",
    ghost: "breathe",
  },
  {
    id: "act-05",
    chapter: "05",
    image: "/assets/story/05-chase.jpg",
    lines: ["然後牠衝了過來——嗷嗚！跑啊！"],
    aria: "第五章：狗追咬青蛙玩鬧追逐，無血腥",
    objectPosition: "center 55%",
    pillBg: "#12081c",
    pillFg: "#B8FF32",
    pillLabel: "嗷嗚",
    ghost: "chase",
    interlude: "嗷嗚！",
  },
];

export const LOCKED_STORY_IMAGES: readonly string[] = STORY_ACTS.map((a) => a.image);

/** Chapter wrapper height in svh — sticky stage is 100svh inside */
export const CHAPTER_HEIGHT_SVH = 180;

/**
 * Overlap so next chapter begins ~previous progress 0.58.
 * chapterScroll ≈ CHAPTER_HEIGHT - 100; overlapFrac = 1 - 0.58.
 */
export const CHAPTER_OVERLAP_SVH =
  (1 - 0.58) * (CHAPTER_HEIGHT_SVH - 100); // ~33.6svh

/** Scroll progress bands within a chapter (0–1 sticky range) */
export const SCROLL_RANGES = {
  /** Incoming plate: rise / unclip / settle (driven by chapter top travel) */
  incomingStart: 0,
  incomingEnd: 0.42,
  /** Hold cinematic plate */
  holdEnd: 0.58,
  /** Outgoing under next plate: scale up + darken — next begins ~here */
  outgoingStart: 0.58,
  outgoingEnd: 0.82,
  /** Fully covered / release */
  releaseEnd: 1,
} as const;
