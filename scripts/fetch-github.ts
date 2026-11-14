import { mkdir, writeFile } from 'node:fs/promises';
import { profile } from '../content/profile.ts';

const login = process.env.GITHUB_LOGIN ?? profile.githubUsername;
const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
const target = new URL('../content/generated/github.json', import.meta.url);

const levels: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const query = `query($login: String!) {
  user(login: $login) {
    followers { totalCount }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
      nodes {
        isPrivate
        languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name } }
        }
      }
    }
  }
}`;

interface Day {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

interface Response {
  data?: {
    user: {
      followers: { totalCount: number };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: Day[] }[];
        };
      };
      repositories: {
        nodes: {
          isPrivate: boolean;
          languages: { edges: { size: number; node: { name: string } }[] };
        }[];
      };
    };
  };
  errors?: { message: string }[];
}

if (!token) {
  console.log('github: no token, keeping the committed snapshot');
  process.exit(0);
}

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  body: JSON.stringify({ query, variables: { login } }),
});

const payload = (await response.json()) as Response;

if (!response.ok || !payload.data) {
  const reason = payload.errors?.map((error) => error.message).join('; ') ?? response.statusText;
  console.log(`github: request failed (${reason}), keeping the committed snapshot`);
  process.exit(0);
}

const { user } = payload.data;
const calendar = user.contributionsCollection.contributionCalendar;
const days = calendar.weeks.flatMap((week) => week.contributionDays);

const sizes = new Map<string, number>();
for (const repository of user.repositories.nodes) {
  for (const edge of repository.languages.edges) {
    sizes.set(edge.node.name, (sizes.get(edge.node.name) ?? 0) + edge.size);
  }
}
const totalSize = [...sizes.values()].reduce((sum, size) => sum + size, 0);
const languages = [...sizes.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([name, size]) => ({ name, share: Math.round((size / totalSize) * 1000) / 10 }));

const snapshot = {
  fetchedAt: new Date().toISOString().slice(0, 10),
  total: calendar.totalContributions,
  followers: user.followers.totalCount,
  from: days[0].date,
  to: days[days.length - 1].date,
  weeks: calendar.weeks.map((week) => ({
    start: week.contributionDays[0].date,
    counts: week.contributionDays.map((day) => day.contributionCount),
    levels: week.contributionDays.map((day) => levels[day.contributionLevel] ?? 0),
  })),
  languages,
};

await mkdir(new URL('./', target), { recursive: true });
await writeFile(target, `${JSON.stringify(snapshot)}\n`);

console.log(`github: ${snapshot.total} contributions, ${snapshot.weeks.length} weeks`);
