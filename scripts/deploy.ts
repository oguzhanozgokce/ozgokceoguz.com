import { existsSync } from 'node:fs';
import { deploy } from '@samkirkland/ftp-deploy';

const live = process.argv.includes('--live');
const required = ['FTP_SERVER', 'FTP_USERNAME', 'FTP_PASSWORD'] as const;
const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(
    `deploy: missing ${missing.join(', ')}. Put them in .env.local (see .env.example).`,
  );
  process.exit(1);
}

if (!existsSync('out/tr/index.html') || !existsSync('out/en/index.html')) {
  console.error('deploy: out/ is missing or incomplete. Run `npm run build` first.');
  process.exit(1);
}

console.log(
  live
    ? 'deploy: uploading out/ to the server'
    : 'deploy: dry run, nothing is changed. Use `npm run deploy:live` to upload.',
);

await deploy({
  server: process.env.FTP_SERVER as string,
  username: process.env.FTP_USERNAME as string,
  password: process.env.FTP_PASSWORD as string,
  protocol: process.env.FTP_PROTOCOL === 'ftps' ? 'ftps' : 'ftp',
  'local-dir': './out/',
  'server-dir': process.env.FTP_SERVER_DIR ?? '/public_html/',
  'dry-run': !live,
  exclude: ['**/.git*', '**/.git*/**', '**/node_modules/**', 'api/**'],
  'log-level': 'standard',
});
