import { Icon } from "@iconify/react";

interface PostCardIconProps {
  icon: string;
}

export default function PostCardIcon({ icon }: PostCardIconProps) {
  return (
    <div className="flex items-center rounded-xl p-2 bg-[var(--primary-color-lighten)] text-[var(--primary-color)]">
      <Icon icon={icon} className="text-[var(--primary-color)] text-2xl" />
    </div>
  );
}
