export type StoryAct = {
  id: string;
  chapter: string;
  image: string;
  lines: string[];
  aria: string;
};

/** Canonical five-act campaign story — captions are HTML-only */
export const STORY_ACTS: StoryAct[] = [
  {
    id: "act-01",
    chapter: "01",
    image: "/assets/story/01-hope.jpg",
    lines: ["他以為穿成這樣，大家就會喜歡他。"],
    aria: "第一章：西裝青蛙站在派對入口，期待被接受",
  },
  {
    id: "act-02",
    chapter: "02",
    image: "/assets/story/02-scare.jpg",
    lines: ["結果大家看到青蛙，還是很害怕。"],
    aria: "第二章：青蛙極端特寫，人群尖叫逃走",
  },
  {
    id: "act-03",
    chapter: "03",
    image: "/assets/story/03-dog.jpg",
    lines: ["人都跑光了。"],
    aria: "第三章：空場只剩一隻梗犬直視鏡頭",
  },
  {
    id: "act-04",
    chapter: "04",
    image: "/assets/story/04-free.jpg",
    lines: ["原來我不需要合群。", "我只需要做回自己。"],
    aria: "第四章：青蛙脫下西裝，做回自己",
  },
  {
    id: "act-05",
    chapter: "05",
    image: "/assets/story/05-chase.jpg",
    lines: ["但狗有自己的想法。"],
    aria: "第五章：狗咬住青蛙小腿玩鬧追逐",
  },
];
