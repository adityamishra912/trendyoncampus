"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    limit,
    orderBy,
} from "firebase/firestore";
import {
    BadgeCheck,
    Mail,
    Phone,
    GraduationCap,
    Trophy,
    Coins,
    LucideIcon,
    Upload,
    UserRoundPlus,
    CircleCheckBig,
    UserCheck,
    LifeBuoy,
    Camera,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


type InfoCardProps = {
    label: string;
    value: string | number;
    icon: LucideIcon;
};

const InfoCard = ({
    label,
    value,
    icon: Icon,
}: InfoCardProps) => {
    return (
        <div className="group relative rounded-2xl">

            {/* Glow */}
            <div className="absolute inset-0 bg-[#D4AF37]/0 blur-2xl transition-all duration-300 group-hover:bg-[#D4AF37]/10" />

            <div className="relative flex items-start gap-4">

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FAF4D3] to-[#F4E8AB] border border-[#D4AF37]/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(212,175,55,0.08)]">
                    <Icon size={22} className="text-[#8B6F47]" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-[#6D4C41]">
                        {label}
                    </p>

                    <h2 className="mt-1 break-all text-md font-semibold text-[#2D2926]">
                        {value ?? "-"}
                    </h2>
                </div>
            </div>
        </div>
    );
};

const page = () => {
    const [userData, setUserData] = useState({
        userId: "",
        fullName: "",
        email: "",
        phone: "",
        profilePicture: "",
        college: "",
        branch: "",
        yearOfStudy: "",
        points: 0,
        tasksDone: 0,
        referrals: 0,
        rank: 0,
    });
    const [loading, setLoading] = useState(true);
    const [recentSubmissions, setRecentSubmissions] = useState<Array<Record<string, unknown>>>([]);
    const router = useRouter();

    // Ambassador Profile Info
    const infoItems = [
        {
            label: "CA ID",
            value: userData.userId,
            icon: BadgeCheck,
        },
        {
            label: "Email",
            value: userData.email,
            icon: Mail,
        },
        {
            label: "Phone",
            value: userData.phone,
            icon: Phone,
        },
        {
            label: "College",
            value: userData.college,
            icon: GraduationCap,
        },
        {
            label: "Points",
            value: userData.points,
            icon: Coins,
        },
        {
            label: "Rank",
            value: userData.rank,
            icon: Trophy,
        },

        {
            label: "Referrals",
            value: userData.referrals,
            icon: UserRoundPlus,
        },
        {
            label: "Tasks Done",
            value: userData.tasksDone,
            icon: CircleCheckBig,
        },
    ];

    // Quick actions
    const quickActions = [
        {
            title: "Submit New Task",
            description: "Upload proof for completed tasks",
            href: "/dashboard/tasks",
            icon: Upload,
            color:
                "from-[#FAF4D3]/50 to-[#F4E8AB]/30 border-[#D4AF37]/30 hover:border-[#D4AF37]/60",
            iconColor: "text-[#B8860B]",
        },
        {
            title: "View Leaderboard",
            description: "Check your ranking",
            href: "/dashboard/leaderboard",
            icon: Trophy,
            color:
                "from-[#F4E8AB]/40 to-[#ECE19F]/25 border-[#D4AF37]/25 hover:border-[#D4AF37]/50",
            iconColor: "text-[#8B6F47]",
        },
        {
            title: "Referral Code",
            description: "Refer friends & earn rewards",
            href: "/dashboard/settings/referrals",
            icon: UserCheck,
            color:
                "from-[#ECE19F]/35 to-[#FAF4D3]/20 border-[#B8860B]/20 hover:border-[#B8860B]/45",
            iconColor: "text-[#6D4C41]",
        },
        {
            title: "Help & Support",
            description: "Get assistance and FAQs",
            href: "/dashboard/settings/support",
            icon: LifeBuoy,
            color:
                "from-[#FFF8E7]/40 to-[#FAF4D3]/25 border-[#D4AF37]/20 hover:border-[#D4AF37]/50",
            iconColor: "text-[#5d4037]",
        },
    ];

    // Fetch user details
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, "users"),
                    where("email", "==", user.email)
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();

                    console.log(data);

                    // Calc rank
                    const higherUsersQuery = query(
                        collection(db, "users"),
                        where("points", ">", data.points)
                    );

                    const higherUsersSnapshot =
                        await getDocs(higherUsersQuery);

                    const rank =
                        higherUsersSnapshot.size + 1;

                    // Finally set data
                    setUserData({
                        userId: data.userId || "",
                        fullName: data.fullName || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        profilePicture: data.profilePicture || "",
                        college: data.college || "",
                        branch: data.branch || "",
                        yearOfStudy: data.yearOfStudy || "",
                        points: data.points,
                        tasksDone: data.tasksDone,
                        referrals: data.referrals,
                        rank: rank,
                    });

                }

                /*
              RECENT SUBMISSIONS
            */
                const submissionsQuery = query(

                    collection(db, "submissions"),
                    where("userEmail", "==", user.email),

                    orderBy("submittedAt", "desc"),

                    limit(5)

                );

                const submissionsSnapshot =
                    await getDocs(submissionsQuery);

                const submissionsData =
                    submissionsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                setRecentSubmissions(submissionsData);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // GSAP 
    useEffect(() => {
        if (loading) return;

        // Clear initial animation state
        gsap.set(".dashboard-animate-card", { opacity: 0, y: 30, scale: 0.95 });

        // Staggered layout staggers
        gsap.to(".dashboard-animate-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });

        // 3D Card tilt for CA Profile Card
        const profileCard = document.querySelector(".ca-profile-card") as HTMLElement;
        if (profileCard) {
            const onMouseMove = (e: MouseEvent) => {
                const rect = profileCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const angleX = (yc - y) / 10;
                const angleY = (x - xc) / 10;

                gsap.to(profileCard, {
                    rotationX: angleX,
                    rotationY: angleY,
                    transformPerspective: 800,
                    ease: "power2.out",
                    duration: 0.3
                });
            };

            const onMouseLeave = () => {
                gsap.to(profileCard, {
                    rotationX: 0,
                    rotationY: 0,
                    ease: "power2.out",
                    duration: 0.5
                });
            };

            profileCard.addEventListener("mousemove", onMouseMove);
            profileCard.addEventListener("mouseleave", onMouseLeave);

            return () => {
                profileCard.removeEventListener("mousemove", onMouseMove);
                profileCard.removeEventListener("mouseleave", onMouseLeave);
            };
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="text-[#5d4037] text-center mt-20 font-medium">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] flex flex-col items-center justify-center p-6">

            {/* Section 1 */}
            <div className="w-full max-w-6xl rounded-3xl p-6 grid grid-cols-1 grid-rows-[460px_auto] lg:grid-cols-[300px_auto] lg:grid-rows-1 gap-6">

                {/* LEFT SECTION */}
                <div className="flex justify-center items-center">


                    {/* CA Card */}
                    <div className="dashboard-animate-card ca-profile-card relative inline-block rounded-2xl cursor-pointer">
                        {/* Gradient Border */}
                        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6F47] blur-[2px] animate-pulse" />

                        {/* Lanyard */}
                        <img
                            src="/band.png"

                            className="absolute left-1/2 -translate-x-1/2 -top-[90%] z-30"
                        />

                        {/* Actual Content */}
                        <div className="relative rounded-2xl h-[420px] w-[280px] bg-gradient-to-br from-[#FAF4D3] to-[#F4E8AB] p-6 flex flex-col items-center justify-center ">

                            {/* <div className="h-32 w-32 rounded-full bg-cyan-500 flex items-center justify-center text-2xl md:text-3xl md:text-5xl font-bold text-black">
                                {userData.fullName?.charAt(0)}
                            </div> */}

                            <div
                                className="
            absolute
            top-3
            left-1/2
            -translate-x-1/2
            w-10
            h-4
            rounded-full
            bg-[#E8EDF2]
            border border-zinc-300
        "
                            />

                            {/* PROFILE IMAGE */}
                            <div
                                className="
                flex
                h-32
                w-32
                items-center
                justify-center

                rounded-full

                border
                border-[#D4AF37]/40

                bg-[#FAF4D3]/60

                text-2xl md:text-3xl md:text-5xl
                font-semibold
                text-[#2D2926]

                shadow-[0_0_40px_rgba(212,175,55,0.15)]
                relative
            "
                            >

                                <div className="h-full w-full rounded-full overflow-hidden">
                                    {userData?.profilePicture ? (

                                        <img
                                            src={userData.profilePicture}
                                            alt="Profile"
                                            className="
                        h-full
                        w-full
                        object-cover
                    "
                                        />

                                    ) : (

                                        <span>
                                            {userData?.fullName
                                                ?.charAt(0)
                                                ?.toUpperCase() || "A"}
                                        </span>

                                    )}
                                </div>

                                <button
                                    onClick={() =>
                                        router.push(
                                            "/dashboard/settings/edit-profile"
                                        )
                                    }
                                    className="
            absolute
            -bottom-2
            -right-2

            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-full

            bg-gradient-to-br
            from-[#D9A520]
            to-[#B8860B]

            text-white

            border-4
            border-[#F8F4E8]

            shadow-[0_8px_20px_rgba(212,165,20,0.35)]

            transition-all
            duration-300
            z-30

            hover:scale-110
            hover:shadow-[0_12px_24px_rgba(212,165,20,0.45)]
        "
                                >
                                    <Camera size={18} />
                                </button>

                            </div>

                            <h1 className="mt-6 text-2xl md:text-3xl font-bold text-[#2D2926] text-center">
                                {userData.fullName}
                            </h1>

                            {/* <p className="mt-4 text-[#6D4C41] text-center">
                                College Ambassador
                            </p> */}

                            {/* Ambassador tag */}
                            <p className="mt-4 flex justify-center">
                                <span className="relative inline-flex items-center overflow-hidden rounded-full px-6 py-2 text-sm font-semibold text-[#2D2926]">

                                    {/* Animated Glow */}
                                    <span className="absolute inset-0 rounded-full bg-[#D4AF37] blur-xl opacity-50 animate-pulse"></span>

                                    {/* Gradient Background */}
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6F47]"></span>

                                    {/* Moving Shine Effect */}
                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                        <span className="absolute top-0 left-[-120%] h-full w-[40%] rotate-12 bg-white/30 blur-md animate-[shine_3s_linear_infinite]" />
                                    </span>

                                    {/* Text */}
                                    <span className="relative z-10 tracking-wide">
                                        College Ambassador
                                    </span>

                                </span>
                            </p>

                        </div>
                    </div>



                </div>

                {/* RIGHT SECTION */}
                <div className="dashboard-animate-card relative rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-white/40 to-[#FAF4D3]/60 backdrop-blur-sm shadow-[0_0_40px_rgba(212,175,55,0.15)]">

                    {/* Animated Glow */}
                    <div className="absolute inset-0 bg-[#D4AF37]/5 blur-2xl animate-pulse"></div>

                    {/* Accent Line */}
                    <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70"></div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 md:h-[420px] p-6 rounded-2xl relative z-10 text-[#2D2926]">

                        <h1 className="text-2xl font-bold text-[#2D2926] m-4">
                            Ambassador Profile
                        </h1>

                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 mx-5">
                            {infoItems.map((item) => (
                                <InfoCard
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                    icon={item.icon}
                                />
                            ))}
                        </div>
                    </div>


                </div>

            </div>

            {/* Section 2 */}
            <div className="w-full max-w-6xl grid grid-cols-1 p-6 gap-6 lg:grid-cols-[1.2fr_0.8fr]">

                {/* LEFT SECTION */}
                <div className="dashboard-animate-card relative overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-white/30 to-[#FAF4D3]/40">

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_45%)]"></div>

                    {/* Top Accent */}
                    <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

                    <div className="relative z-10 p-6">
                        <h2 className="text-2xl font-bold text-[#2D2926]">
                            Recent Submissions
                        </h2>

                        <div className="relative mt-16 flex h-[420px] items-start justify-center">

                            {recentSubmissions.length === 0 ? (

                                <div className="flex h-[420px] w-full items-center justify-center rounded-2xl border border-dashed border-[#D4AF37]/40 bg-[#FAF4D3]/20">

                                    <div className="text-center">
                                        <p className="text-base md:text-xl text-[#5d4037]">
                                            No submissions yet.
                                        </p>

                                        <p className="mt-2 text-[#6D4C41]">
                                            Start completing tasks!
                                        </p>
                                    </div>

                                </div>

                            ) : (

                                <div className="flex flex-col gap-4 w-full mx-8">
                                    {recentSubmissions.map((submission) => (

                                        <div
                                            key={String(submission.id)}
                                            className="
          flex
          flex-col
          justify-between
          min-h-[80px]
          
          rounded-2xl
          border
          border-[#D4AF37]/30
          bg-gradient-to-br from-white/20 to-[#FAF4D3]/10
          p-5
          transition-all
          hover:border-[#D4AF37]/60
        "
                                        >

                                            <div className="flex items-start justify-between gap-2">

                                                <div>
                                                    <p className="text-lg font-semibold text-[#2D2926]">
                                                        {String(submission.taskTitle || '')}
                                                    </p>

                                                    <p className="mt-1 text-sm text-[#6D4C41]">
                                                        Submitted{" "}
                                                        {submission.submittedAt &&
                                                            typeof submission.submittedAt === "object" &&
                                                            submission.submittedAt !== null &&
                                                            "toDate" in submission.submittedAt
                                                            ? (submission.submittedAt as { toDate: () => Date })
                                                                .toDate()
                                                                .toLocaleDateString()
                                                            : "-"}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize

            ${String(submission.status) === "approved"
                                                            ? "bg-emerald-500/20 text-emerald-700"
                                                            : String(submission.status) === "rejected"
                                                                ? "bg-red-500/20 text-red-700"
                                                                : "bg-[#D4AF37]/20 text-[#8B6F47]"
                                                        }
          `}
                                                >
                                                    {String(submission.status || 'pending')}
                                                </span>

                                            </div>

                                            <Link
                                                href={`/dashboard/tasks/${submission.taskDomain}/${submission.taskId}`}
                                                className="mt-2 inline-flex text-sm text-[#B8860B] hover:text-[#8B6F47]"
                                            >
                                                View Submission →
                                            </Link>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="dashboard-animate-card relative overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-white/30 to-[#FAF4D3]/40">

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_45%)]"></div>

                    {/* Top Accent */}
                    <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

                    <div className="relative z-10 p-6">

                        <h2 className="text-2xl font-bold text-[#2D2926]">
                            Quick Actions
                        </h2>

                        <div className="mt-8 space-y-5">

                            {quickActions.map((action) => {
                                const Icon = action.icon;

                                return (
                                    <Link
                                        href={action.href}
                                        key={action.title}
                                        className={`group relative block w-full overflow-hidden rounded-2xl border bg-gradient-to-r ${action.color} p-5 text-left transition-all duration-300 hover:scale-[1.015]`}
                                    >

                                        {/* hover glow */}
                                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        <div className="relative flex items-center gap-5">

                                            {/* icon */}
                                            <div
                                                className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FAF4D3]/40 ${action.iconColor}`}
                                            >
                                                <Icon size={28} />
                                            </div>

                                            {/* content */}
                                            <div>
                                                <h3 className="text-md font-semibold text-[#2D2926]">
                                                    {action.title}
                                                </h3>

                                                <p className="mt-1 text-[#6D4C41] text-sm">
                                                    {action.description}
                                                </p>
                                            </div>

                                        </div>
                                    </Link>);
                            })}

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default page;
