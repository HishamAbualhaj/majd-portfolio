# Majd portfolio

Next.js App Router, React, TypeScript, Tailwind CSS, next-intl, and Supabase.
Minimal placeholder styling; the design theme will be selected later.

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
