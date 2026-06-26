import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import CustomCursor from "@/components/animations/CustomCursor";
// import PageLoader from "@/components/animations/PageLoader";
import ConditionalFooter from "@/components/dashboard/ConditionalFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TCAP | TRENDY Campus Ambassador Program",
  description: "Premium cyber campus ambassador portal for onboarding, dashboard, tasks, leaderboards and manager control.",
  metadataBase: new URL("https://tcaps.trendy.example")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#FFFBF0] text-[#2D2926] antialiased`}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e1b18",
              color: "#fff",
              border: "1px solid rgba(212,175,55,0.25)",
              padding: "16px 20px",
              borderRadius: "18px",
            },
          }}
        />

        <CustomCursor />
        <AuthProvider>
          {children}
        </AuthProvider>

        <ConditionalFooter />
      </body>
    </html>
  );
}
