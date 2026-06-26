"use client";

import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import {
    BadgeCheck,
    CalendarDays,
    Medal,
    Target,
    Trophy,
    Users,
} from "lucide-react";

import { User } from "firebase/auth";

const AccountInfoPage = () => {

    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState<any>(null);

    const [rank, setRank] = useState<number | null>(null);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(
            async (user: User | null) => {

                try {

                    if (!user) {
                        setLoading(false);
                        return;
                    }

                    /* FETCH CURRENT USER */
                    const userQuery = query(
                        collection(db, "users"),
                        where("uid", "==", user.uid)
                    );

                    const userSnapshot = await getDocs(userQuery);

                    if (!userSnapshot.empty) {

                        const userDoc = userSnapshot.docs[0];

                        const data = userDoc.data();

                        setUserData(data);

                        /* CALCULATE RANK */
                        const leaderboardQuery = query(
                            collection(db, "users"),
                            orderBy("points", "desc")
                        );

                        const leaderboardSnapshot =
                            await getDocs(leaderboardQuery);

                        const users = leaderboardSnapshot.docs.map(
                            (doc) => doc.data()
                        );

                        const userRank =
                            users.findIndex(
                                (u) => u.uid === user.uid
                            ) + 1;

                        setRank(userRank);

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

    if (loading) {

        return (

            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-[#F8F4E8]
                    px-4 py-8
                    lg:px-10
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

    const infoCards = [
        {
            title: "Ambassador ID",
            value: userData?.userId || "N/A",
            icon: BadgeCheck,
        },
        {
            title: "Points",
            value: userData?.points || 0,
            icon: Trophy,
        },
        {
            title: "Rank",
            value: rank ? `#${rank}` : "N/A",
            icon: Medal,
        },
        {
            title: "Referrals",
            value: userData?.referrals || 0,
            icon: Users,
        },
        {
            title: "Tasks Done",
            value: userData?.tasksDone || 0,
            icon: Target,
        },
        {
            title: "Joined At",
            value:
                userData?.createdAt?.toDate()?.toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }
                ) || "N/A",
            icon: CalendarDays,
        },
    ];

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

            <div className="mx-auto lg:w-[1020px]">

                {/* HEADING */}
                <div className="mb-12">

                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-[0.35em]
                            text-[#D4A514]
                            font-semibold
                        "
                    >
                        Control Center
                    </p>

                    <h1 className=" mt-3
                    text-2xl md:text-3xl md:text-5xl
                    font-bold
                    text-[#2F2A28]">
                        Account Info
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
                        View your ambassador statistics, rankings,
                        activity progress, and account information.
                    </p>

                </div>

                {/* GRID */}
                <div
                    className="
                        grid
                        gap-6
                        sm:grid-cols-2
                        xl:grid-cols-1 sm:grid-cols-3
                    "
                >

                    {infoCards.map((item) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={item.title}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-[2rem]

                                    border
                                    border-[#E6D28A]
                                    bg-[#F5EFCF]
                                    p-6
                                    shadow-[0_12px_40px_rgba(180,150,70,0.08)]

                                    transition-all
                                    duration-300

                                    hover:-translate-y-1
                                    hover:shadow-[0_12px_24px_rgba(212,165,20,0.12)]
                                "
                            >

                                {/* GLOW */}
                                {/* <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-0

                                        bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_35%)]

                                        opacity-0
                                        transition-opacity
                                        duration-300

                                        group-hover:opacity-100
                                    "
                                /> */}

                                {/* SHINE */}
                                {/* <div
                                    className="
                                        absolute
                                        inset-y-0
                                        -left-20
                                        w-20
                                        rotate-12

                                        bg-white/5
                                        blur-xl

                                        transition-all
                                        duration-700

                                        group-hover:left-[120%]
                                    "
                                /> */}

                                <div className="relative z-10">

                                    {/* ICON */}
                                    <div
                                        className="
                                            flex
                                            h-16
                                            w-16
                                            items-center
                                            justify-center
                                            rounded-2xl

                                            border
                                            border-[#D4A514]/10

                                            bg-[#D4A514]/[0.08]

                                            text-[#D4A514]

                                            shadow-[0_0_25px_rgba(34,211,238,0.08)]
                                        "
                                    >

                                        <Icon size={28} />

                                    </div>

                                    {/* TITLE */}
                                    <p
                                        className="
                                            mt-8
                                            text-[12px]
                                            uppercase
                                            tracking-[0.25em]
                                            text-[#8B6B2D]
                                            font-medium
                                        "
                                    >
                                        {item.title}
                                    </p>

                                    {/* VALUE */}
                                    <h2
                                        className="
                                            mt-2
                                            break-words
                                            text-[26px]
                                            font-semibold
                                            text-[#2F2A28]
                                        "
                                    >
                                        {item.value}
                                    </h2>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </main>

    );

};

export default AccountInfoPage;