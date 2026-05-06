# أكاديمية كود سبارك

Landing page for CodeSpark Academy built with React, Next.js, Tailwind CSS, and a static export suitable for Cloudflare Pages.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The static Cloudflare Pages output is generated in `out/`.

## Deploy With GitHub Actions

1. Create a GitHub repository and push this project to the `main` branch.
2. In Cloudflare Pages, create a project named `codespark`.
3. Add these GitHub repository secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Push to `main`, or run the `Deploy to Cloudflare Pages` workflow manually.

Cloudflare Pages build settings, if you connect the repository directly:

- Build command: `npm run build`
- Output directory: `out`
- Node.js version: `22`
- Deploy command: leave empty, or use `npm run deploy`

If your Cloudflare project runs a deploy command, use:

```bash
npm run deploy
```

The included `wrangler.jsonc` points Wrangler at the static Next export in `out/`, so `npx wrangler deploy` also works for Cloudflare Workers static assets.

## Lead Capture Worker

The form posts to:

```txt
POST /api/leads
```

Payload:

```json
{
  "email": "parent@example.com",
  "childAge": "10-12"
}
```

The Worker validates the fields, then uses the first configured capture method:

1. `LEADS_KV` binding: stores each lead in Workers KV.
2. `LEADS_WEBHOOK_URL` secret: forwards each lead as JSON to your webhook.

Webhook setup:

```bash
npx wrangler secret put LEADS_WEBHOOK_URL
```

Or add `LEADS_WEBHOOK_URL` in Cloudflare dashboard under Workers > codespark > Settings > Variables and Secrets.

KV setup:

1. Create a KV namespace in Cloudflare.
2. Add a Worker binding named `LEADS_KV`.
3. Redeploy.

For local Worker testing:

```bash
npm run build
npm run worker:dev
```
