# Majd portfolio

Next.js App Router, React, TypeScript, Tailwind CSS, next-intl, and Supabase.
An author homepage with a muted gold library theme, responsive header and hero,
and English / Arabic layouts. Includes accessible mobile navigation, an About section,
a selected work section with reusable book cards, and a quote section.

## UI foundation

shadcn/ui uses the Base UI Nova style. Components live in `src/components/ui`;
add more with `npx shadcn@latest add <component>`. Configuration lives in
`components.json`, and shared theme tokens live in `src/app/globals.css`.
The reference-inspired light palette pairs warm ivory backgrounds (`#E8E1D4`)
with tobacco brown (`#615039`), aged parchment book covers (`#E3C58F`), antique
gold borders, and small terracotta accents (`#B87554`). Section surfaces and
borders stay subtle while text and buttons retain readable contrast.
Typography uses Cormorant Garamond, Manrope, and Noto Naskh Arabic via `next/font`.

Homepage motion uses a shared IntersectionObserver and the Web Animations API
in `src/components/scroll-animations.tsx`. Sections reveal once with small staggered
delays. Content stays visible without JavaScript; keyboard focus cancels reveals.
The hero includes a clickable story card with a continuous page-turn animation.
It pauses on hover or keyboard focus. All motion respects `prefers-reduced-motion`.

Homepage sections live in `src/components/home-hero.tsx` and
`src/components/site-header.tsx`. All copy lives in the locale message files.
Work entries live in `src/content/works.ts`. Glimmer has a localized detail page at
`/en/work/glimmer` and `/ar/work/glimmer`. Set its `amazonUrl` to enable the Amazon
purchase button; until then, the button is disabled with a visible explanation.
Set `storeUrl` later to make the store the primary purchase option, while keeping
Amazon as a secondary link. `coverSrc` accepts the real book cover when ready.

Set `portraitSrc` in `src/content/author.ts` to replace the portrait placeholder.
The About section uses a deep brown background inspired by the supplied swatch,
with scoped parchment and gold text colors. Add profile URLs in `author.socials`
to activate Instagram, WhatsApp, and Facebook links. WhatsApp expects a `wa.me`
URL with the international phone number. Icons stay disabled until configured.
Brand icons come from [Bootstrap Icons](https://github.com/twbs/icons) (MIT).
The quote is explicitly labelled as sample text; replace the `Quote` messages in
both language files with the approved quote and attribution. Synopsis and
publication details are intentionally pending until supplied.

The library photograph is served locally from `public/images/library.jpg`
(source: Unsplash, image `photo-1507842217343-583bb7270b66`).

## Development

Use Node.js 24 LTS (`.nvmrc`), or a supported Node 22 release (22.13+).

Run `npm install`, then `npm run dev`. Open http://localhost:3000.
English and Arabic are available at `/en` and `/ar`, with RTL for Arabic.
The root detects the preferred language and falls back to English.

## Supabase

Copy `.env.example` to `.env.local` and add the project URL and publishable key
from your Supabase dashboard. Never expose a service-role key in NEXT_PUBLIC variables.
The placeholder runs without credentials.

Use `createClient` from `@/lib/supabase/client` in browser components, or await
`createClient` from `@/lib/supabase/server` on the server.

No remote project, schema, or login flow has been created. When adding authentication,
combine Supabase session refresh with the locale proxy in `src/proxy.ts`.
Enable Row Level Security and define policies for database tables. Generate database
TypeScript types after creating the schema.

## Languages

Translations live in `messages/en.json` and `messages/ar.json`.
Add locales to `src/i18n/routing.ts` and create matching message files.
Use localized navigation helpers from `src/i18n/navigation.ts`.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`
