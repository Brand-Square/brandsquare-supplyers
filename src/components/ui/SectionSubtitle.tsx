import { cn } from "@/lib/utils";

type SectionSubtitleProps = {
  text: string;
  className?: string;
};

export const SectionSubtitle = ({ text, className }: SectionSubtitleProps) => {
  return <p className={cn("text-[#6A6B72] text-lg", className)}>{text}</p>;
};
