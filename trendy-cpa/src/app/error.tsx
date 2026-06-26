"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] px-6 py-10">
      <div className="max-w-xl rounded-[2rem] border border-[#D4AF37]/30 bg-gradient-to-br from-white/50 to-[#FAF4D3]/50 p-10 text-center shadow-lg">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#2D2926]">Something went wrong</h1>
        <p className="mt-4 text-[#6D4C41]">We hit a glitch in the TCAP engine. Try refreshing or return to the home portal.</p>
        <button onClick={() => reset()} className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-6 py-3 text-sm font-semibold text-[#2D2926] transition hover:shadow-lg hover:shadow-[#B8860B]/40">
          Reload page
        </button>
      </div>
    </div>
  );
}
