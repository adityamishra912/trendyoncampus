"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
    collection,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
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
    status?: string;
};

type Submission = {
    id: string;
    taskTitle?: string;
    userName?: string;
    userCollege?: string;
    submissionUrl: string;
    status: string;
    submittedAt: any;
};

export default function ManagerDashboardPage() {

    const router = useRouter();

    const [domain, setDomain] = useState("");

    const [role, setRole] = useState("");

    const [managerName, setManagerName] = useState("");

    const [tasks, setTasks] = useState<Task[]>([]);

    const [recentSubmissions, setRecentSubmissions] =
        useState<Submission[]>([]);

    const [pendingSubmissions, setPendingSubmissions] =
        useState<Submission[]>([]);

    const [loading, setLoading] = useState(true);

    /*
      FETCH DASHBOARD DATA
    */
    const fetchDashboardData = async (
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
                    domain
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
              RECENT SUBMISSIONS
            */
            const recentQuery = query(
                collection(db, "submissions"),

                where(
                    "taskDomain",
                    "==",
                    managerDomain
                ),

                orderBy(
                    "submittedAt",
                    "desc"
                ),

                limit(5)
            );

            const recentSnapshot =
                await getDocs(recentQuery);

            const recentData =
                recentSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Submission[];

            setRecentSubmissions(
                recentData
            );

            /*
              PENDING SUBMISSIONS
            */
            const pendingQuery = query(
                collection(db, "submissions"),

                where(
                    "taskDomain",
                    "==",
                    managerDomain
                ),

                where(
                    "status",
                    "==",
                    "pending"
                ),

                orderBy(
                    "submittedAt",
                    "desc"
                ),

                limit(10)
            );

            const pendingSnapshot =
                await getDocs(
                    pendingQuery
                );

            const pendingData =
                pendingSnapshot.docs.map(
                    (doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })
                ) as Submission[];

            setPendingSubmissions(
                pendingData
            );

        } catch (error) {

            console.error(error);

        }
    };

    /*
      AUTH
    */
    useEffect(() => {

        console.log("USE EFFECT RUNNING");

        const unsubscribe =
            onAuthStateChanged(
                auth,
                async (user) => {

                    console.log("AUTH CHANGED");

                    console.log(user);

                    if (!user) {
                        console.log("NO USER");
                        setLoading(false);
                        return;
                    }

                    try {

                        console.log("USER EMAIL:", user.email);

                        const q = query(
                            collection(
                                db,
                                "team"
                            ),

                            where(
                                "email",
                                "==",
                                user.email
                            )
                        );

                        console.log("QUERY CREATED");

                        const snapshot =
                            await getDocs(q);

                        console.log(snapshot);

                        console.log(
                            "DOCS LENGTH:",
                            snapshot.docs.length
                        );

                        if (!snapshot.empty) {

                            console.log(
                                "USER DOC FOUND"
                            );

                            const data =
                                snapshot.docs[0].data();

                            setDomain(
                                data.domain || ""
                            );

                            setRole(
                                data.role || ""
                            );

                            setManagerName(
                                data.fullName || ""
                            );

                            console.log(data);

                            console.log({
                                role: sessionStorage.getItem("role"),
                                domain: sessionStorage.getItem("domain"),
                                name: sessionStorage.getItem("name"),
                            });

                            /*
  SESSION STORAGE VALUES
*/
                            // console.log({
                            //     role: sessionStorage.getItem("role"),
                            //     domain: sessionStorage.getItem("domain"),
                            //     name: sessionStorage.getItem("name"),
                            // });

                            // await fetchDashboardData(
                            //     data.domain
                            // );
                        } else {

                            console.log(
                                "SNAPSHOT EMPTY"
                            );
                        }

                    } catch (error) {

                        console.error(
                            "ERROR:",
                            error
                        );


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
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    /*
      STATS
    */
    const approvedCount =
        recentSubmissions.filter(
            (s) =>
                s.status === "approved"
        ).length;

    const rejectedCount =
        recentSubmissions.filter(
            (s) =>
                s.status === "rejected"
        ).length;

    return (

        <div className="min-h-screen bg-black px-6 py-10 text-white">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-10 flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold capitalize">

                            {domain.replace(/-/g, " ")}

                        </h1>

                        <p className="mt-2 text-slate-400">

                            {role}

                        </p>

                    </div>

                    {/* CREATE TASK */}
                    <button
                        onClick={() =>
                            router.push(
                                "/admin/tasks/create"
                            )
                        }
                        className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition-all hover:bg-cyan-300"
                    >

                        + Create Task

                    </button>

                </div>

                {/* STATS */}
                <div className="grid gap-6 md:grid-cols-4">

                    <div className="rounded-3xl border border-cyan-400/15 bg-zinc-900 p-6">

                        <p className="text-sm text-slate-400">
                            Total Tasks
                        </p>

                        <h2 className="mt-3 text-4xl font-bold">

                            {tasks.length}

                        </h2>

                    </div>

                    <div className="rounded-3xl border border-yellow-400/15 bg-zinc-900 p-6">

                        <p className="text-sm text-slate-400">
                            Pending Reviews
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-yellow-400">

                            {
                                pendingSubmissions.length
                            }

                        </h2>

                    </div>

                    <div className="rounded-3xl border border-emerald-400/15 bg-zinc-900 p-6">

                        <p className="text-sm text-slate-400">
                            Approved
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-emerald-400">

                            {approvedCount}

                        </h2>

                    </div>

                    <div className="rounded-3xl border border-red-400/15 bg-zinc-900 p-6">

                        <p className="text-sm text-slate-400">
                            Rejected
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-red-400">

                            {rejectedCount}

                        </h2>

                    </div>

                </div>

                {/* MAIN GRID */}
                <div className="mt-10 grid gap-6 xl:grid-cols-1 sm:grid-cols-3">

                    {/* LEFT */}
                    <div className="space-y-8 xl:col-span-2">

                        {/* RECENT SUBMISSIONS */}
                        <div className="rounded-3xl border border-cyan-400/10 bg-zinc-900 p-6">

                            <div className="mb-6 flex items-center justify-between">

                                <h2 className="text-2xl font-bold">
                                    Recent Submissions
                                </h2>

                            </div>

                            <div className="space-y-4">

                                {
                                    recentSubmissions.map(
                                        (
                                            submission
                                        ) => (

                                            <div
                                                key={
                                                    submission.id
                                                }
                                                className="rounded-2xl border border-zinc-800 bg-black/40 p-5"
                                            >

                                                <div className="flex items-start justify-between gap-4">

                                                    <div>

                                                        <h3 className="text-lg font-semibold text-white">

                                                            {
                                                                submission.taskTitle
                                                            }

                                                        </h3>

                                                        <p className="mt-1 text-sm text-zinc-500">

                                                            {
                                                                submission.userName
                                                            }

                                                        </p>

                                                    </div>

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize
                                                        
                                                        ${submission.status ===
                                                                "approved"
                                                                ? "bg-emerald-500/15 text-emerald-400"

                                                                : submission.status ===
                                                                    "rejected"
                                                                    ? "bg-red-500/15 text-red-400"

                                                                    : "bg-yellow-500/15 text-yellow-400"
                                                            }
                                                        
                                                        `}
                                                    >

                                                        {
                                                            submission.status
                                                        }

                                                    </span>

                                                </div>

                                                <a
                                                    href={
                                                        submission.submissionUrl
                                                    }
                                                    target="_blank"
                                                    className="mt-4 inline-flex text-sm text-cyan-400 hover:text-cyan-300"
                                                >

                                                    Open Submission →

                                                </a>

                                            </div>
                                        )
                                    )
                                }

                            </div>

                        </div>

                        {/* TASKS */}
                        <div className="rounded-3xl border border-cyan-400/10 bg-zinc-900 p-6">

                            <div className="mb-6 flex items-center justify-between">

                                <h2 className="text-2xl font-bold">
                                    Domain Tasks
                                </h2>

                            </div>

                            <div className="grid gap-5 md:grid-cols-2">

                                {
                                    tasks.map(
                                        (
                                            task
                                        ) => (

                                            <div
                                                key={
                                                    task.id
                                                }
                                                className="rounded-2xl border border-zinc-800 bg-black/40 p-5 transition-all hover:border-cyan-400/30"
                                            >

                                                <h3 className="text-lg font-semibold">

                                                    {
                                                        task.title
                                                    }

                                                </h3>

                                                <p className="mt-2 line-clamp-3 text-sm text-zinc-500">

                                                    {
                                                        task.description
                                                    }

                                                </p>

                                                <div className="mt-5 flex items-center justify-between">

                                                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400">

                                                        {
                                                            task.points
                                                        }{" "}
                                                        pts

                                                    </span>

                                                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs capitalize text-zinc-300">

                                                        {
                                                            task.difficulty
                                                        }

                                                    </span>

                                                </div>

                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/manager/tasks/${task.id}`
                                                        )
                                                    }
                                                    className="mt-5 w-full rounded-xl border border-cyan-400/20 bg-cyan-400/10 py-3 text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-400 hover:text-black"
                                                >

                                                    Manage Task

                                                </button>

                                            </div>
                                        )
                                    )
                                }

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-8">

                        {/* PENDING QUEUE */}
                        <div className="rounded-3xl border border-yellow-400/10 bg-zinc-900 p-6">

                            <h2 className="text-2xl font-bold">
                                Pending Queue
                            </h2>

                            <div className="mt-6 space-y-4">

                                {
                                    pendingSubmissions.map(
                                        (
                                            submission
                                        ) => (

                                            <div
                                                key={
                                                    submission.id
                                                }
                                                className="rounded-2xl border border-zinc-800 bg-black/40 p-4"
                                            >

                                                <h3 className="font-medium">

                                                    {
                                                        submission.taskTitle
                                                    }

                                                </h3>

                                                <p className="mt-1 text-sm text-zinc-500">

                                                    {
                                                        submission.userName
                                                    }

                                                </p>

                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/manager/review/${submission.id}`
                                                        )
                                                    }
                                                    className="mt-4 w-full rounded-xl bg-yellow-400 py-2 text-sm font-medium text-black transition-all hover:bg-yellow-300"
                                                >

                                                    Review

                                                </button>

                                            </div>
                                        )
                                    )
                                }

                            </div>

                        </div>

                        {/* ANALYTICS */}
                        <div className="rounded-3xl border border-cyan-400/10 bg-zinc-900 p-6">

                            <h2 className="text-2xl font-bold">
                                Analytics
                            </h2>

                            <div className="mt-6 space-y-5">

                                <div className="flex items-center justify-between">

                                    <span className="text-zinc-400">
                                        Tasks
                                    </span>

                                    <span className="font-semibold">
                                        {
                                            tasks.length
                                        }
                                    </span>

                                </div>

                                <div className="flex items-center justify-between">

                                    <span className="text-zinc-400">
                                        Reviews Pending
                                    </span>

                                    <span className="font-semibold text-yellow-400">

                                        {
                                            pendingSubmissions.length
                                        }

                                    </span>

                                </div>

                                <div className="flex items-center justify-between">

                                    <span className="text-zinc-400">
                                        Approved
                                    </span>

                                    <span className="font-semibold text-emerald-400">

                                        {
                                            approvedCount
                                        }

                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* DOMAIN INFO */}
                        <div className="rounded-3xl border border-cyan-400/10 bg-zinc-900 p-6">

                            <h2 className="text-2xl font-bold">
                                Domain Info
                            </h2>

                            <div className="mt-6 space-y-5">

                                <div>

                                    <p className="text-sm text-zinc-500">
                                        Manager
                                    </p>

                                    <p className="mt-1 font-medium">

                                        {
                                            managerName
                                        }

                                    </p>

                                </div>

                                <div>

                                    <p className="text-sm text-zinc-500">
                                        Domain
                                    </p>

                                    <p className="mt-1 capitalize font-medium">

                                        {domain.replace(/-/g, " ")}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-sm text-zinc-500">
                                        Role
                                    </p>

                                    <p className="mt-1 font-medium">

                                        {role}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}