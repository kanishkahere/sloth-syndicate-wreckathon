import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const slothButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all transform-gpu will-change-transform focus-visible:outline-2 focus-visible:outline-[#00FFFF] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.03]",
  {
    variants: {
      variant: {
        chaos: "sloth-button-primary",
        destructive: "sloth-button-chaos",
        roast: "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground italic",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline sloth-text-roast",
        procrastinate: "bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow animate-pulse-glow",
      },
      size: {
        default: "h-12 px-5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "chaos",
      size: "default",
    },
  }
);

export interface SlothButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof slothButtonVariants> {
  asChild?: boolean;
}

const SlothButton = React.forwardRef<HTMLButtonElement, SlothButtonProps>(
  ({ className, variant, size, asChild = false, onMouseEnter, onMouseDown, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      try { window.dispatchEvent(new CustomEvent("vortex:blip")); } catch {}
      onMouseEnter?.(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Micro-bounce 1.06 -> 1 using Web Animations API
      try {
        (e.currentTarget as HTMLElement).animate(
          [
            { transform: "scale(1.06)" },
            { transform: "scale(1.00)" },
          ],
          { duration: 160, easing: "cubic-bezier(0.68,-0.55,0.265,1.55)" }
        );
      } catch {}
      onMouseDown?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    };

    return (
      <Comp
        className={cn(slothButtonVariants({ variant, size, className }))}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
SlothButton.displayName = "SlothButton";

export { SlothButton, slothButtonVariants };
