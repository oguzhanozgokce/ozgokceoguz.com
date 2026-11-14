import Image from 'next/image';
import { profile } from '@content/profile';
import { FlowGlow } from './flow';

interface ScreenStat {
  value: string;
  label: string;
}

interface ProfileScreenProps {
  role: string;
  nowLabel: string;
  company: string;
  companyLogo: string;
  action: string;
  stats: ScreenStat[];
}

const chips = ['Kotlin', 'Compose', 'KMP'];

export function ProfileScreen({
  role,
  nowLabel,
  company,
  companyLogo,
  action,
  stats,
}: ProfileScreenProps) {
  return (
    <div className="flex size-full flex-col bg-canvas px-[3cqw] pt-[2.8cqw] pb-[2cqw] text-on-surface">
      <div className="flex items-center justify-between px-[0.8cqw] font-mono text-[1.7cqw] leading-none text-on-surface-variant">
        <span>09:41</span>
        <span className="flex items-center gap-[0.7cqw]">
          <span className="h-[1.3cqw] w-[2.4cqw] rounded-[0.45cqw] bg-on-surface-variant" />
          <span className="size-[1.3cqw] rounded-full bg-on-surface-variant" />
        </span>
      </div>

      <div className="mt-[4.2cqw] flex flex-col items-center text-center">
        <Image
          src={profile.photo}
          alt=""
          width={160}
          height={160}
          priority
          className="size-[13cqw] rounded-full object-cover ring-[0.45cqw] ring-primary-soft"
        />
        <p className="mt-[2.2cqw] font-display text-[2.9cqw] leading-none font-semibold whitespace-nowrap">
          {profile.name}
        </p>
        <p className="mt-[1.3cqw] font-mono text-[1.75cqw] leading-none text-primary">{role}</p>
      </div>

      <div className="mt-[2.8cqw] flex justify-center gap-[1cqw]">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-neutral-soft px-[1.7cqw] py-[0.9cqw] font-mono text-[1.6cqw] leading-none text-on-surface-variant"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-[3.2cqw] flex flex-col gap-[1.5cqw]">
        <div className="relative flex items-center gap-[1.8cqw] rounded-[2.6cqw] bg-surface-raised p-[1.8cqw]">
          <FlowGlow from={0.88} to={0.97} className="rounded-[2.6cqw] ring-[0.4cqw] ring-success" />
          <Image
            src={companyLogo}
            alt=""
            width={64}
            height={64}
            className="size-[5.4cqw] shrink-0 rounded-[1.5cqw] object-cover"
          />
          <span className="flex min-w-0 flex-col gap-[0.7cqw] text-start">
            <span className="font-mono text-[1.4cqw] leading-none tracking-wider text-on-surface-variant uppercase">
              {nowLabel}
            </span>
            <span className="text-[2.1cqw] leading-none font-medium">{company}</span>
          </span>
          <span className="ms-auto me-[0.6cqw] size-[1.5cqw] shrink-0 rounded-full bg-success-solid" />
        </div>
        <div className="grid grid-cols-2 gap-[1.5cqw]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative flex flex-col gap-[0.9cqw] rounded-[2.6cqw] bg-surface-raised p-[1.8cqw] text-start"
            >
              <FlowGlow
                from={0.88}
                to={0.97}
                className="rounded-[2.6cqw] ring-[0.4cqw] ring-success"
              />
              <span className="font-display text-[3cqw] leading-none font-bold tabular-digits">
                {stat.value}
              </span>
              <span className="truncate text-[1.45cqw] leading-none text-on-surface-variant">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center gap-[2.2cqw] pt-[2cqw]">
        <span className="relative w-full overflow-hidden rounded-full bg-primary-solid py-[2cqw] text-center text-[2cqw] leading-none font-medium text-on-primary-solid">
          <FlowGlow from={0.03} to={0.09} className="bg-on-primary-solid/35" />
          <span className="relative">{action}</span>
        </span>
        <span className="h-[0.65cqw] w-[10cqw] rounded-full bg-on-surface-variant/50" />
      </div>
    </div>
  );
}
