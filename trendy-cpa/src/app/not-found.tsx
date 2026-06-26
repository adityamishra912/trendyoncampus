import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3] px-6 py-10">
      <div className="max-w-xl rounded-[2rem] border border-[#D4AF37]/30 bg-gradient-to-br from-white/50 to-[#FAF4D3]/50 p-10 text-center shadow-lg">
        <h1 className="text-4xl font-semibold text-[#2D2926]">Page not found</h1>
        <p className="mt-4 text-[#6D4C41]">The resource you are looking for is not available yet. Return to the TCAP portal.</p>
        <Link href="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-6 py-3 text-sm font-semibold text-[#2D2926] transition hover:shadow-lg hover:shadow-[#B8860B]/40">
          Go back home
        </Link>
      </div>
    </div>
  );
}
