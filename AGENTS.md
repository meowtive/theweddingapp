<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a static, client-only Next.js 16 (App Router, Turbopack) wedding site in pt-BR. There is no backend, database, or external API — gifts are gifted via a PIX key rendered client-side, and content lives in `src/data/wedding.ts` and `src/data/gifts.ts`.

- Package manager: use `npm` (a `package-lock.json` is committed and the README uses npm). A `bun.lock` also exists but bun is not installed here; do not use it.
- Standard commands are in `package.json`: `npm run dev` (Turbopack dev server on port 3000), `npm run build`, `npm run start`, `npm run lint`.
- No environment variables are required. The only optional var is `NEXT_PUBLIC_SITE_URL`; `.env.example` can be copied to `.env.local` but the app runs fine without it.
- Do NOT run `npm run build` while the dev server is running — both write to `.next/` and can interfere with each other. Stop the dev server first, or build in a fresh checkout.
- The `scripts/*.mjs` files (gift image scraping) use Playwright and require `npx playwright install` browsers; they are one-off content tooling and are not needed to run or test the site.
