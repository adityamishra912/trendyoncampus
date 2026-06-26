import { Card } from "@/components/ui/card";

const overviewData = [
  { label: "Pending tasks", value: "4", accent: "text-amber-300" },
  { label: "Completed tasks", value: "12", accent: "text-cyan-300" },
  { label: "Total points", value: "2350", accent: "text-violet-300" },
  { label: "Referral credits", value: "480", accent: "text-emerald-300" }
];

export function AmbassadorOverview() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {overviewData.map((item) => (
          <Card key={item.label} className="glass-card rounded-3xl p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#6D4C41]">{item.label}</p>
            <p className={`mt-4 text-2xl md:text-3xl font-semibold ${item.accent}`}>{item.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-1 sm:grid-cols-3">
        <Card className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-[#2D2926]">Current tier</h3>
          <p className="mt-4 text-[#6D4C41]">Gold ambassador with streak badges, weekly missions, and gamified credits.</p>
        </Card>
        <Card className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-[#2D2926]">Leaderboard rank</h3>
          <p className="mt-4 text-[#6D4C41]">Rank #8 overall, #2 in Web Development domain, and trending upward on monthly points.</p>
        </Card>
        <Card className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-[#2D2926]">Rewards status</h3>
          <p className="mt-4 text-[#6D4C41]">Eligible for the next tier prize bundle. Unlock diamond status with 500 more points.</p>
        </Card>
      </div>
    </div>
  );
}
