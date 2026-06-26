"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import {
    onAuthStateChanged,
} from "firebase/auth";

import {
    auth,
    db,
} from "@/lib/firebase";

type Task = {
    id: string;
    title: string;
    description: string;
    domain: string;
    points: number;
    difficulty: string;
};

type Submission = {
    id: string;
    taskId: string;
    taskDomain: string;
    status: string;
};

export default function ManagerDashboardPage() {

    const router = useRouter();

    const [tasks, setTasks] = useState<Task[]>([]);

    const [submissions, setSubmissions] = useState<Submission[]>([]);

    const [domain, setDomain] = useState("");

    const [role, setRole] = useState("");

    const [loading, setLoading] = useState(true);

    /*
      FETCH TASKS + SUBMISSIONS
    */
    const fetchData = async (
        managerDomain: string
    ) => {

        try {

            /*
              TASKS
            */
            const tasksQuery = query(
                collection(db, "tasks"),

                where(
                    "domain",
                    "==",
                    managerDomain
                )
            );

            const tasksSnapshot =
                await getDocs(tasksQuery);

            const tasksData =
                tasksSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Task[];

            setTasks(tasksData);

            /*
              SUBMISSIONS
            */
            const submissionsQuery = query(
                collection(db, "submissions"),

                where(
                    "taskDomain",
                    "==",
                    managerDomain
                )
            );

            const submissionsSnapshot =
                await getDocs(submissionsQuery);

            const submissionsData =
                submissionsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Submission[];

            setSubmissions(submissionsData);

        } catch (error) {

            console.error(error);

        }
    };

    /*
      AUTH + USER SESSION
    */
    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(
                auth,
                async (user) => {

                    if (!user) {
                        setLoading(false);
                        return;
                    }

                    try {

                        const q = query(
                            collection(db, "users"),

                            where(
                                "email",
                                "==",
                                user.email
                            )
                        );

                        const snapshot =
                            await getDocs(q);

                        if (!snapshot.empty) {

                            const data =
                                snapshot.docs[0].data();

                            setDomain(
                                data.domain || ""
                            );

                            setRole(
                                data.role || ""
                            );

                            /*
                              FETCH DOMAIN DATA
                            */
                            await fetchData(
                                data.domain
                            );
                        }

                    } catch (error) {

                        console.error(error);

                    } finally {

                        setLoading(false);

                    }
                }
            );

        return () => unsubscribe();

    }, []);

    /*
      LOADING
    */
    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] text-[#2D2926]">
                Loading...
            </div>
        );
    }

    /*
      STATS
    */
    const approvedCount =
        submissions.filter(
            (s) => s.status === "approved"
        ).length;

    const pendingCount =
        submissions.filter(
            (s) => s.status === "pending"
        ).length;

    return (

        <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] px-6 py-10 text-[#2D2926]">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-10">

                    <h1 className="text-4xl font-bold capitalize">

                        {domain.replace(/-/g, " ")}

                    </h1>

                    <p className="mt-2 text-slate-400">

                        {role} Dashboard

                    </p>

                </div>

                {/* STATS */}
                <div className="grid gap-6 md:grid-cols-1 sm:grid-cols-3">

                    <div className="rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-white/30 to-[#FAF4D3]/40 p-6">

                        <p className="text-sm text-[#6D4C41]">
                            Total Tasks
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-[#2D2926]">
                            {tasks.length}
                        </h2>

                    </div>

                    <div className="rounded-3xl border border-[#8BCB9E]/15 bg-gradient-to-br from-white/30 to-[#FAF4D3]/40 p-6">

                        <p className="text-sm text-[#6D4C41]">
                            Approved Submissions
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-[#6D4C41]">
                            {approvedCount}
                        </h2>

                    </div>

                    <div className="rounded-3xl border border-[#E6D28A]/15 bg-gradient-to-br from-white/30 to-[#FAF4D3]/40 p-6">

                        <p className="text-sm text-[#6D4C41]">
                            Pending Reviews
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-[#8B6F47]">
                            {pendingCount}
                        </h2>

                    </div>

                </div>

                {/* TASKS */}
                <div className="mt-12">

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-2xl font-bold">
                            Domain Tasks
                        </h2>

                    </div>

                    {
                        tasks.length === 0 ? (

                            <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/40 p-12 text-center">

                                <p className="text-lg text-zinc-400">
                                    No tasks found.
                                </p>

                            </div>

                        ) : (

                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1 sm:grid-cols-3">

                                {
                                    tasks.map((task) => (

                                        <div
                                            key={task.id}
                                            className="rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-white/30 to-[#FAF4D3]/40 p-6 transition-all hover:border-[#D4AF37]/60"
                                        >

                                            <div className="flex items-start justify-between">

                                                <div>

                                                    <h3 className="text-base md:text-xl font-semibold text-[#2D2926]">

                                                        {task.title}

                                                    </h3>

                                                    <p className="mt-2 line-clamp-3 text-sm text-[#6D4C41]">

                                                        {task.description}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="mt-6 flex items-center justify-between">

                                                <div>

                                                    <p className="text-sm text-[#6D4C41]">
                                                        Points
                                                    </p>

                                                    <p className="text-lg font-semibold text-[#8B6F47]">

                                                        {task.points}

                                                    </p>

                                                </div>

                                                <span className="rounded-full border border-[#E6D28A] px-3 py-1 text-sm capitalize text-[#6D4C41]">

                                                    {task.difficulty}

                                                </span>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/manager/tasks/${task.id}`
                                                    )
                                                }
                                                className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] py-3 font-medium text-[#2D2926] transition-all hover:opacity-95"
                                            >

                                                Open Task

                                            </button>

                                        </div>
                                    ))
                                }

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
}