"use client";

import {
    ChevronRight,
    CircleHelp,
    LogOut,
    Pencil,
    Settings2,
    User2,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

const settingItems = [
    { title: "Edit Profile", description: "Update your personal details and social links.", icon: Pencil, href: "/dashboard/settings/edit-profile" },
    { title: "Account Info", description: "View your account status and ambassador details.", icon: User2, href: "/dashboard/settings/account-info" },
    { title: "Refer a Friend", description: "Share your referral code and grow the community.", icon: Settings2, href: "/dashboard/settings/referrals" },
    { title: "Support & Help", description: "Get assistance, FAQs, and contact support.", icon: CircleHelp, href: "/dashboard/settings/support" },
];

const SettingsPage = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <main className="flex justify-center items-center py-12">
            <div className="lg:w-[60%] w-[90%]">
                <div className="flex-1 space-y-6 w-full">
                    
                    {/* HEADING */}
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-amber-500/70">
                            Control Center
                        </p>
                        <h2 className="mt-7 text-2xl md:text-3xl md:text-5xl font-bold text-[#2b271d]">
                            Settings
                        </h2>
                    </div>

                    {/* SETTINGS ITEMS */}
                    <div className="space-y-4">
                        {settingItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group relative flex w-full items-center justify-between overflow-hidden rounded-[2rem] border border-amber-500/20 bg-[#E4C96A] p-6 text-left transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(217,119,6,0.15)]"
                                >
                                    <div className="flex items-center gap-5 relative z-10">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/50 bg-[#845735]/8 text-[#845735] transition-all duration-300 group-hover:bg-amber-500/[0.15]">
                                            <Icon size={26} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#FDF6E3]">{item.title}</h3>
                                            <p className="mt-1 text-sm text-amber-100/50">{item.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-amber-700 transition-all group-hover:translate-x-1 group-hover:text-amber-400" />
                                </Link>
                            );
                        })}
                    </div>

                    {/* LOGOUT */}
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-between rounded-[2rem] border border-[#E7A7A7] bg-[#FBE4E4] p-6 transition-all duration-300 hover:bg-[#F5D1D1]"
                    >
                        <div className="flex items-center gap-5">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FBE4E4] text-[#B54747] border border-[#E7A7A7]">
                                <LogOut size={26} />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-[#B54747]">Logout</h3>
                                <p className="mt-1 text-sm text-[#B54747]/60">Securely sign out from your ambassador account.</p>
                            </div>
                        </div>
                        <ChevronRight className="text-[#B54747]" />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default SettingsPage;