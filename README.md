# ReplyFlowAI

ReplyFlowAI is a production-ready AI SaaS starter for Indian small businesses. It generates WhatsApp replies in English, Hindi, and Telugu using Gemini 2.0 Flash, stores reply history in Supabase, and is ready to deploy on Vercel.

## Features

- Next.js 14 App Router with TypeScript and Tailwind CSS
- Supabase authentication with protected dashboard
- Secure server API route for Gemini 2.0 Flash
- Professional, friendly, sales, and short reply generation
- Reply history saved per authenticated user
- Responsive SaaS landing page, pricing page, dashboard, loading states, and error boundaries
- Dark and light mode without extra theme dependencies
- Minimal dependency set for free-tier hosting

## Folder Structure

```txt
ReplyFlowAI/
  src/
    app/
      (auth)/login/page.tsx
      (auth)/signup/page.tsx
      (marketing)/page.tsx
      (marketing)/pricing/page.tsx
      api/generate/route.ts
      dashboard/page.tsx
      dashboard/dashboard-client.tsx
      error.tsx
      globals.css
      layout.tsx
      loading.tsx
      not-found.tsx
    components/
      ui/
        auth-form.tsx
        logout-button.tsx
        site-header.tsx
        theme-toggle.tsx
    lib/
      supabase/
        constants.ts
        gemini.ts
        types.ts
        utils.ts
        validations.ts
      middleware.ts
  supabase/schema.sql
  .env.example
  next.config.mjs
  tailwind.config.ts
  vercel.json
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env.local
```

3. Add your keys to `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

4. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

1. Create a free Supabase project.
2. Go to `SQL Editor`.
3. Copy the contents of `supabase/schema.sql`.
4. Run the SQL.
5. Go to `Authentication > Providers > Email`.
6. Enable email auth. For beginner local testing, you can temporarily disable email confirmations.
7. Copy your project URL and anon key into `.env.local`.

The app uses row level security so each user can only read, insert, and delete their own reply history.

## Gemini Setup

1. Create a Gemini API key in Google AI Studio.
2. Add it as `GEMINI_API_KEY` in `.env.local`.
3. The API route uses `gemini-2.0-flash` with JSON output and a small token limit to control cost.

## Vercel Deployment

1. Push the project to GitHub:

```bash
git init
git add .
git commit -m "Initial ReplyFlowAI app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ReplyFlowAI.git
git push -u origin main
```

2. Import the GitHub repo in Vercel.
3. Add these environment variables in Vercel:

```env
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

4. Deploy.

## Production Notes

- Keep `GEMINI_API_KEY` server-only. Never expose it with a `NEXT_PUBLIC_` prefix.
- Supabase RLS policies are required before launch.
- Review generated replies before sending them to customers.
- For a paid SaaS version, add billing, usage limits, and team accounts.

## Useful Commands

```bash
npm run dev
npm run lint
npm run type-check
npm run build
```