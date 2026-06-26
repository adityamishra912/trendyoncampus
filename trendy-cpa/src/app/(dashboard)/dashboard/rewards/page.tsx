"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Gift,
  Shirt,
  Ticket,
  BadgePercent,
  Sparkles,
  Briefcase,
  FileText,
  Award,
  GraduationCap,
  Users,
  UserRoundCheck,
  Building2,
  Rocket,
  Globe,
  Trophy,
  UsersRound,
  BadgeCheck,
} from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

const RewardsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".reward-card", {
      opacity: 0,
      x: 120,
      duration: 1,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".reward-section",
        start: "top 80%",
      },
    });

   gsap.from(".league-desktop .league-card", {
  opacity: 1,
  y: 80,
  scale: 0.9,
  stagger: 0.15,
  duration: 1,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".league-desktop",
    start: "top 75%",
    once: true,
  },
});

gsap.from(".league-mobile .league-card", {
  opacity: 1,
  x: 100,
  stagger: 0.2,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".league-mobile",
    start: "top 85%",
    once: true,
  },
});
  }, containerRef);

  return () => ctx.revert();
}, []);

  return (
    <div ref={containerRef}>

      {/* Reward Cards with 'reward-grid-container' and 'reward-card' classes */}
      <section className="reward-section px-4 md:px-6 pb-20 pt-8 lg:px-12">
  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2D2926]">
        Elite Performer Rewards
      </h2>

      <div className="mt-4 inline-block rounded-full border border-[#D4AF37]/30 bg-[#FAF4D3]/20 px-6 py-2">
        <p className="text-sm font-medium text-[#9A7424]">
          Unlock exclusive opportunities and accelerate your career.
        </p>
      </div>
    </div>

    {/* Desktop Layout */}
    <div className="hidden lg:grid mt-10 w-full bg-[#F6EFCF] p-6 rounded-3xl lg:grid-cols-[2fr_1fr] gap-6">

      <div className="reward-card bg-[#E4C96A] rounded-3xl p-6 grid grid-cols-2 gap-6">

        <div className="bg-[#B98A2A] rounded-3xl p-6">
          <h3 className="text-3xl font-semibold text-[#2D2926]">
            Premium Rewards
          </h3>

          <ul className="mt-8 space-y-5">
            <li className="flex gap-3">
              <Gift className="text-[#FFD76A]" />
              <span>Exclusive merchandise kits and goodies.</span>
            </li>

            <li className="flex gap-3">
              <Shirt className="text-[#FFD76A]" />
              <span>Official Trendy ambassador apparel.</span>
            </li>

            <li className="flex gap-3">
              <Ticket className="text-[#FFD76A]" />
              <span>Free entry to events and workshops.</span>
            </li>

            <li className="flex gap-3">
              <BadgePercent className="text-[#FFD76A]" />
              <span>Discounts and vouchers.</span>
            </li>

            <li className="flex gap-3">
              <Sparkles className="text-[#FFD76A]" />
              <span>Premium tools and subscriptions.</span>
            </li>
          </ul>
        </div>

        <div className="p-6">
          <h3 className="text-3xl font-semibold text-[#2D2926]">
            Career & Growth
          </h3>

          <ul className="mt-8 space-y-5">
            <li className="flex gap-3">
              <Briefcase className="text-[#C48A15]" />
              <span>Internship opportunities.</span>
            </li>

            <li className="flex gap-3">
              <FileText className="text-[#C48A15]" />
              <span>Certificates and LORs.</span>
            </li>

            <li className="flex gap-3">
              <Award className="text-[#C48A15]" />
              <span>Recognition programs.</span>
            </li>

            <li className="flex gap-3">
              <Users className="text-[#C48A15]" />
              <span>Industry mentorship.</span>
            </li>

            <li className="flex gap-3">
              <GraduationCap className="text-[#C48A15]" />
              <span>Premium learning resources.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="reward-card p-8">
        <h3 className="text-3xl font-semibold text-[#2D2926]">
          Partner Benefits
        </h3>

        <ul className="mt-8 space-y-5">
          <li className="flex gap-3">
            <Building2 className="text-[#9B6A18]" />
            <span>Represent Trendy nationally.</span>
          </li>

          <li className="flex gap-3">
            <Rocket className="text-[#9B6A18]" />
            <span>Startup exposure.</span>
          </li>

          <li className="flex gap-3">
            <Globe className="text-[#9B6A18]" />
            <span>Industry networking.</span>
          </li>

          <li className="flex gap-3">
            <UsersRound className="text-[#9B6A18]" />
            <span>Exclusive communities.</span>
          </li>

          <li className="flex gap-3">
            <Trophy className="text-[#9B6A18]" />
            <span>Leadership opportunities.</span>
          </li>

          <li className="flex gap-3">
            <BadgeCheck className="text-[#9B6A18]" />
            <span>Special projects access.</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Mobile Slider */}
    <div className="lg:hidden mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4">

      <div className="reward-card snap-center min-w-[85%] rounded-3xl bg-[#B98A2A] p-6 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-6">
          Premium Rewards
        </h3>

        <ul className="space-y-4">
          <li className="flex gap-3">
            <Gift />
            <span>Exclusive merchandise kits.</span>
          </li>

          <li className="flex gap-3">
            <Shirt />
            <span>Official apparel.</span>
          </li>

          <li className="flex gap-3">
            <Ticket />
            <span>Event access.</span>
          </li>

          <li className="flex gap-3">
            <Sparkles />
            <span>Premium subscriptions.</span>
          </li>
        </ul>
      </div>

      <div className="reward-card snap-center min-w-[85%] rounded-3xl bg-[#E4C96A] p-6 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-[#2D2926]">
          Career & Growth
        </h3>

        <ul className="space-y-4">
          <li className="flex gap-3">
            <Briefcase />
            <span>Internships.</span>
          </li>

          <li className="flex gap-3">
            <FileText />
            <span>Certificates.</span>
          </li>

          <li className="flex gap-3">
            <Award />
            <span>Recognition.</span>
          </li>

          <li className="flex gap-3">
            <Users />
            <span>Mentorship.</span>
          </li>
        </ul>
      </div>

      <div className="reward-card snap-center min-w-[85%] rounded-3xl bg-[#F6EFCF] p-6 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-[#2D2926]">
          Partner Benefits
        </h3>

        <ul className="space-y-4">
          <li className="flex gap-3">
            <Building2 />
            <span>National representation.</span>
          </li>

          <li className="flex gap-3">
            <Rocket />
            <span>Startup exposure.</span>
          </li>

          <li className="flex gap-3">
            <Globe />
            <span>Networking.</span>
          </li>

          <li className="flex gap-3">
            <Trophy />
            <span>Recognition.</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</section>

     {/* --- League Cards Section --- */}
{/* --- League Cards Section --- */}
<section className="px-4 md:px-6 pb-20 lg:px-12">
  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#9B6A18]">
        Rise Through The Rankings
      </h2>

      <p className="mt-4 text-sm md:text-lg text-black">
        Track your progress and climb the tiers to unlock ultimate benefits.
      </p>
    </div>

    {/* MOBILE CARDS */}
    <div className="league-mobile md:hidden mt-10 overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 snap-x snap-mandatory px-2 pb-6">

        {/* Bronze */}
        <div className="league-card min-w-[82%] snap-center rounded-[2rem] border border-orange-200 bg-white p-5 shadow-xl">
          <div className="bg-gradient-to-b from-orange-100 to-transparent p-5 rounded-2xl">
            <div className="flex justify-center">
              <img
                src="/bronze.png"
                alt="Bronze"
                className="w-28 h-auto"
              />
            </div>

            <h3 className="mt-6 text-center text-2xl font-bold text-red-900">
              Bronze
            </h3>
          </div>

          <div className="p-4">
            <p className="text-center leading-7 text-black font-medium text-sm">
              Begin your ambassador journey by completing your first campaigns,
              earning points, and building consistency.
            </p>
          </div>
        </div>

        {/* Silver */}
        <div className="league-card min-w-[82%] snap-center rounded-[2rem] border border-slate-300 bg-white p-5 shadow-xl">
          <div className="bg-gradient-to-b from-slate-100 to-transparent p-5 rounded-2xl">
            <div className="flex justify-center">
              <img
                src="/silver.png"
                alt="Silver"
                className="w-28 h-auto"
              />
            </div>

            <h3 className="mt-6 text-center text-2xl font-bold text-blue-900">
              Silver
            </h3>
          </div>

          <div className="p-4">
            <p className="text-center leading-7 text-black font-medium text-sm">
              Stand among active performers, maintain leaderboard momentum,
              and unlock community recognition.
            </p>
          </div>
        </div>

        {/* Gold */}
        <div className="league-card min-w-[82%] snap-center rounded-[2rem] border border-yellow-300 bg-white p-5 shadow-xl">
          <div className="bg-gradient-to-b from-yellow-100 to-transparent p-5 rounded-2xl">
            <div className="flex justify-center">
              <img
                src="/gold.png"
                alt="Gold"
                className="w-28 h-auto"
              />
            </div>

            <h3 className="mt-6 text-center text-2xl font-bold text-yellow-700">
              Gold
            </h3>
          </div>

          <div className="p-4">
            <p className="text-center leading-7 text-black font-medium text-sm">
              Reserved for top-performing ambassadors driving impact,
              referrals, and leadership across projects.
            </p>
          </div>
        </div>

        {/* Diamond */}
        <div className="league-card min-w-[82%] snap-center rounded-[2rem] border border-cyan-300 bg-white p-5 shadow-xl">
          <div className="bg-gradient-to-b from-cyan-100 to-transparent p-5 rounded-2xl">
            <div className="flex justify-center">
              <img
                src="/diamond.png"
                alt="Diamond"
                className="w-28 h-auto"
              />
            </div>

            <h3 className="mt-6 text-center text-2xl font-bold text-cyan-900">
              Diamond
            </h3>
          </div>

          <div className="p-4">
            <p className="text-center leading-7 text-black font-medium text-sm">
              The elite tier for exceptional ambassadors who dominate national
              rankings and unlock premium rewards.
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* DESKTOP GRID */}
    <div className="league-desktop hidden md:grid mt-16 gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {/* Bronze */}
      <div className="league-card group overflow-hidden rounded-[2rem] border border-orange-200 bg-white/90 p-6 shadow-xl shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="bg-gradient-to-b from-orange-100 to-transparent p-6 rounded-2xl">
          <div className="flex justify-center">
            <img src="/bronze.png" alt="Bronze" />
          </div>

          <h3 className="mt-6 text-center text-3xl font-bold text-red-900">
            Bronze
          </h3>
        </div>

        <div className="p-6 pt-2">
          <p className="text-center leading-8 text-black font-medium">
            Begin your ambassador journey by completing your first campaigns,
            earning points, and building consistency.
          </p>
        </div>
      </div>

      {/* Silver */}
      <div className="league-card group overflow-hidden rounded-[2rem] border border-slate-300 bg-white/90 p-6 shadow-xl shadow-slate-500/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="bg-gradient-to-b from-slate-100 to-transparent p-6 rounded-2xl">
          <div className="flex justify-center">
            <img src="/silver.png" alt="Silver" />
          </div>

          <h3 className="mt-6 text-center text-3xl font-bold text-blue-900">
            Silver
          </h3>
        </div>

        <div className="p-6 pt-2">
          <p className="text-center leading-8 text-black font-medium">
            Stand among active performers, maintain leaderboard momentum,
            and unlock community recognition.
          </p>
        </div>
      </div>

      {/* Gold */}
      <div className="league-card group overflow-hidden rounded-[2rem] border border-yellow-300 bg-white/90 p-6 shadow-xl shadow-yellow-500/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="bg-gradient-to-b from-yellow-100 to-transparent p-6 rounded-2xl">
          <div className="flex justify-center">
            <img src="/gold.png" alt="Gold" />
          </div>

          <h3 className="mt-6 text-center text-3xl font-bold text-yellow-700">
            Gold
          </h3>
        </div>

        <div className="p-6 pt-2">
          <p className="text-center leading-8 text-black font-medium">
            Reserved for top-performing ambassadors driving impact,
            referrals, and leadership across projects.
          </p>
        </div>
      </div>

      {/* Diamond */}
      <div className="league-card group overflow-hidden rounded-[2rem] border border-cyan-300 bg-white/90 p-6 shadow-xl shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="bg-gradient-to-b from-cyan-100 to-transparent p-6 rounded-2xl">
          <div className="flex justify-center">
            <img src="/diamond.png" alt="Diamond" />
          </div>

          <h3 className="mt-6 text-center text-3xl font-bold text-cyan-900">
            Diamond
          </h3>
        </div>

        <div className="p-6 pt-2">
          <p className="text-center leading-8 text-black font-medium">
            The elite tier for exceptional ambassadors who dominate national
            rankings and unlock premium rewards.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>
</div>
  );
};
export default RewardsPage;