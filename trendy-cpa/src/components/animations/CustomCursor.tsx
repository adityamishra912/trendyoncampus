"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      // Small dot follows coordinates exactly
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      // Outer ring follows with a slight delay (smooth trail)
      gsap.to(cursorRingRef.current, {
        x: e.clientX - 16, // center the 32px ring
        y: e.clientY - 16,
        duration: 0.3,
        ease: "power3.out"
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Expand cursor when hovering over interactive elements
      const isHoverable = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".group") ||
        target.closest(".domain-card") ||
        target.closest(".faq-item") ||
        target.style.cursor === "pointer";

      if (isHoverable) {
        gsap.to(cursorRingRef.current, {
          scale: 1.8,
          borderColor: "#D4AF37",
          backgroundColor: "rgba(212, 175, 55, 0.15)",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursorDotRef.current, {
          scale: 0.5,
          backgroundColor: "#D4AF37",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(cursorRingRef.current, {
          scale: 1,
          borderColor: "rgba(212, 175, 55, 0.5)",
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursorDotRef.current, {
          scale: 1,
          backgroundColor: "#B8860B",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const onMouseDown = () => {
      gsap.to([cursorRingRef.current, cursorDotRef.current], {
        scale: 0.8,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const onMouseUp = () => {
      gsap.to([cursorRingRef.current, cursorDotRef.current], {
        scale: 1,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Hide default cursor on body
    // document.body.style.cursor = "none";
    // const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, select, textarea");
    // interactiveElements.forEach(el => {
    //   (el as HTMLElement).style.cursor = "none";
    // });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#D4AF37]/50 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
      />
      {/* Inner precise dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#B8860B] rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate3d(-5px, -5px, 0)", willChange: "transform" }}
      />
    </>
  );
}
