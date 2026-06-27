"use client";

import {
    House,
    ListChecks,
    Medal,
    ShoppingBag,
    Trophy,
    Settings,
    Bell,
    Coins
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    Timestamp,
    doc,
    updateDoc,
    serverTimestamp,
    onSnapshot,
} from "firebase/firestore";
import Link from "next/link";
// import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

type Notification = {
    id: string;
    title?: string;
    message?: string;
    createdAt?: Timestamp;
};

type UserData = {
    id?: string;
    lastNotificationSeenAt?: Timestamp;
    points?: number;
    profilePicture?: string;
    fullName?: string;
};

const navItems = [
    {
        name: "home",
        label: "Home",
        href: "/dashboard/home",
        icon: House,
    },
    {
        name: "tasks",
        label: "Tasks",
        href: "/dashboard/tasks",
        icon: ListChecks,
    },
    {
        name: "leaderboard",
        label: "Leaderboard",
        href: "/dashboard/leaderboard",
        icon: Trophy,
    },
    {
        name: "rewards",
        label: "Rewards",
        href: "/dashboard/rewards",
        icon: Medal,
    },
    {
        name: "store",
        label: "Store",
        href: "/dashboard/store",
        icon: ShoppingBag,
    },
    {
        name: "settings",
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

const Navbar = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);

    const pathname = usePathname();

    // gets slug from /dashboard/[slug]
    const currentSlug = pathname.split("/")[2];

    // Get current user details 
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            async (currentUser) => {

                if (!currentUser?.email) return;

                const q = query(
                    collection(db, "users"),
                    where("email", "==", currentUser.email)
                );

                const snap = await getDocs(q);


                if (!snap.empty) {

                    const data = {
                        id: snap.docs[0].id,
                        ...snap.docs[0].data(),
                    };

                    setUserData(data);
                }
            }
        );

        return () => unsubscribe();

    }, []);

    // Fetch notifications
    useEffect(() => {

        const q = query(
            collection(db, "notifications"),
            orderBy("createdAt", "desc"),
            limit(15)
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setNotifications(data);
            }
        );

        return () => unsubscribe();

    }, []);
    
    // Calculate unread
    useEffect(() => {
        if (!userData) return;

        const unread = notifications.some((notification) => {
            if (!notification.createdAt) return false;

            if (!userData?.lastNotificationSeenAt) {
                return true;
            }

            return (
                notification.createdAt!.toMillis() >
                userData.lastNotificationSeenAt!.toMillis()
            );
        });

        setHasUnread(unread);
    }, [notifications, userData]);

    // Close notification
    const closeNotifications = async () => {
        setShowNotifications(false);

        if (!userData?.id) return;

        await updateDoc(
            doc(db, "users", userData.id),
            {
                lastNotificationSeenAt: serverTimestamp(),
            }
        );

        setHasUnread(false);
    };

    return (
        <>

            {/* TOP WHITE FADE */}
            <div className="pointer-events-none fixed top-0 left-0 z-40 h-32 w-full bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-[2px]" />

            {/* LOGO */}

            {/* replace with your logo */}
            <Link href={'/'}>
                <img
                    src="/logo.png"
                    alt="Logo"
                    width={220}
                    height={220}
                    className="object-contain dark:invert transition-colors duration-300 fixed top-6 left-4 z-[999] w-[120px] sm:w-[150px] lg:w-[220px] bg-transparent"
                />
            </Link>


            {/* NAVBAR */}
            <div className="fixed bottom-0 lg:top-4 left-0 right-0 z-50 px-4 py-3 lg:py-0 lg:h-60">
                <div className="mx-auto flex w-full max-w-6xl justify-center">
                    <div className="flex items-center gap-3 overflow-x-auto rounded-[2rem] border border-slate-200/10 bg-white/95 px-3 py-3 shadow-xl shadow-slate-900/10 backdrop-blur-md lg:border-none lg:bg-transparent lg:shadow-none">


                    {navItems.map((item) => {

                        const Icon = item.icon;

                        const isActive = currentSlug === item.name;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex-shrink-0"
                            >

                                <div
                                    className={`
                                        group relative flex h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] lg:h-[80px] lg:w-[80px]
                                        flex-col items-center justify-center
                                        rounded-2xl
                                        lg:border
                                        transition-all duration-300
                                        overflow-hidden

                                        ${isActive
                                            ? `
                                                bg-gradient-to-br
                                                from-[#D9A520]
                                                to-[#C68A11]
                                                text-white
                                                border-white/40
                                                shadow-[0_10px_30px_rgba(212,175,55,0.15)]
                                            `
                                            : `
                                                bg-white
                                                border-slate-200
                                                text-slate-700
                                                lg:shadow-[0_4px_12px_rgba(15,23,42,0.06)]
                                                hover:-translate-y-1
                                                hover:shadow-[0_10px_24px_rgba(15,23,42,0.10)]
                                                hover:border-slate-300
                                            `
                                        }
                                    `}
                                >

                                    {/* glow */}
                                    {isActive && (
                                        <div
                                            className="
                                                absolute inset-0
                                                bg-gradient-to-b
                                                from-[#D4AF37]/10
                                                to-transparent
                                            "
                                        />
                                    )}

                                    <Icon
                                        size={22}
                                        strokeWidth={2.2}
                                        className="relative z-10"
                                    />

                                    <span
                                        className="
                                            relative z-10 mt-1
                                            text-[11px] font-medium
                                            tracking-wide
                                        "
                                    >
                                        {item.label}
                                    </span>

                                </div>

                            </Link>
                        );
                    })}

                </div>

            </div>

            </div>

            {/* TOP RIGHT ACTIONS */}
            <div className="fixed top-6 right-4 z-50 flex items-center gap-2 sm:gap-3">

                {/* Points */}
                <div
                    className="
    flex items-center gap-2
    px-3 h-12 sm:h-14
    rounded-2xl
    border border-slate-200
    bg-white
    shadow-[0_4px_12px_rgba(15,23,42,0.06)]
  "
                >
                    <Coins
                        size={18}
                        className="text-[#D4A514]"
                    />

                    <span
                        className="
      font-semibold
      text-[#8B6B2D]
    "
                    >
                        {userData?.points ?? 0}
                    </span>
                </div>

                {/* Notifications */}
                <button
                    onClick={() =>
                        setShowNotifications(true)
                    }
                    className="
            relative flex h-14 w-14 items-center justify-center
            rounded-2xl
            border border-slate-200
            bg-white
            text-slate-700
            shadow-[0_4px_12px_rgba(15,23,42,0.06)]
            transition-all duration-300
            hover:-translate-y-1
            hover:border-slate-300
            hover:shadow-[0_10px_24px_rgba(15,23,42,0.10)]
        "
                >
                    <Bell size={22} />

                    {/* notification dot */}
                    {hasUnread && (
                        <span
                            className="
                absolute top-3 right-3
                h-2.5 w-2.5 rounded-full
                bg-red-500
            "
                        />
                    )}

                </button>

                {/* Theme Toggle */}
                {/* <button
                    onClick={() => {
                        toggleTheme();
                        console.log("Theme changed", theme);
                    }}
                    className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            border border-slate-200
            bg-white
            text-slate-700
            shadow-[0_4px_12px_rgba(15,23,42,0.06)]
            transition-all duration-300
            hover:-translate-y-1
            hover:border-slate-300
            hover:shadow-[0_10px_24px_rgba(15,23,42,0.10)]
        "
                >
                    {theme === "light" ? (
                        <Moon size={22} />
                    ) : (
                        <Sun size={22} />
                    )}
                </button> */}

            </div>

            {showNotifications && (
                <div className=" fixed top-24 right-4 left-4 z-[999] mx-auto w-[min(100%,420px)] rounded-3xl border border-[#E6D28A] bg-white shadow-2xl">
                    <div className="flex items-center justify-between p-4 sm:p-5 border-b">
                        <h2 className="font-bold text-lg">
                            Notifications
                        </h2>

                        <button onClick={closeNotifications}>✕
                        </button>
                    </div>

                    <div className="max-h-auto md:h-[500px]
min-h-[350px] overflow-y-auto">
                        {notifications.map((notification) => {
                            const unread =
                                (notification.createdAt?.toMillis() ?? 0) >
                                (userData?.lastNotificationSeenAt?.toMillis() ?? 0);

                            return (
                                <div key={notification.id} className={`p-4 border-b ${unread ? "bg-yellow-50" : ""}`}>
                                    <h3 className="font-semibold">
                                        {notification.title}
                                    </h3>

                                    <p className="text-sm text-slate-600">
                                        {notification.message}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
            }

        </>
    );
};

export default Navbar;