import { clsx } from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={clsx("rounded-3xl border border-slate-700/30 bg-cyber-900/80 p-6 shadow-panel", className)} {...props}>
      {children}
    </div>
  );
}
