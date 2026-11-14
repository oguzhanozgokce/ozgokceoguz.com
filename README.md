# ozgokceoguz.com

The source of [ozgokceoguz.com](https://ozgokceoguz.com), my personal site. It is a Next.js 16 static export built with React 19, Tailwind CSS 4, [Highwren UI](https://ui.highwren.com) and Motion, in Turkish and English.

## Run

```sh
nvm use
npm ci
npm run dev
```

Open `http://localhost:3000/tr/`. `npm run build` writes the static site to `out/`, and `npm run start` serves it. `npm run check` runs types, lint, formatting, the locale parity check and the secret scan.

## Layout

| Path                     | Owns                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| `content/`               | Profile, experience, projects, stack and articles, in both languages |
| `messages/`              | Interface strings (`tr.json`, `en.json`)                             |
| `src/app/[locale]/`      | Routes; `lab/` is the page where design decisions are tried out      |
| `src/features/`          | One folder per page section                                          |
| `src/components/motion/` | Motion primitives: reveal, split text, magnetic, spotlight           |
| `src/components/ds/`     | Highwren UI components, installed as source                          |
| `src/components/layout/` | Header, footer, command palette, theme, accent and language controls |
| `styles/`                | Highwren theme and the generated accent palettes                     |
| `public/.htaccess`       | Server rules: language redirect, caching, security headers           |

## Working notes

- Accent colours live in `src/lib/seeds.ts`. After changing them, run `npm run generate`.
- GitHub numbers are a committed snapshot in `content/generated/github.json`. Refresh it with `GITHUB_TOKEN=$(gh auth token) npm run data:github`; without a token the snapshot is kept.
- Add a Highwren component with `npx shadcn@4.23.0 add @ds/<name>`.
- Language is resolved in this order: the locale in the URL, the visitor's saved choice, the browser languages, then English. Location is never used.
- No secrets belong in this repository. `npm run check:secrets` scans every tracked file and is part of `npm run check`. Local values go in `.env.local` (see `.env.example`).

## Branches and releases

- Work happens on `develop`, directly or through feature branches. Every push and pull request runs the checks and a build (`.github/workflows/ci.yml`).
- `main` only receives pull requests, and the `Verify` check has to pass first.
- A merge into `main` builds, deploys, then tags the deployed commit as `vYYYY.MM.DD.N` and attaches the built site as `site.zip` (`.github/workflows/deploy.yml`).
- To roll back, run the Deploy workflow by hand with an older release tag as `ref`. Tick dry-run first to see what would change on the server.
- `scripts/protect-branches.sh owner/name` applies these branch and tag rules to a repository.

## Deploying

- The workflow needs the repository secrets `HOSTINGER_FTP_SERVER`, `HOSTINGER_FTP_USERNAME` and `HOSTINGER_FTP_PASSWORD`. `GH_STATS_TOKEN` (read:user) is optional and refreshes the GitHub numbers on every build and once a week.
- The server also hosts a PHP API under `/api`, kept in a separate private repository. Every deploy excludes `api/**`, so the sync never uploads or deletes it.
- Without CI: put `FTP_*` in `.env.local`, then `npm run build && npm run deploy:dry`, and `npm run deploy:live` once the list looks right. It uses the same sync engine and state file as the workflow.

## License

The code is released under the [MIT License](LICENSE). The components in `src/components/ds`, `src/lib/ds`, `src/hooks/ds` and `styles/ds` come from Highwren UI under Apache-2.0; see `licenses/ds`.

The licence does not cover the content: the texts in `content/` and `messages/`, the photos, logos, screenshots and documents under `public/assets`, and my name and likeness. Please do not reuse those.
