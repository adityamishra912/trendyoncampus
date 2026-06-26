import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40 active:scale-95 hover:scale-105 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#2D2926] hover:opacity-95 shadow-lg shadow-[#D4AF37]/20",
        ghost: "bg-transparent border border-[#E6D28A] text-[#2D2926] hover:border-[#D4AF37] hover:text-[#2D2926] hover:bg-[#D4AF37]/5",
        outline: "border border-[#E6D28A] text-[#2D2926] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-6",
        lg: "h-14 px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export function Button({ className, variant, size, asChild = false, loading = false, disabled, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp 
      className={clsx(
        buttonVariants({ variant, size }), 
        "btn-glow",
        loading && "opacity-75 cursor-wait",
        className
      )} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <span className={loading ? "invisible" : "visible"}>
        {props.children}
      </span>
    </Comp>
  );
}
