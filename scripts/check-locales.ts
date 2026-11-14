import { readFile } from 'node:fs/promises';

const locales = ['tr', 'en'];

type Messages = { [key: string]: string | Messages };

function keysOf(messages: Messages, prefix = ''): string[] {
  return Object.entries(messages).flatMap(([key, value]) =>
    typeof value === 'string' ? [`${prefix}${key}`] : keysOf(value, `${prefix}${key}.`),
  );
}

async function load(locale: string) {
  const file = new URL(`../messages/${locale}.json`, import.meta.url);
  return new Set(keysOf(JSON.parse(await readFile(file, 'utf8')) as Messages));
}

const [reference, ...others] = await Promise.all(locales.map(load));
let failed = false;

for (const [index, keys] of others.entries()) {
  const locale = locales[index + 1];
  const missing = [...reference].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !reference.has(key));
  for (const key of missing) console.error(`${locale}: missing ${key}`);
  for (const key of extra) console.error(`${locale}: not in ${locales[0]}: ${key}`);
  if (missing.length || extra.length) failed = true;
}

if (failed) process.exit(1);
console.log(`messages: ${reference.size} keys match across ${locales.join(', ')}`);
