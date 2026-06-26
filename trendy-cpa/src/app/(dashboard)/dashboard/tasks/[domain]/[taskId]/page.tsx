"use client";

import { useEffect, useState } from "react";

import {
    doc,
    getDoc,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    Timestamp
} from "firebase/firestore";

import { db, auth } from "@/lib/firebase";

import { useParams } from "next/navigation";
import { Zap } from "lucide-react";

interface Task {
    title: string;
    description: string;
    domain: string;
    points: number;
    difficulty: string;
}

interface Submission {
    id: string;
    submissionUrl: string;
    status: "pending" | "approved" | "rejected";
    submittedAt?: Timestamp;
    rejectionReason?: string;
}

const Page = () => {
    const params = useParams();

    const taskId = params.taskId as string;

    const [task, setTask] = useState<Task | null>(null);

    const [submissions, setSubmissions] = useState<Submission[]>([]);

    const [loading, setLoading] = useState(true);

    const [showPopup, setShowPopup] = useState(false);

    const [submissionUrl, setSubmissionUrl] = useState("");

    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // FETCH TASK
                const taskRef = doc(db, "tasks", taskId);

                const taskSnap = await getDoc(taskRef);

                if (taskSnap.exists()) {
                    setTask(taskSnap.data() as Task);
                }

                // FETCH SUBMISSIONS
                const q = query(
                    collection(db, "submissions"),
                    where("taskId", "==", taskId),
                    where("userEmail", "==", auth.currentUser?.email)
                );

                const querySnapshot = await getDocs(q);

                // const fetchedSubmissions = querySnapshot.docs.map((doc) => ({
                //     id: doc.id,
                //     ...doc.data(),
                // })) as Submission[];

                const fetchedSubmissions = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .sort(
                        (a: any, b: any) =>
                            b.submittedAt?.seconds - a.submittedAt?.seconds
                    ) as Submission[];

                setSubmissions(fetchedSubmissions);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [taskId]);

    const handleSubmitTask = async () => {
        try {
            setSubmitLoading(true);

            await addDoc(collection(db, "submissions"), {
                taskId,
                taskTitle: task?.title || "",
                taskDomain: task?.domain || "",
                userEmail: auth.currentUser?.email,
                submissionUrl,

                status: "pending",

                submittedAt: new Date(),
            });

            setSubmissions((prev) => [
                {
                    id: crypto.randomUUID(),
                    submissionUrl,
                    status: "pending",
                    submittedAt: Timestamp.now(),
                },
                ...prev,
            ]);

            setSubmissionUrl("");

            setShowPopup(false);

        } catch (error) {
            console.error(error);
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-[#2D2926]">
                Loading...
            </div>
        );
    }

    if (!task) {
        return (
            <div className="p-10 text-[#2D2926]">
                Task not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] text-[#2D2926] lg:h-screen lg:overflow-hidden">

            {/* PAGE CONTAINER */}
            <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 lg:h-[calc(100vh-88px)] lg:flex-row lg:p-6">

                {/* ================================================= */}
                {/* LEFT SECTION — TASK DETAILS */}
                {/* ================================================= */}

                <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-white/40 to-[#FAF4D3]/50 lg:flex lg:w-[58%] lg:flex-col">

                    {/* ambient glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_40%)]"></div>

                    {/* accent line */}
                    <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

                    <div className="relative z-10 flex flex-col p-6 lg:h-full">

                        {/* TASK HEADER */}
                        <div className="border-b border-[#D4AF37]/20 pb-6">

                            {/* pills */}
                            <div className="flex flex-wrap items-center gap-3">

                                {/* points */}
                                <div className="flex h-11 items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/15 px-4">

                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37]/25">
                                        <Zap size={14} className="text-[#8B6F47]" />
                                    </div>

                                    <span className="text-sm font-semibold text-[#8B6F47]">
                                        {task.points} pts
                                    </span>

                                </div>

                                {/* difficulty */}
                                <div className="flex h-11 items-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 text-sm text-[#6D4C41]">
                                    {task.difficulty}
                                </div>

                            </div>

                            {/* title */}
                            <h1 className="mt-6 text-4xl font-bold leading-tight lg:text-2xl md:text-3xl md:text-5xl">
                                {task.title}
                            </h1>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="mt-6 lg:flex-1 lg:overflow-y-auto pr-2 custom-scrollbar">

                            {/* description */}
                            <div className="space-y-6 text-lg leading-8 text-[#5d4037]">

                                <p>
                                    {task.description}
                                </p>

                            </div>

                        </div>

                        {/* bottom action */}
                        <div className="mt-6 border-t border-[#D4AF37]/20 pt-6">

                            <button
                                onClick={() => setShowPopup(true)}
                                className="group relative w-full overflow-hidden rounded-2xl"
                            >

                                {/* glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37] opacity-60 blur-md animate-pulse"></div>

                                {/* button */}
                                <div className="relative flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] font-semibold text-[#2D2926] transition-all duration-300 group-hover:scale-[1.01]">

                                    {/* shine */}
                                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                        <div className="absolute top-0 left-[-120%] h-full w-[40%] rotate-12 bg-white/30 blur-md animate-[shine_3s_linear_infinite]" />
                                    </div>

                                    <span className="relative z-10">
                                        Submit Task
                                    </span>

                                </div>

                            </button>

                        </div>

                    </div>

                </div>

                {/* ================================================= */}
                {/* RIGHT SECTION — SUBMISSIONS */}
                {/* ================================================= */}

                <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-white/40 to-[#FAF4D3]/50 lg:flex lg:w-[42%] lg:flex-col">

                    {/* ambient glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_40%)]"></div>

                    {/* accent */}
                    <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

                    <div className="relative z-10 flex flex-col p-6 lg:h-full">

                        {/* header */}
                        <div className="border-b border-[#D4AF37]/20 pb-6">

                            <h2 className="text-4xl font-bold text-[#2D2926]">
                                Submissions
                            </h2>

                            <p className="mt-2 text-[#6D4C41]">
                                Upload and manage your submissions
                            </p>

                        </div>

                        {/* submissions list */}
                        <div className="mt-6 space-y-4 lg:flex-1 lg:overflow-y-auto pr-2 gold-scrollbar">

                            {submissions.length === 0 ? (

                                <div className="flex h-full min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-[#D4AF37]/30 bg-[#FAF4D3]/20">

                                    <div className="text-center">

                                        <p className="text-base md:text-xl text-[#6D4C41]">
                                            No submissions yet
                                        </p>

                                        <p className="mt-2 text-[#8B6F47]">
                                            Submit your first task
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                submissions.map((submission) => (

                                    <div
                                        key={submission.id}
                                        className="rounded-2xl border border-[#D4AF37]/20 bg-[#FAF4D3]/30 p-5 transition-all duration-300 hover:border-[#D4AF37]/40"
                                    >

                                        {/* top row */}
                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0 flex-1">

                                                <h3 className="text-base md:text-xl font-semibold text-[#2D2926]">
                                                    Submission
                                                </h3>

                                                <a 
                                                    href={submission.submissionUrl}
                                                    className="mt-4 break-all text-blue-400">
                                                    {submission.submissionUrl}
                                                </a>

                                            </div>

                                            {/* status */}
                                            <div>

                                                {submission.status === "pending" && (
                                                    <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/15 px-4 py-2 text-sm text-[#8B6F47]">
                                                        Pending
                                                    </span>
                                                )}

                                                {submission.status === "approved" && (
                                                    <span className="rounded-full border border-[#8B6F47]/30 bg-[#8B6F47]/15 px-4 py-2 text-sm text-[#5d4037]">
                                                        Approved
                                                    </span>
                                                )}

                                                {submission.status === "rejected" && (
                                                    <span className="rounded-full border border-[#E57373]/30 bg-[#E57373]/15 px-4 py-2 text-sm text-[#C62828]">
                                                        Rejected
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                        {/* date */}
                                        <p className="mt-5 text-sm text-[#8B6F47]">
                                            Submitted on{" "}
                                            {submission.submittedAt
                                                ?.toDate()
                                                .toLocaleString()}
                                        </p>

                                        {/* rejection reason */}
                                        {submission.status === "rejected" &&
                                            submission.rejectionReason && (
                                                <div className="mt-5 rounded-2xl border border-[#E57373]/20 bg-[#E57373]/10 p-4">

                                                    <p className="text-sm text-[#C62828]">
                                                        Reason:
                                                    </p>

                                                    <p className="mt-2 text-[#6D4C41]">
                                                        {submission.rejectionReason}
                                                    </p>

                                                </div>
                                            )}

                                    </div>

                                ))

                            )}

                        </div>

                    </div>

                </div>

            </div>

            {/* ================================================= */}
            {/* POPUP */}
            {/* ================================================= */}

            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2926]/40 backdrop-blur-sm p-6">

                    <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-white/80 to-[#FAF4D3]/60">

                        {/* ambient */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_40%)]"></div>

                        {/* accent */}
                        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

                        <div className="relative z-10 p-6">

                            <h2 className="text-4xl font-bold text-[#2D2926]">
                                Submit Task
                            </h2>

                            <p className="mt-3 text-[#6D4C41]">
                                Paste your GitHub, Drive, or deployment link
                            </p>

                            {/* input */}
                            <input
                                type="text"
                                placeholder="https://..."
                                value={submissionUrl}
                                onChange={(e) =>
                                    setSubmissionUrl(e.target.value)
                                }
                                className="mt-8 h-14 w-full rounded-2xl border border-[#D4AF37]/40 bg-[#FFFBF0]/60 px-5 text-[#2D2926] outline-none transition-all focus:border-[#D4AF37]"
                            />

                            {/* buttons */}
                            <div className="mt-8 flex gap-4">

                                {/* submit */}
                                <button
                                    onClick={handleSubmitTask}
                                    disabled={submitLoading}
                                    className="group relative flex-1 overflow-hidden rounded-2xl"
                                >

                                    {/* glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37] opacity-60 blur-md animate-pulse"></div>

                                    {/* btn */}
                                    <div className="relative flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] font-semibold text-[#2D2926]">

                                        <span className="relative z-10">
                                            {submitLoading
                                                ? "Submitting..."
                                                : "Submit"}
                                        </span>

                                    </div>

                                </button>

                                {/* cancel */}
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="h-14 flex-1 rounded-2xl border border-[#D4AF37]/40 bg-[#FAF4D3]/40 font-semibold text-[#6D4C41] transition-all hover:border-[#D4AF37]/60"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Page;