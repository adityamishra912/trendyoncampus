
"use client";

import { useEffect, useState, useRef } from "react";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import gsap from "gsap";

interface LeaderboardUser {
    id: string;
    name: string;
    college: string;
    points: number;
}

export default function LeaderboardPage() {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const q = query(
                    collection(db, "users"),
                    orderBy("points", "desc"),
                    limit(10)
                );
                const snapshot = await getDocs(q);
                const leaderboardData: LeaderboardUser[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().fullName || "Unknown",
                    college: doc.data().college || "N/A",
                    points: doc.data().points || 0,
                }));
                setUsers(leaderboardData);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    useEffect(() => {
        if (!loading && containerRef.current) {
            const ctx = gsap.context(() => {
                // Animate Heading
                gsap.fromTo(
                    ".leaderboard-heading",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
                );

                // Animate Rows
                gsap.fromTo(
                    "[data-row]",
                    { opacity: 0, y: 20, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "power3.out",
                    }
                );
            }, containerRef);

            return () => ctx.revert();
        }
    }, [loading]);

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] text-[#2D2926] px-4 py-10">
            <div className="mx-auto max-w-5xl">

                {/* HEADING */}
                <div className="mb-8 flex flex-col justify-center items-center">

                    <h1 className="text-5xl lg:text-7xl
            font-black
            tracking-tight
            text-[#2D2926]" style={{
                            fontFamily: "var(--font-space-grotesk)",
                        }}>
                        Leaderboard
                    </h1>

                    <p
                        className="mt-4 max-w-2xl text-base leading-7 text-[#9A7424] text-center" style={{
                            fontFamily: "var(--font-inter)",
                        }}
                    >
                        Discover the top campus ambassadors ranked by points, participation, referrals, and community engagement.
                    </p>

                </div>


                {/* LEADERBOARD BOX */}
                <div className="overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-white/40 to-[#FAF4D3]/50 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                    {/* HEADER */}
                    <div className="grid grid-cols-12 border-b border-[#D4AF37]/20 bg-[#FAF4D3]/30 px-6 py-5 text-sm font-semibold uppercase tracking-wider text-[#5d4037]">
                        <div className="col-span-2">No</div>
                        <div className="col-span-5">Name</div>
                        <div className="col-span-3">College</div>
                        <div className="col-span-2 text-right">Points</div>
                    </div>

                    {/* BODY */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-[#6D4C41]">Loading leaderboard...</div>
                    ) : users.length === 0 ? (
                        <div className="flex items-center justify-center py-20 text-[#6D4C41]">No users found</div>
                    ) : (
                        users.map((user, index) => (
                            <div
                                key={user.id}
                                data-row
                                className="grid grid-cols-12 items-center border-b border-[#D4AF37]/20 px-6 py-5 transition-all duration-200 hover:bg-[#FAF4D3]/30"
                            >
                                <div className="col-span-2">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${index === 0 ? "bg-[#D4AF37]/20 text-[#8B6F47] border border-[#D4AF37]/40" : index === 1 ? "bg-[#B8860B]/15 text-[#6D4C41] border border-[#B8860B]/30" : index === 2 ? "bg-[#D4AF37]/15 text-[#6D4C41] border border-[#D4AF37]/30" : "bg-[#FAF4D3]/40 text-[#5d4037]"}`}>
                                        #{index + 1}
                                    </div>
                                </div>
                                <div className="col-span-5 font-semibold text-[#2D2926]">{user.name}</div>
                                <div className="col-span-3 truncate text-[#6D4C41]">{user.college}</div>
                                <div className="col-span-2 text-right">
                                    <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-sm font-bold text-[#8B6F47]">
                                        {user.points} <span className="hidden lg:flex">pts</span>
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
