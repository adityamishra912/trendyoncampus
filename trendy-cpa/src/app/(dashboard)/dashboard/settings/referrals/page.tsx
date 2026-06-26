"use client";

import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { User } from "firebase/auth";

import {
    Check,
    Copy,
    Gift,
    Share2,
    Users,
} from "lucide-react";

import toast from "react-hot-toast";

import { auth, db } from "@/lib/firebase";

const ReferFriendPage = () => {

    const [loading, setLoading] = useState(true);

    const [copied, setCopied] = useState(false);

    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(
            async (user: User | null) => {

                try {

                    if (!user) {
                        setLoading(false);
                        return;
                    }

                    const q = query(
                        collection(db, "users"),
                        where("uid", "==", user.uid)
                    );

                    const snapshot = await getDocs(q);

                    if (!snapshot.empty) {

                        const data =
                            snapshot.docs[0].data();

                        setUserData(data);

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

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(
                userData?.referralCode || ""
            );

            setCopied(true);

            toast.success("Referral code copied");

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-black
                "
            >

                <div
                    className="
                        h-14
                        w-14
                        animate-spin
                        rounded-full
                        border-2
                        border-cyan-400/20
                        border-t-cyan-300
                    "
                />

            </div>

        );

    }

    return (

        <main
            className="
                min-h-screen
                bg-[#F8F4E8]
                px-4
                py-10
                lg:px-10
            "
        >

            <div className="mx-auto lg:w-[860px]">

                {/* HEADING */}
                <div className="mb-12">

                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-[0.35em]
                            text-[#D4A514]
                        "
                    >
                        Growth Center
                    </p>

                    <h1 className="mt-3 text-6xl font-semibold text-[#2F2A28]">
                        Refer a Friend
                    </h1>

                    <p
                        className="
                            mt-5
                            max-w-3xl
                            text-lg
                            leading-8
                            text-[#7A6A50]
                        "
                    >
                        Invite your friends to join the campus
                        ambassador program and grow your network
                        while earning rewards and recognition.
                    </p>

                </div>

                {/* HERO CARD */}
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[2.5rem]

                        border
                        border-[#E6D28A]
                        bg-[#F5EFCF]

                        p-6

                        shadow-[0_12px_40px_rgba(180,150,70,0.08)]
                    "
                >

                    {/* GLOW */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0

                            bg-[radial-gradient(circle_at_top,rgba(212,165,20,0.10),transparent_45%)]
                        "
                    />

                    <div className="relative z-10">

                        {/* ICON */}
                        <div
                            className="
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-3xl

                                border
                                border-[#E6D28A]
                                bg-[#FFFBEF]
                                text-[#D4A514]

                                shadow-[0_0_35px_rgba(34,211,238,0.12)]
                            "
                        >

                            <Gift size={34} />

                        </div>

                        {/* TITLE */}
                        <h2 className="mt-8 text-2xl md:text-3xl font-semibold text-[#2F2A28]">
                            Your Referral Code
                        </h2>

                        <p className="mt-3 max-w-2xl text-[#7A6A50]">
                            Share this referral code with your
                            friends and invite them to join the
                            ambassador community.
                        </p>

                        {/* CODE BOX */}
                        <div
                            className="
                                mt-8
                                flex
                                flex-col
                                gap-5

                                rounded-[2rem]
                                border
                                border-[#E6D28A]
                                bg-[#FFFBEF]

                                p-6

                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-sm
                                        uppercase
                                        tracking-[0.3em]
                                        text-[#8B6B2D]
                                    "
                                >
                                    Referral Code
                                </p>

                                <h3
                                    className="
                                        mt-3
                                        break-all
                                        text-4xl
                                        font-semibold
                                        tracking-[0.15em]
                                        text-[#D4A514]
                                    "
                                >
                                    {userData?.referralCode ||
                                        "N/A"}
                                </h3>

                            </div>

                            {/* COPY BUTTON */}
                            <button
                                onClick={handleCopy}
                                className="
                                    group
                                    flex
                                    items-center
                                    justify-center
                                    gap-3

                                    rounded-2xl

                                    border
                                    border-transparent

                                    bg-gradient-to-r
                                    from-[#D9A520]
                                    to-[#B8860B]

                                    px-7
                                    py-4

                                    text-white

                                    transition-all
                                    duration-300
                                    shadow-[0_8px_20px_rgba(212,165,20,0.25)]

                                    hover:scale-[1.02]
                                    hover:shadow-[0_12px_24px_rgba(212,165,20,0.35)]
                                "
                            >

                                {copied ? (
                                    <Check size={20} />
                                ) : (
                                    <Copy size={20} />
                                )}

                                <span className="font-medium">
                                    {copied
                                        ? "Copied"
                                        : "Copy Code"}
                                </span>

                            </button>

                        </div>

                    </div>

                </div>

                {/* STATS */}
                <div
                    className="
                        mt-8
                        grid
                        gap-6
                        md:grid-cols-2
                    "
                >

                    {/* REFERRALS */}
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[2rem]

                            border
                            border-[#E6D28A]
bg-[#F5EFCF]

hover:-translate-y-1
hover:shadow-[0_12px_24px_rgba(212,165,20,0.12)]

                            p-7
                        "
                    >

                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl

                                border
                                border-[#E6D28A]
                                bg-[#FFFBEF]
                                text-[#D4A514]
                            "
                        >

                            <Users size={28} />

                        </div>

                        <p
                            className="
                                mt-8
                                text-sm
                                uppercase
                                tracking-[0.3em]
                                text-[#8B6B2D]
                            "
                        >
                            Total Referrals
                        </p>

                        <h2 className="mt-4 text-2xl md:text-3xl md:text-5xl font-semibold text-[#2F2A28]">
                            {userData?.referrals || 0}
                        </h2>

                    </div>

                    {/* SHARE */}
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[2rem]

                            border
                            border-[#E6D28A]
bg-[#F5EFCF]

hover:-translate-y-1
hover:shadow-[0_12px_24px_rgba(212,165,20,0.12)]

                            p-7
                        "
                    >

                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl

                                border
                                border-[#E6D28A]
bg-[#FFFBEF]
text-[#D4A514]
                            "
                        >

                            <Share2 size={28} />

                        </div>

                        <p
                            className="
                                mt-8
                                text-sm
                                uppercase
                                tracking-[0.3em]
                                text-[#8B6B2D]
                            "
                        >
                            Start Sharing
                        </p>

                        <p className="mt-4 text-lg leading-8 text-[#2F2A28]">
                            Share your referral code across your
                            college network, social media, and
                            communities to invite more ambassadors.
                        </p>

                    </div>

                </div>

                {/* HOW IT WORKS */}
                <div
                    className="
                        mt-8
                        rounded-[2.5rem]

                        border
                        border-[#E6D28A]
                        bg-[#F5EFCF]
                        shadow-[0_12px_40px_rgba(180,150,70,0.08)]
                        p-6
                    "
                >

                    <h2 className="text-2xl md:text-3xl font-semibold text-[#2F2A28]">
                        How It Works
                    </h2>

                    <div
                        className="
                            mt-10
                            grid
                            gap-6
                            md:grid-cols-1 sm:grid-cols-3
                        "
                    >

                        {[
                            {
                                step: "01",
                                title: "Share Your Code",
                                desc:
                                    "Send your unique referral code to friends and classmates.",
                            },
                            {
                                step: "02",
                                title: "They Register",
                                desc:
                                    "Friends join the ambassador program using your code.",
                            },
                            {
                                step: "03",
                                title: "Earn Rewards",
                                desc:
                                    "Get referral credit, recognition, and exclusive rewards.",
                            },
                        ].map((item) => (

                            <div
                                key={item.step}
                                className="
                                    rounded-[2rem]
                                    border
                                    border-[#E6D28A]
                                    bg-[#FFFBEF]
                                    p-6
                                    hover:-translate-y-1
hover:shadow-[0_12px_24px_rgba(212,165,20,0.12)]

                                "
                            >

                                {/* <p
                                    className="
                                        text-sm
                                        font-medium
                                        tracking-[0.3em]
                                        text-[#D4A514]
                                    "
                                >
                                    {item.step}
                                </p> */}

                                <div
                                    className="
        flex h-12 w-12
        items-center justify-center
        rounded-full
        bg-[#F7E8B2]
        text-[#B8860B]
        font-bold
    "
                                >
                                    {item.step}
                                </div>

                                <h3 className="mt-5 text-2xl font-semibold text-[#2F2A28]">
                                    {item.title}
                                </h3>

                                <p className="mt-4 leading-7 text-[#7A6A50]">
                                    {item.desc}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </main>

    );

};

export default ReferFriendPage;