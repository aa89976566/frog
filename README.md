# 嗷嗚計畫｜青蛙誰在怕

Furmosa 匠寵 brand experience — an Awwwards-style interactive story for Taiwanese dog owners.

> 青蛙從來沒嚇到狗。牠嚇到的，是你。

## Stack

- Next.js · React · Tailwind CSS
- GSAP + ScrollTrigger · Lenis · Framer Motion

## Develop

```bash
npm install
npm run dev
```

## Homepage render path (single mount)

1. `FilmHero` — first-screen hero (via `ScrollFilm`)
2. Five-act scroll film — `ScrollFilm` + `STORY_ACTS` / `HERO_MASTER` in `src/lib/story.ts`
3. Close — campaign close CTA

Obsolete section components live under `src/components/_archive` and are not mounted.
