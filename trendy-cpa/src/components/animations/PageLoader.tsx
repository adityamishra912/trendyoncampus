"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the loading screen
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            setIsDone(true);
          }
        });
      }
    });

    // Animate loader elements on entry
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Count loader percent from 0 to 100
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setPercent(Math.floor(counter.val));
        if (percentRef.current) {
          percentRef.current.innerText = `${Math.floor(counter.val)}%`;
        }
        if (progressLineRef.current) {
          progressLineRef.current.style.width = `${counter.val}%`;
        }
      }
    }, "-=0.3");

    // Scale down loader details slightly before slide-up
    tl.to([textRef.current, percentRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power3.in"
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1D1B18] text-[#FFF8E7] select-none"
    >
      <div className="flex flex-col items-center gap-6 max-w-md w-full px-8">
        {/* Glow behind logo */}
        <div className="absolute w-64 h-64 bg-[#D4AF37] opacity-[0.03] blur-3xl rounded-full pointer-events-none" />

        {/* Wordmark and Brand */}
        <div ref={textRef} className="flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
            <Sparkles size={14} className="text-[#D4AF37] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Voice of Campus
            </span>
          </div>
          
          <h2 className="text-4xl md:text-2xl md:text-3xl md:text-5xl font-black tracking-[0.25em] text-[#FFF8E7] bg-gradient-to-r from-[#FFFBF0] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
            TRENDY
          </h2>
          <p className="text-xs font-medium text-[#FFF8E7]/50 tracking-[0.4em] uppercase mt-1">
            Ambassador Portal
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full h-[2px] bg-[#FFF8E7]/10 rounded-full overflow-hidden mt-8 relative">
          <div
            ref={progressLineRef}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B]"
            style={{ width: "0%" }}
          />
        </div>

        {/* Percentage text */}
        <div
          ref={percentRef}
          className="text-lg font-bold font-mono tracking-widest text-[#D4AF37]/80 mt-2"
        >
          0%
        </div>
      </div>
    </div>
  );
}
