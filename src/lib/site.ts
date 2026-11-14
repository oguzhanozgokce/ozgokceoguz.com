export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ozgokceoguz.com').replace(
  /\/+$/,
  '',
);

export const sections = ['experience', 'projects', 'stack', 'writing', 'contact'] as const;

export type SectionId = (typeof sections)[number];
