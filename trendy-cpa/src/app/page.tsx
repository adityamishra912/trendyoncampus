
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {Info, Zap, User, Briefcase, Settings, Target, Sparkles, ArrowRight, Users, Award, Palette, Code2, Megaphone, Calendar, Heart, Camera, ChevronDown, Instagram, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { signInWithGoogle } from "@/services/auth";
import { teamMembers } from "@/constants/team";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
const domains = [
  {
    title: "Creative",
    icon: Palette,
    color: "from-pink-500 to-red-400",
    top: "10%",
    left: "15%",
  },
  {
    title: "Web Development",
    icon: Code2,
    color: "from-cyan-500 to-blue-500",
    top: "15%",
    right: "15%",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    color: "from-yellow-500 to-orange-500",
    top: "35%",
    left: "5%",
  },
  {
    title: "Event Management",
    icon: Calendar,
    color: "from-purple-500 to-pink-500",
    top: "35%",
    right: "5%",
  },
  {
    title: "Social Outreach",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    bottom: "12%",
    left: "18%",
  },
  {
    title: "Media & Publicity",
    icon: Camera,
    color: "from-sky-500 to-cyan-500",
    bottom: "12%",
    right: "18%",
  },
];


export default function GoldenHomePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const techfestRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");
const [mobileMenu, setMobileMenu] = useState(false);
useEffect(() => {
  document.body.style.overflow =
    mobileMenu ? "hidden" : "auto";
}, [mobileMenu]);

  useEffect(() => {
    
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    // Scroll detection for active section
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "trendyfest", ref: techfestRef },
        { id: "domains", ref: domainsRef },
        { id: "team", ref: teamRef },
        { id: "faq", ref: faqRef }
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      home: heroRef,
      about: aboutRef,
      trendyfest: techfestRef,
      domains: domainsRef,
      team:teamRef,
      faq: faqRef
    };

    const targetRef = refs[sectionId];
    if (targetRef?.current) {
      const offsetTop = targetRef.current.offsetTop;
      gsap.to(window, { scrollTo: { y: offsetTop, autoKill: false }, duration: 1, ease: "power2.inOut" });
      setActiveSection(sectionId);
    }
  };

  useGSAP(() => {
    if (!isMounted) return;

    gsap.registerPlugin(ScrollToPlugin);

    // 0. Navigation Animations
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // 1. Hero Animations (Premium Split-Line & Stagger)
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Clear initial states
    gsap.set(".hero-title-line", { yPercent: 100 });
    gsap.set([".hero-desc", ".hero-buttons", ".hero-stats"], { opacity: 0, y: 20 });

    tl.to(".hero-title-line", { yPercent: 0, duration: 1.2, stagger: 0.15 })
      .to(".hero-desc", { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
      .to(".hero-buttons", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to(".hero-stats", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(".hero-card", { opacity: 0, scale: 0.9, rotationY: -10 }, { opacity: 1, scale: 1, rotationY: 0, duration: 1.2 }, "-=1");

    // Subtle auto-floating animation for Hero Card
    gsap.to(".hero-card-floating-wrapper", { y: -15, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });

    // Interactive 3D tilt for Hero Card
    const heroCard = containerRef.current?.querySelector(".hero-card") as HTMLElement;
    const heroSection = heroRef.current;
   let cleanupHero: (() => void) | undefined;

if (window.innerWidth > 768 && heroSection && heroCard) {
  const onHeroMouseMove = (e: MouseEvent) => {
    const rect = heroSection.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(heroCard, {
      rotationY: xVal * 20,
      rotationX: -yVal * 20,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const onHeroMouseLeave = () => {
    gsap.to(heroCard, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  heroSection.addEventListener("mousemove", onHeroMouseMove);
  heroSection.addEventListener("mouseleave", onHeroMouseLeave);

  cleanupHero = () => {
    heroSection.removeEventListener(
      "mousemove",
      onHeroMouseMove
    );
    heroSection.removeEventListener(
      "mouseleave",
      onHeroMouseLeave
    );
  };
}

    // 2. Flip Animation for About Us
    gsap.to(".flip-card-about", {
      rotationY: 180,
      ease: "none",
      scrollTrigger: { trigger: ".about-trigger", start: "top 70%", end: "top 20%", scrub: 1 }
    });

    // 3. Slide-Up Animation for Techfest (Enhanced Stacking/Rendering)
    gsap.set(".back-side", { yPercent: 100, autoAlpha: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: ".techfest-trigger",
        start: "top 75%",
        end: "top 25%",
        scrub: 1.5,
      }
    })
      .to(".front-side", { yPercent: -100, ease: "power2.inOut" })
      .to(".back-side", { yPercent: 0, autoAlpha: 1, ease: "power2.inOut" }, "<");

    // 4. Resume Card Rolling & Tilting Effect (Tied to Scroll)
    const resumeTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".resume-section",
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1.2,
      }
    });

    resumeTL.fromTo(cardRef.current,
      { rotationX: -60, rotationY: -30, scale: 0.8, opacity: 0 },
      { rotationX: 0, rotationY: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.8 },
      0
    );

    resumeTL
      .to(cardRef.current, { rotationZ: -8, duration: 0.5 }, 0.2)
      .to(cardRef.current, { rotationZ: 8, duration: 0.4 }, 0.7)
      .to(cardRef.current, { rotationZ: -4, duration: 0.3 }, 1.1)
      .to(cardRef.current, { rotationZ: 0, duration: 0.3 }, 1.4);

    // 5. Domain Cards Stagger Animation
    gsap.fromTo(".domain-card",
      { opacity: 0, y: 40, rotationY: -20 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".domains-section",
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        }
      }
    );

    // 3D Mouse hover tilt for Desktop Domain Cards
    const desktopDomainCards = containerRef.current?.querySelectorAll(".domains-card-desktop");
    if (window.innerWidth > 1024) {
      desktopDomainCards?.forEach((card) => {
        const onCardMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const xc = rect.width / 2;
          const yc = rect.height / 2;
          const angleX = (yc - y) / 15;
          const angleY = (x - xc) / 15;

          gsap.to(card, {
            rotationX: angleX,
            rotationY: angleY,
            transformPerspective: 1200,
            ease: "power2.out",
            duration: 0.4
          });
        };

        const onCardMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: "power2.out",
            duration: 0.6
          });
        };

        card.addEventListener("mousemove", onCardMouseMove);
        card.addEventListener("mouseleave", onCardMouseLeave);
      });
    }

    // 6. Domain Title Animation
    gsap.fromTo(".domains-title",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".domains-section",
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
        }
      }
    );

    // Desktop Domain Cards Animation - Staggered with 3D effect
    gsap.fromTo(".domains-card-desktop",
      { opacity: 0, y: 40, rotationY: -15, rotationX: 10 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "back.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".domains-section",
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        }
      }
    );

    // Tablet Domain Cards Animation
    gsap.fromTo(".domains-card-tablet",
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".domains-section",
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        }
      }
    );

    // Mobile Domain Cards Animation - Vertical sliding entrance
    gsap.fromTo(".domains-card-mobile",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".domains-section",
          start: "top 75%",
          end: "top 20%",
          scrub: 1,
        }
      }
    );

    // 7. FAQ Title Animation
    gsap.fromTo(".faq-title",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
        }
      }
    );
    gsap.fromTo(".team-card", 
  { opacity: 0, y: 50 },
  { 
    opacity: 1, 
    y: 0, 
    stagger: 0.1, 
    duration: 0.8, 
    scrollTrigger: { 
      trigger: "#team", 
      start: "top 80%" 
    } 
  }
);

    // 8. FAQ Items Stagger Animation
    gsap.fromTo(
  ".faq-item",
  {
    opacity: 0,
    y: 20
  },
  {
    opacity: 1,
    y: 0,
    stagger: 0.1
  }
);

    ScrollTrigger.refresh();
    return () => {
  cleanupHero?.();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
  }, { scope: containerRef, dependencies: [isMounted] });

  if (!isMounted) return null;

  // Authentication
  const handleApplyNow = () => {
    router.push("/auth");
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#1a1410]/95 via-[#2D2926]/90 to-[#3d3632]/85 text-white px-4 sm:px-8 py-4 sm:py-6 font-sans overflow-x-hidden">
      {/* Subtle animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#B8860B]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Animated Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="cursor-pointer" onClick={() => scrollToSection("home") }>
            <img src="/logo.png" alt="Trendy" className="h-14 md:h-16" />
          </div>

          <button
            onClick={handleApplyNow}
            className="absolute right-4 md:right-10 top-4 md:top-[50%] md:-translate-y-[50%] bg-gradient-to-r from-[#B8860B] to-[#8B6F47] text-white px-5 py-2 sm:px-6 rounded-full text-sm font-bold shadow-lg shadow-[#B8860B]/20 hover:shadow-xl hover:shadow-[#B8860B]/40 hover:scale-105 transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 min-h-screen py-24 flex items-end"
      >
        <video
          src="/videos/trendyfest.mp4.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr] items-end">
            <div className="space-y-8 pb-16 lg:pb-24">
              <p className="text-sm uppercase tracking-[0.35em] text-[#FFD700]/90 font-semibold">
                Campus Ambassador Program
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-white">
                Voice of Campus
                <span className="block text-[#D4AF37]">Lead the change.</span>
              </h1>

              <p className="max-w-2xl text-base md:text-lg text-white/85 leading-relaxed tracking-wide">
                TRENDY empowers student leaders to build campus campaigns, grow communities, and unlock real-world opportunities across colleges nationwide.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button onClick={handleApplyNow} className="relative inline-flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-7 py-4 text-lg font-black text-white shadow-2xl shadow-[#B8860B]/30 transition duration-300 hover:-translate-y-0.5">
                  Apply Now
                </button>
                <button onClick={() => scrollToSection("about")} className="inline-flex items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 px-7 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-white/15">
                  Learn More
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl md:text-4xl font-black text-[#D4AF37]">500+</p>
                  <p className="text-sm text-white/80 mt-2">Students Impacted</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl md:text-4xl font-black text-[#D4AF37]">5+</p>
                  <p className="text-sm text-white/80 mt-2">Colleges Nationwide</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/90 font-semibold mb-4">Why TRENDY</p>
                <ul className="space-y-5 text-white/85">
                  <li className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="font-black text-lg">Real Campus Impact</p>
                    <p className="text-sm text-white/75 mt-2">Lead high-visibility student events and campaigns.</p>
                  </li>
                  <li className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="font-black text-lg">Professional Growth</p>
                    <p className="text-sm text-white/75 mt-2">Gain experience that belongs on your resume.</p>
                  </li>
                  <li className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="font-black text-lg">Community Rewards</p>
                    <p className="text-sm text-white/75 mt-2">Earn certifications, recognition, and campus perks.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce z-20">
          <ChevronDown size={36} />
        </div>
      </section>

      {/* About & Festival Section */}
      <section
        ref={aboutRef}
        id="about"
        className="max-w-7xl mx-auto py-24 sm:py-32 px-4 sm:px-6 lg:px-8 space-y-20"
      >
        <div className="grid gap-12 lg:grid-cols-[0.95fr_0.95fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]/80 font-semibold">Our Mission</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              Build student leaders through strategy, creativity, and community.
            </h2>
            <p className="text-base md:text-lg text-[#E8D69B]/90 leading-relaxed max-w-2xl">
              TRENDY Campus Ambassador Program is a premium student leadership experience designed to help campus innovators build skills, run campaigns, and earn recognition while connecting with like-minded peers.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-white/5 backdrop-blur-sm p-6 shadow-lg shadow-[#B8860B]/10">
                <h3 className="text-xl font-black text-[#D4AF37] mb-3">Campus Growth</h3>
                <p className="text-sm text-[#E8D69B]/80 leading-relaxed">Lead events and outreach that create long-term campus impact.</p>
              </div>
              <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-white/5 backdrop-blur-sm p-6 shadow-lg shadow-[#B8860B]/10">
                <h3 className="text-xl font-black text-[#D4AF37] mb-3">Career Skills</h3>
                <p className="text-sm text-[#E8D69B]/80 leading-relaxed">Gain real-world experience in marketing, operations, and leadership.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white/5 backdrop-blur-sm p-8 sm:p-10 border border-[#D4AF37]/20 shadow-2xl shadow-black/30">
              <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/70 font-semibold mb-4">Program Highlights</p>
              <div className="space-y-5">
                <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                  <p className="font-black text-lg text-white">Student-led impact</p>
                  <p className="text-sm text-[#E8D69B] mt-2">Design and deliver campaigns that matter on campus.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                  <p className="font-black text-lg text-white">Peer network</p>
                  <p className="text-sm text-[#E8D69B] mt-2">Collaborate with students across colleges on meaningful projects.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                  <p className="font-black text-lg text-white">Recognition</p>
                  <p className="text-sm text-[#E8D69B] mt-2">Earn certificates, rewards, and leadership credibility.</p>
                </div>
              </div>
            </div>

            <div ref={techfestRef} className="rounded-[2rem] border border-[#D4AF37]/30 bg-white/5 backdrop-blur-sm p-8 sm:p-10 shadow-2xl shadow-[#B8860B]/10">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#D4AF37]/20 px-4 py-2 text-sm font-semibold text-[#D4AF37] mb-6">
                <Zap size={18} className="text-[#D4AF37]" /> TrendyFest</div>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">A festival for innovation, culture, and student leadership.</h3>
              <p className="text-sm md:text-base text-[#E8D69B]/80 leading-relaxed mb-8">TrendyFest brings together student creators, organizers, and future leaders for immersive workshops, live events, and campus showcases.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#D4AF37]/30 bg-white/5 p-5">
                  <p className="font-black text-[#D4AF37]">Live events</p>
                  <p className="text-sm text-[#E8D69B]/80 mt-2">Hands-on sessions, panels, and competitions.</p>
                </div>
                <div className="rounded-3xl border border-[#D4AF37]/30 bg-white/5 p-5">
                  <p className="font-black text-[#D4AF37]">Student success</p>
                  <p className="text-sm text-[#E8D69B]/80 mt-2">Showcase your work, win rewards, and build your profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Card Section (Rolling) */}
      <section className="resume-section max-w-5xl mx-auto mb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-[#D4AF37] to-[#E8D69B] bg-clip-text text-transparent">Build Your Resume</h2>
          <p className="text-lg text-[#E8D69B]/80 max-w-md mx-auto">Showcase your journey, skills, and achievements in an impressive professional portfolio.</p>
        </div>

        <div
          ref={cardRef}
          className="relative w-full group rounded-[2rem] shadow-2xl shadow-[#B8860B]/40 overflow-hidden"
        >
          {/* Animated Border Gradient */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6F47] rounded-[2rem] opacity-100 -z-10 group-hover:opacity-100 blur-lg transition-opacity duration-300"></div>

          <div className="bg-gradient-to-br from-[#2D2926]/80 to-[#1a1410]/80 backdrop-blur-sm rounded-[2rem] p-4 sm:p-5 md:p-12 border border-[#D4AF37]/20">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 md:mb-12 pb-4 md:pb-8 border-b-2 border-[#D4AF37]/30">
              <div className="p-3 md:p-4 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-2xl text-white shadow-lg shadow-[#D4AF37]/30">
                <User size={28} className="md:w-7 md:h-7"  />
              </div>
              <div>
                <h3 className="font-black text-2xl tracking-tight text-white">Professional Portfolio</h3>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">⚡ Dashboard Active</p>
              </div>
            </div>

            {/* List Items */}
            <div className="space-y-3 md:space-y-6 mb-6 md:mb-12">
              {[
                { title: "Internships", icon: Briefcase, desc: "Showcase real-world experience", color: "from-[#D4AF37] to-[#B8860B]" },
                { title: "Projects", icon: Settings, desc: "Display innovative work", color: "from-[#B8860B] to-[#8B6F47]" },
                { title: "Skills & Achievements", icon: Target, desc: "Highlight your expertise", color: "from-[#8B6F47] to-[#6D4C41]" }
              ].map((item, i) => (
                <div key={i} className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#B8860B]/10 transition-all duration-300">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md flex-shrink-0`}>
                    <item.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-white text-lg">{item.title}</h4>
                    <p className="text-sm text-[#E8D69B]/80 font-medium">{item.desc}</p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] animate-pulse flex-shrink-0 mt-2"></div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 rounded-2xl border border-[#D4AF37]/20">
              <div className="text-center">
                <p className="font-black text-2xl text-[#D4AF37]">1000+</p>
                <p className="text-xs text-[#E8D69B]/80 font-semibold mt-1">Ambassadors</p>
              </div>
              <div className="text-center sm:border-l sm:border-r border-[#D4AF37]/30">
                <p className="font-black text-2xl text-[#D4AF37]">500K+</p>
                <p className="text-xs text-[#E8D69B]/80 font-semibold mt-1">Opportunities</p>
              </div>
              <div className="text-center">
                <p className="font-black text-2xl text-[#D4AF37]">100%</p>
                <p className="text-xs text-[#E8D69B]/80 font-semibold mt-1">Visible</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#2D2926] font-black tracking-wide hover:from-[#FFD700] hover:to-[#D4AF37] transition-all duration-300 shadow-xl shadow-[#B8860B]/30 active:scale-[0.98] text-lg flex items-center justify-center gap-2 group/btn">
              <span>Edit & Build Portfolio</span>
              <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Explore Domains Section */}
      <section ref={domainsRef} className="domains-section max-w-7xl mx-auto py-24 sm:py-32 space-y-16 px-4 sm:px-6 lg:px-8">
        <div className="domains-title text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 px-4 py-2 text-[#D4AF37]">
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37]">Six Amazing Domains</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
            Explore Your Path
          </h2>
          <p className="text-lg text-[#E8D69B]/80 max-w-2xl mx-auto font-medium">
            Choose your domain and join a community of passionate ambassadors shaping the future.
          </p>
        </div>

        {/* Desktop Layout - 3 Column Masonry */}
        <div className="hidden lg:grid grid-cols-3 gap-8 auto-rows-max">
          {domains.map((domain, index) => (
            <div
              key={index}
              className={`domains-card-desktop group rounded-[2.5rem] border border-[#D4AF37]/30 bg-gradient-to-br from-white/5 to-[#D4AF37]/5 backdrop-blur-sm p-8 shadow-xl shadow-[#D4AF37]/10 transition-all duration-500 hover:border-[#D4AF37]/70 hover:bg-white/15 hover:shadow-2xl hover:shadow-[#D4AF37]/30 overflow-hidden relative
              ${index % 3 === 1 ? 'lg:mt-12' : ''}
              ${index % 3 === 2 ? 'lg:mt-24' : ''}`}
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${domain.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-current/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <domain.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">{domain.title}</h3>
              <p className="text-sm text-[#E8D69B]/80 leading-relaxed mb-6">
                Build your campus presence, gain leadership experience, and contribute to real college campaigns.
              </p>
              <button className="group/btn opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-[#D4AF37] font-black text-sm hover:text-[#FFD700]">
                Learn More <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Tablet Layout - 2 Column Grid */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {domains.map((domain, index) => (
            <div
              key={index}
              className="domains-card-tablet group rounded-[2rem] border border-[#D4AF37]/30 bg-white/5 backdrop-blur-sm p-8 shadow-xl shadow-[#D4AF37]/10 transition-all duration-400 hover:border-[#D4AF37]/60 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D4AF37]/20 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10"></div>

              <div className={`w-18 h-18 rounded-3xl bg-gradient-to-r ${domain.color} flex items-center justify-center text-white mb-5 transition-transform duration-400 group-hover:scale-105 group-hover:-rotate-3`}>
                <domain.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{domain.title}</h3>
              <p className="text-sm text-[#E8D69B]/80 leading-relaxed">
                Build your campus presence, gain leadership experience, and contribute to real college campaigns.
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Layout - Vertical Sliding Cards */}
        <div className="md:hidden space-y-6">
          {domains.map((domain, index) => (
            <div
              key={index}
              className={`domains-card-mobile group rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-r from-white/5 to-[#D4AF37]/5 backdrop-blur-sm p-6 shadow-lg shadow-[#D4AF37]/5 transition-all duration-400 hover:border-[#D4AF37]/50 hover:bg-white/10 active:scale-95`}
            >
              <div className="flex gap-4 items-start">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${domain.color} flex-shrink-0 flex items-center justify-center text-white shadow-lg transition-transform duration-400 group-hover:scale-110`}>
                  <domain.icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{domain.title}</h3>
                  <p className="text-sm text-[#E8D69B]/80 line-clamp-2">
                    Build your campus presence, gain leadership experience, and contribute to real college campaigns.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto py-24 sm:py-32 px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 px-4 py-2 text-[#D4AF37]">
            <Users size={16} className="text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37]">Meet Our Team</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
            Amazing Minds Behind TRENDY
          </h2>
          <p className="text-lg text-[#E8D69B]/80 max-w-2xl mx-auto font-medium">
            Our dedicated team is passionate about empowering student leaders and creating meaningful opportunities.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="group rounded-[2rem] border border-[#D4AF37]/30 bg-white/5 backdrop-blur-sm overflow-hidden shadow-xl shadow-[#D4AF37]/10 transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-white/10 hover:-translate-y-1">
              {/* Profile Image */}
              <div className="relative h-64 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/20 overflow-hidden flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-5xl font-black text-[#2D2926]">
                  {member.name?.charAt(0) || "?"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white mb-1">{member.name || "Team Member"}</h3>
                  <p className="text-sm text-[#D4AF37] font-semibold uppercase tracking-wider">{member.role}</p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 pt-2">
                  <a 
                    href={member.instagram || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D2926] transition-all duration-300 group/link"
                  >
                    <Instagram size={18} />
                  </a>
                  <a 
                    href={member.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D2926] transition-all duration-300"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="faq-section max-w-4xl mx-auto py-24 sm:py-32 space-y-16 px-4 sm:px-6 lg:px-8">
        <div className="faq-title text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 rounded-full border border-[#D4AF37]/40">
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37]">Common Questions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-xl text-[#E8D69B]/80 max-w-2xl mx-auto font-medium">
            Everything you need to know about joining TRENDY Campus Ambassador Program
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {[
            {
              q: "What is TCAP?",
              a: "TCAP is TRENDY's nationwide Campus Ambassador Program focused on leadership, innovation, community building, and student growth."
            },
            {
              q: "Who can apply for the program?",
              a: "Students from any college, branch, or academic year across India can apply."
            },
            {
              q: "Is there any registration fee?",
              a: "No, joining the program is completely free."
            },
            {
              q: "What do Campus Ambassadors do?",
              a: "Ambassadors work on campaigns, events, outreach, marketing, content, development, and community initiatives."
            },
            {
              q: "What are the benefits of joining?",
              a: "Students gain real-world experience, certifications, networking opportunities, rewards, internships, and leadership exposure."
            },
            {
              q: "Can I join multiple domains?",
              a: "Yes, ambassadors can explore and participate across multiple domains."
            },
            {
              q: "How does the task system work?",
              a: "Tasks are unlocked progressively as previous tasks are completed and approved."
            },
            {
              q: "How are points and credits earned?",
              a: "Points and credits are earned by completing tasks, participating in events, and contributing to the ecosystem."
            },
            {
              q: "Is there a referral system?",
              a: "Yes, ambassadors receive referral rewards when invited members actively participate and complete tasks."
            },
            {
              q: "Will I receive certificates?",
              a: "Yes, ambassadors receive performance-based certificates and achievement credentials."
            },
            {
              q: "Are there internship opportunities?",
              a: "Top-performing ambassadors can unlock internships, networking opportunities, and exclusive experiences."
            },
            {
              q: "How are leaderboards calculated?",
              a: "Leaderboards are based on points, task performance, engagement, and overall contribution."
            },
            {
              q: "Can beginners apply?",
              a: "Absolutely. The program is designed for both beginners and experienced students."
            },
            {
              q: "Are speaker sessions and workshops included?",
              a: "Yes, ambassadors get access to workshops, speaker sessions, networking events, and community activities."
            },
            {
              q: "How can I contact the team?",
              a: "You can reach out through the Contact section or official TRENDY community channels."
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="faq-item group"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full text-left"
              >
                <div className="w-full p-6 bg-gradient-to-r from-white/5 to-[#D4AF37]/5 rounded-2xl border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#B8860B]/20">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                        {faq.q}
                      </h3>
                    </div>
                    <div className={`flex-shrink-0 text-[#D4AF37] transition-transform duration-300 transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                      <ChevronDown size={24} />
                    </div>
                  </div>
                </div>
              </button>

              {/* Answer */}
              {expandedFAQ === index && (
                <div className="mt-2 p-6 bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/5 rounded-2xl border-l-4 border-[#D4AF37] shadow-lg shadow-[#B8860B]/10">
                  <p className="text-white leading-relaxed font-medium text-base md:text-lg">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 pt-8">
          <p className="text-[#E8D69B]/80 font-medium">Still have questions?</p>
          <button className="group relative bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#2D2926] px-8 py-4 rounded-2xl font-black shadow-2xl shadow-[#B8860B]/40 hover:shadow-2xl hover:shadow-[#B8860B]/60 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden">
            <span className="relative z-10">Get in Touch</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </button>
        </div>
      </section>
    </main>
  );
}