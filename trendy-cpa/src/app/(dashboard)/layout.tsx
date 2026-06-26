import { ReactNode } from "react";
import Navbar from "@/components/dashboard/Navbar";
import "@/app/globals.css";
import { Space_Grotesk, Inter, Fjalla_One, Playwrite_GB_J } from "next/font/google";

const fjalla = Fjalla_One({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-fjalla",
});

const playwrite = Playwrite_GB_J({
    variable: "--font-playwrite",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-space",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] text-[#2D2926] relative ${playwrite.variable} ${fjalla.variable} ${spaceGrotesk.variable}
    ${inter.variable}`} >
        {/* <DashboardSidebar /> */}
        
        
        <div className="pt-[110px]">{children}</div>

        <Navbar />
    </div>
  );
}
