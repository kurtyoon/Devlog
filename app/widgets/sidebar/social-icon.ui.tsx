import { Icon } from "@iconify/react";

interface SocialIconProps {
  name: string;
  link: string;
}

export function SocialIcon({ name, link }: SocialIconProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex h-10 w-10 flex-col justify-center rounded-lg transition-all hover:brightness-75 dark:hover:brightness-125">
        <div className="flex flex-row justify-center">
          <Icon icon={name} className="text-[var(--primary-color)] text-2xl" />
        </div>
      </div>
    </a>
  );
}
