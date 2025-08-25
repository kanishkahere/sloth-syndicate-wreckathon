import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const slothButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        chaos: "sloth-button-primary hover-tilt",
        destructive: "sloth-button-chaos hover-tilt", 
        roast: "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground italic",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline sloth-text-roast",
        procrastinate: "bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow animate-pulse-glow"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "chaos",
      size: "default"
    }
  }
);

export interface SlothButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof slothButtonVariants> {
  asChild?: boolean;
}

const SlothButton = React.forwardRef<HTMLButtonElement, SlothButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(slothButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
SlothButton.displayName = "SlothButton";

export { SlothButton, slothButtonVariants };