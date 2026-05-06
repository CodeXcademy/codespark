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

Do not use `npx wrangler deploy` for this project. That command targets Cloudflare Workers/OpenNext and expects a `.next/standalone` bundle. This app is a static Next export, so Cloudflare Pages must deploy the `out/` directory.
