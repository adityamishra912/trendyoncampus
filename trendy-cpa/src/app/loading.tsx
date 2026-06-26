export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E7] to-[#FAF4D3]">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-white/60 to-[#FAF4D3]/40 px-10 py-8 text-center shadow-lg">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#D4AF37]/30 border-t-[#8B6F47]" />
        <p className="text-sm uppercase tracking-[0.35em] text-[#5d4037] font-medium">Initializing TCAP experience</p>
      </div>
    </div>
  );
}
