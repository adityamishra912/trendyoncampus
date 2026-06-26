"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const domains = [
    {
        title: "Creatives",
        image: "/domains/creative.jpeg",
        href: "/dashboard/tasks/creatives",
    },
    {
        title: "Event Management",
        image: "/domains/event.jpeg",
        href: "/dashboard/tasks/events",
    },
    {
        title: "Web Development",
        image: "/domains/web.jpeg",
        href: "/dashboard/tasks/web-development",
    },
    {
        title: "Marketing",
        image: "/domains/marketing.jpeg",
        href: "/dashboard/tasks/marketing",
    },
    {
        title: "Social Outreach",
        image: "/domains/outreach.jpeg",
        href: "/dashboard/tasks/outreach",
    },
    {
        title: "Media & Publicity",
        image: "/domains/media.jpeg",
        href: "/dashboard/tasks/media",
    },
];

const page = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Animate container fade-in
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );

        // Animate cards with stagger
        const cards = containerRef.current.querySelectorAll("[data-card]");
        gsap.fromTo(
            cards,
            { opacity: 0, y: 30, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "back.out(1.7)",
            }
        );
    }, []);

    return (
        <div ref={containerRef}>

            <div className="w-full px-6 py-12 flex flex-col items-center">

                {/* HEADING */}
                <div className="mb-8 flex flex-col justify-center items-center">

                    <h1 className="text-7xl
            font-black
            tracking-tight
            text-[#2D2926]" style={{
                            fontFamily: "var(--font-space-grotesk)",
                        }}>
                        Tasks
                    </h1>

                    <p
                        className="mt-4 max-w-2xl text-base leading-7 text-[#9A7424] text-center" style={{
                            fontFamily: "var(--font-inter)",
                        }}
                    >
                        Complete tasks, earn points, and unlock rewards by participating in campaigns and community activities.
                    </p>

                </div>


                <div className="w-full lg:max-w-5xl my-10 grid grid-cols-2 md:grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">

                    {domains.map((domain, index) => (
                        <Link
                            key={index}
                            href={domain.href}
                            data-card
                            className="group relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-white/40 to-[#FAF4D3]/50 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                        >

                            {/* subtle gold ambient */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_40%)] opacity-70"></div>

                            {/* top accent line */}
                            <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                            {/* IMAGE */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF4D3]">

                                <img
                                    src={domain.image}
                                    alt={domain.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* image overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926]/40 to-transparent"></div>

                            </div>

                            {/* CONTENT */}
                            <div className="relative flex min-h-[100px] items-center justify-center p-5">

                                <h2 className="text-center text-sm font-semibold text-[#2D2926] md:text-lg">
                                    {domain.title}
                                </h2>

                            </div>

                        </Link>))}

                </div>

            </div>

        </div>
    )
}

export default page;
