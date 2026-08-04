<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- This is a single static-export Next.js site (`output: "export"` in `next.config.ts`) — no backend, database, or environment variables. There is only one service.
- Standard commands are in `package.json`: `npm run dev` (dev server, Turbopack, http://localhost:3000), `npm run build` (static export to `out/`), `npm run lint` (ESLint). Deploy is GitHub Pages via `.github/workflows/deploy-pages.yml`.
- `npm run lint` currently reports one pre-existing error in `src/components/sections/Hero.tsx` (`react-hooks/set-state-in-effect`). This is not an environment issue; expect a non-zero exit until the code is fixed.
- The core interactive feature is the "The Test" section (`src/components/sections/TheTest.tsx`): a press-and-hold button that must be held ~2s to trigger the reveal animation. Verify UI/interaction changes by holding the button, not just loading the page.
