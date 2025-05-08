import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  rightIcon?: React.ReactNode;
  error?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, rightIcon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {rightIcon && (
          <div className="right-3 top-1/2 absolute -translate-y-1/2">
            {rightIcon}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            rightIcon ? "pr-4" : ""
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-[4px]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
