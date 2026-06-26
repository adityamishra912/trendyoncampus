import Link from "next/link";
import { Home, ShieldCheck, Sparkles, Trophy, Users, Wallet, Zap } from "lucide-react";

const navItems = [
  { href: "/dashboard/ambassador", label: "Ambassador", icon: Home },
  { href: "/dashboard/manager", label: "Manager", icon: ShieldCheck },
  { href: "/dashboard/admin", label: "Admin", icon: Users }
];

export function DashboardSidebar() {
  return (
    <aside className="flex min-h-screen flex-col border-r border-[#D4AF37]/20 bg-gradient-to-b from-white/90 to-[#FAF4D3]/90 p-6 text-[#2D2926]">
      <div className="mb-10 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#2D2926] shadow-lg">
          <Zap size={20} />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#8B6F47]">TCAP</p>
          <h2 className="text-base md:text-xl font-semibold text-[#2D2926]">Control hub</h2>
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-white/30 to-[#FAF4D3]/50 px-4 py-4 text-sm font-medium text-[#2D2926] transition hover:border-[#D4AF37] hover:text-[#D4A514]">
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-4 rounded-3xl border border-[#E6D28A] bg-gradient-to-br from-white/30 to-[#FAF4D3]/50 p-4">
        <div className="flex items-center justify-between text-sm text-[#6D4C41]">
          <span>Rank</span>
          <span className="text-[#2D2926]">Silver</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#F5EFCF]">
          <div className="h-full w-3/5 rounded-full bg-[#D4A514]" />
        </div>
      </div>
    </aside>
  );
}
