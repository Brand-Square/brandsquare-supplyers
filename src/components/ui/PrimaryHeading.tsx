import { cn } from "@/lib/utils";
import { dmSans } from "../fonts";

type PrimaryHeadingProps = {
  text: string;
  className?: string;
};

export const PrimaryHeading = ({ text, className }: PrimaryHeadingProps) => {
  return (
    <h1
      className={cn(
        "text-[#2A2B2D] font-semibold md:text-3xl sm:text-2xl text-xl",
        dmSans.className,
        className
      )}
    >
      {text}
    </h1>
  );
};
