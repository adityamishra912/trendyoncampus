"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Zap } from "lucide-react";

interface Task {
    id: string;
    title: string;
    description: string;
    domain: string;
    points: number;
    difficulty: string;
    status:
    | "open"
    | "review"
    | "completed";
}

interface PageProps {
    params: {
        domain: string;
    };
}

const tasksData: Record<string, any[]> = {
    "web-development": [
        {
            title: "Build a Landing Page",
            points: 100,
            difficulty: "Easy",
        },
        {
            title: "Create a Responsive Navbar",
            points: 150,
            difficulty: "Medium",
        },
    ],

    "marketing": [
        {
            title: "Promote Instagram Post",
            points: 80,
            difficulty: "Easy",
        },
    ],

    "creatives": [
        {
            title: "Design a Poster",
            points: 120,
            difficulty: "Medium",
        },
    ],
};

export default function TasksPage() {
    const params = useParams();

    const domain = params.domain as string;

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const domainName = params.domain;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const q = query(
                    collection(db, "tasks"),
                    where("domain", "==", domain)
                );

                const querySnapshot = await getDocs(q);

                const fetchedTasks = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Task[];

                setTasks(fetchedTasks);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (domain) {
            fetchTasks();
        }
    }, [domain]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] p-6">

            <h1 className="text-4xl font-bold text-[#2D2926] capitalize text-center mt-6">
                {domain.replace(/-/g, " ")} Tasks
            </h1>

            {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-3 gap-6">

                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6"
                    >

                        <h2 className="text-2xl font-semibold text-white">
                            {task.title}
                        </h2>

                        <div className="mt-4 flex items-center justify-between">

                            <p className="text-cyan-400 font-medium">
                                {task.points} Points
                            </p>

                            <span className="rounded-full bg-zinc-800 px-4 py-1 text-sm text-zinc-300">
                                {task.difficulty}
                            </span>

                        </div>

                        <button className="mt-6 w-full rounded-xl bg-cyan-400 py-3 font-semibold text-black hover:bg-cyan-300 transition">
                            Start Task
                        </button>

                    </div>
                ))}

            </div> */}

            {loading ? (
                <p className="mt-10 text-[#6D4C41]">
                    Loading tasks...
                </p>
            ) : tasks.length === 0 ? (
                <p className="mt-10 text-[#6D4C41]">
                    No tasks found.
                </p>
            ) : (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-3 gap-6 m-6">

                    {tasks.map((task) => (
                        <Link
                            key={task.id}
                            href={`/dashboard/tasks/${domain}/${task.id}`}
                            className="group relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-white/40 to-[#FAF4D3]/50 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                        >

                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_40%)]"></div>

                            {/* Top Accent */}
                            <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                            {/* CONTENT */}
                            <div className="relative z-10 p-6">

                                {/* TOP ROW */}
                                <div className="mb-5 flex items-center justify-between">

                                    {/* STATUS */}
                                    <div
                                        className={`flex h-11 items-center rounded-full border px-4 text-sm font-medium ${task.status === "completed"
                                                ? "border-[#8B6F47]/40 bg-[#8B6F47]/10 text-[#5d4037]"
                                                : task.status === "review"
                                                    ? "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#8B6F47]"
                                                    : "border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#6D4C41]"
                                            }`}
                                    >
                                        {
                                            task.status === "completed"
                                                ? "Completed"
                                                : task.status === "review"
                                                    ? "Under Review"
                                                    : "Available"
                                        }
                                    </div>

                                    {/* POINTS */}
                                    <div className="flex h-11 items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/15 px-4">

                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37]/25">
                                            <Zap size={14} className="text-[#8B6F47]" />
                                        </div>

                                        <span className="text-sm font-semibold text-[#8B6F47]">
                                            {task.points} pts
                                        </span>

                                    </div>

                                </div>
                                {/* TITLE */}
                                <h2 className="text-2xl font-semibold text-[#2D2926]">
                                    {task.title}
                                </h2>

                                {/* DESCRIPTION */}
                                <p className="mt-3 line-clamp-2 text-[#5d4037]">
                                    {task.description}
                                </p>



                                {/* SUBMIT BUTTON */}
                                <div className="mt-8">

                                    <div className="relative overflow-hidden rounded-2xl">

                                        {/* animated glow */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37] opacity-60 blur-md animate-pulse"></div>

                                        {/* button */}
                                        <div className="relative flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-5 py-3 text-center font-semibold text-[#2D2926] transition-all duration-300 group-hover:scale-[1.02]">

                                            {/* shine effect */}
                                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                                <div className="absolute top-0 left-[-120%] h-full w-[40%] rotate-12 bg-white/30 blur-md animate-[shine_3s_linear_infinite]" />
                                            </div>

                                            <span className="relative z-10">
                                                Submit Task
                                            </span>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </Link>
                    ))}

                </div>
            )}

        </div>
    );
}