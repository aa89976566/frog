export type StoryAct = {
  id: string;
  chapter: string;
  image: string;
  lines: string[];
  aria: string;
};

/**
 * Canonical five-act campaign story.
 * Images are locked to approved JPEGs — do not regenerate or swap characters.
 * Captions are HTML-only copy.
 */
export const STORY_ACTS: StoryAct[] = [
  {
    id: "act-01",
    chapter: "01",
    image: "/assets/story/01-hope.jpg",
    lines: ["我以為穿成這樣，大家就會喜歡我。"],
    aria: "第一章：西裝青蛙站在派對入口，期待被喜歡",
  },
  {
    id: "act-02",
    chapter: "02",
    image: "/assets/story/02-scare.jpg",
    lines: ["結果他們看見我，還是嚇得四散而逃。"],
    aria: "第二章：青蛙特寫，人群四散逃離",
  },
  {
    id: "act-03",
    chapter: "03",
    image: "/assets/story/03-dog.jpg",
    lines: ["人群散去後，只有牠留在原地看著我。"],
    aria: "第三章：空場只剩一隻狗直視鏡頭",
  },
  {
    id: "act-04",
    chapter: "04",
    image: "/assets/story/04-free.jpg",
    lines: ["原來我不需要合群，我只需要做回自己。"],
    aria: "第四章：青蛙做回自己",
  },
  {
    id: "act-05",
    chapter: "05",
    image: "/assets/story/05-chase.jpg",
    lines: ["然後牠衝了過來——嗷嗚！跑啊！"],
    aria: "第五章：狗追咬青蛙玩鬧追逐，無血腥",
  },
];

/** Locked asset paths — used for build-time sanity checks */
export const LOCKED_STORY_IMAGES: readonly string[] = STORY_ACTS.map((a) => a.image);
