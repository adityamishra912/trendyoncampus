"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  delay?: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon, delay = 0, trend }: StatCardProps) {
  return (
    <div
      className="card-entrance rounded-3xl border border-slate-700/30 bg-cyber-900/80 p-6 shadow-panel hover-lift hover-glow"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 animate-floating">
            {icon}
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-slate-400 mb-2">{title}</h3>
      <p className="text-2xl md:text-3xl font-bold text-white mb-2">{value}</p>

      {trend && (
        <p
          className={clsx(
            "text-xs font-semibold",
            trend.isPositive ? "text-green-400" : "text-red-400"
          )}
        >
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
        </p>
      )}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-12 bg-slate-800/50 rounded-lg loading-skeleton"
        />
      ))}
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
  color?: string;
  animated?: boolean;
}

export function ProgressBar({
  label,
  value,
  total,
  color = "cyan",
  animated = true,
}: ProgressBarProps) {
  const percentage = (value / total) * 100;

  const colorClasses = {
    cyan: "bg-cyan-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
  }[color] || "bg-cyan-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        <span className="text-sm text-slate-400">{value}/{total}</span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={clsx("h-full rounded-full transition-all duration-500", colorClasses, animated && "animate-pulse-soft")}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  animated?: boolean;
  className?: string;
}

export function Badge({ label, variant = "default", animated = false, className }: BadgeProps) {
  const variantClasses = {
    default: "bg-slate-700 text-slate-200",
    success: "bg-green-500/20 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    error: "bg-red-500/20 text-red-400 border border-red-500/30",
    info: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  };

  return (
    <span
      className={clsx(
        "inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300",
        variantClasses[variant],
        animated && "animate-pulse-soft",
        className
      )}
    >
      {label}
    </span>
  );
}
