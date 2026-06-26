"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SectionCard({ title, children }: Props) {
  return (
    <section
      className="
        relative overflow-hidden rounded-3xl
        border border-[#D4AF37]/20
        bg-white/80
        p-6
        shadow-[0_20px_60px_rgba(212,175,55,0.12)]
        backdrop-blur-xl
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0
          rounded-3xl
          border border-cyan-400/10
          shadow-[0_0_60px_rgba(34,211,238,0.12)]
          pointer-events-none
        "
      />

      <h2 className="mb-8 text-2xl md:text-3xl font-bold text-[#2D2926]">
        {title}
      </h2>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}