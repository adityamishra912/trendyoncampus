"use client";

import { useState } from "react";

import {
    ChevronDown,
    CircleHelp,
    Mail,
} from "lucide-react";

const faqs = [
    {
        question: "How do referrals work?",
        answer:
            "Share your referral code with friends. When they register using your code, the referral gets credited to your account.",
    },
    {
        question: "How are points awarded?",
        answer:
            "Points are awarded based on completed tasks, referrals, event participation, and ambassador activities.",
    },
    {
        question: "When does the leaderboard update?",
        answer:
            "The leaderboard updates dynamically whenever points or referrals are updated in the system.",
    },
    {
        question: "How can I improve my rank?",
        answer:
            "Complete more tasks, participate in events, and invite more users using your referral code to climb the rankings.",
    },
    {
        question: "Why are my points not updating?",
        answer:
            "Points may take some time to reflect after task verification. If the issue persists, contact support.",
    },
];

const HelpSupportPage = () => {

    const [openIndex, setOpenIndex] =
        useState<number | null>(0);

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

            <div className="mx-auto lg:w-[840px]">

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
                        Support Center
                    </p>

                    <h1 className="mt-3 text-6xl font-semibold text-[#2F2A28]">
                        Help & Support
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
                        Need assistance with referrals, tasks,
                        rankings, or your ambassador account?
                        We’re here to help you throughout your
                        ambassador journey.
                    </p>

                </div>

                {/* CONTACT SUPPORT */}
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

                            <Mail size={34} />

                        </div>

                        <h2 className="mt-8 text-2xl md:text-3xl font-semibold text-[#2F2A28]">
                            Contact Support
                        </h2>

                        <p className="mt-4 max-w-2xl leading-8 text-[#7A6A50]">
                            Facing issues with your account,
                            leaderboard, referrals, or tasks?
                            Reach out to our support team and
                            we’ll assist you as soon as possible.
                        </p>

                        {/* EMAIL */}
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
                                    Support Email
                                </p>

                                <h3
                                    className="
                                        mt-3
                                        break-all
                                        text-2xl
                                        font-semibold
                                        text-[#D4A514]
                                    "
                                >
                                    support@trendyca.com
                                </h3>

                            </div>

                            <a
                                href="mailto:support@trendyca.com"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-3

                                    rounded-2xl

                                    border
                                    bg-gradient-to-r
                                    from-[#D9A520]
                                    to-[#B8860B]

                                    text-white

                                    border-transparent
                                    shadow-[0_8px_20px_rgba(212,165,20,0.25)]
                                    px-7
                                    py-4

                                    font-medium

                                    transition-all
                                    duration-300

                                    hover:scale-[1.02]
                                    hover:shadow-[0_12px_24px_rgba(212,165,20,0.35)]
                                "
                            >
                                <Mail size={20} />

                                Email Support
                            </a>

                        </div>

                    </div>

                </div>

                {/* FAQ */}
                <div className="mt-16">

                    <div className="flex items-center gap-3">

                        <CircleHelp
                            className="text-[#D4A514]"
                            size={30}
                        />

                        <h2 className="text-4xl font-semibold text-[#2F2A28]">
                            Frequently Asked Questions
                        </h2>

                    </div>

                    <div className="mt-8 space-y-5">

                        {faqs.map((faq, index) => {

                            const isOpen =
                                openIndex === index;

                            return (

                                <div
                                    key={faq.question}
                                    className="
                                        overflow-hidden
                                        rounded-[2rem]

                                        border
                                        border-[#E6D28A]
bg-[#F5EFCF]

transition-all
duration-300

hover:-translate-y-1
hover:shadow-[0_10px_20px_rgba(212,165,20,0.10)]
                                    "
                                >

                                    <button
                                        onClick={() =>
                                            setOpenIndex(
                                                isOpen
                                                    ? null
                                                    : index
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between

                                            px-7
                                            py-6

                                            text-left
                                        "
                                    >

                                        <h3
                                            className="
                                                text-base md:text-xl
                                                font-semibold
                                                text-[#2F2A28]
                                            "
                                        >
                                            {faq.question}
                                        </h3>

                                        <ChevronDown
                                            className={`
                                                transition-all
                                                duration-300
                                                text-[#D4A514]

                                                ${isOpen
                                                    ? "rotate-180"
                                                    : ""
                                                }
                                            `}
                                        />

                                    </button>

                                    <div
                                        className={`
                                            grid
                                            transition-all
                                            duration-300

                                            ${isOpen
                                                ? "grid-rows-[1fr]"
                                                : "grid-rows-[0fr]"
                                            }
                                        `}
                                    >

                                        <div className="overflow-hidden">

                                            <p
                                                className="
                                                    px-7
                                                    pb-7

                                                    leading-8
                                                    text-[#7A6A50]
                                                "
                                            >
                                                {faq.answer}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </div>

        </main>

    );

};

export default HelpSupportPage;