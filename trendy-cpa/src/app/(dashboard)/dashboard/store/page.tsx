"use client";

import Image from "next/image";

import {
    Crown,
    Gem,
    Lock,
    ShoppingBag,
    Sparkles,
    Trophy,
    Coins
} from "lucide-react";
import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { User } from "firebase/auth";

import { auth, db } from "@/lib/firebase";


const vaultItems = [
    {
        name: "Trendy T-Shirt",
        credits: 500,
        image: "/store/tshirt.png",
        requirement:
            "Need to be in Silver League or above to unlock",
    },
    {
        name: "Trendy Hoodie",
        credits: 400,
        image: "/store/hoodie.png",
        requirement:
            "Need to be in Silver League or above to unlock",
    },
    {
        name: "Mobile Stand",
        credits: 100,
        image: "/store/mobile-stand.png",
        requirement:
            "Need to be in Silver League or above to unlock",
    },
    {
        name: "Shoes",
        credits: 1000,
        image: "/store/shoes.png",
        requirement:
            "Need to be in Gold League or above to unlock",
    },
];

const StorePage = () => {

    const [loading, setLoading] = useState(true);

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

                        setUserData(
                            snapshot.docs[0].data()
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
                overflow-hidden
                px-4
                py-10
                lg:px-10
            "
        >

            <div className="relative z-10 mx-auto max-w-7xl">

                {/* HEADING */}
                <div className="mb-8 flex flex-col justify-center items-center">

                    <h1 className="text-7xl
            font-black
            tracking-tight
            text-[#2D2926]" style={{
                            fontFamily: "var(--font-space-grotesk)",
                        }}>
                        Store
                    </h1>

                    <p
                        className="mt-4 max-w-2xl text-base leading-7 text-[#9A7424] text-center" style={{
                            fontFamily: "var(--font-inter)",
                        }}
                    >
                        Climb the leaderboard and unlock exclusive titles, premium merchandise, discount coupons, and ambassador rewards with your earned credits and league progression. The ultimate rewards are reserved for the Top 3 ambassadors each season.
                    </p>

                </div>

                {/* VAULT */}
                <section className="mt-20">

                    {/* GRID */}
                    <div
                        className="
                            mt-10
                            grid
                            gap-6

                            sm:grid-cols-2
                            xl:grid-cols-4
                        "
                    >

                        {vaultItems.map((item) => {
                            // const eligible =
                            //     (userData?.points || 0) >= item.credits;
                            return (

                                <div
                                    key={item.name}
                                    className="
                                    group
                                    relative
                                    overflow-hidden

                                    rounded-[2rem]

                                    bg-[#FFFDF5]
                                    border border-[#E6D28A]

                                    transition-all
                                    duration-300

                                    hover:border-cyan-300/30
                                    hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]
                                "
                                >

                                    {/* IMAGE */}
                                    <div className="relative h-64 w-full">

                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="
                                            object-cover
                                            transition-transform
                                            duration-500

                                            group-hover:scale-105
                                        "
                                        />



                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-6">

                                        <h3 className="text-2xl text-center font-semibold leading-snug text-[#2F2A28]">
                                            {item.name}
                                        </h3>

                                        {/* <div
                                            className="
                                            mt-4
                                            flex
                                            items-center
                                            gap-2

                                            text-[#D4A514]
                                        "
                                        >

                                            <Coins size={18} />

                                            <span className="text-lg">
                                                {item.credits} Credits
                                            </span>

                                        </div> */}

                                        {/* <div
                                            className="
                                            mt-5
                                            flex
                                            items-start
                                            gap-2

                                            text-red-400
                                        "
                                        >

                                            <Trophy
                                                size={18}
                                                className="mt-1"
                                            />

                                            <span className="leading-7">
                                                {item.requirement}
                                            </span>

                                        </div> */}

                                        {/* BUTTON */}
                                        {/* <button
                                            className={`
    mt-7
    flex
    w-full
    items-center
    justify-center
    gap-3

    rounded-2xl

    border

    px-6
    py-4

    font-medium

    transition-all
    duration-300

    ${eligible
                                                    ? `
                bg-gradient-to-r
                from-[#D9A520]
                to-[#B8860B]
                text-white

                hover:border-cyan-300/30
                hover:bg-cyan-400/[0.12]
                hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]
              `
                                                    : `
                cursor-not-allowed
                bg-[#FBE4E4]
                border border-[#E7A7A7]
                text-[#B54747]
              `
                                                }
`}
                                        >

                                            <ShoppingBag size={20} />

                                            {eligible
                                                ? "Redeem Reward"
                                                : "Locked"}

                                        </button> */}

                                    </div>

                                </div>

                            )
                        })}

                    </div>

                </section>

            </div>

        </main>

    );

};

export default StorePage;