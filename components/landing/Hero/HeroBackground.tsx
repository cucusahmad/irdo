export default function HeroBackground() {
  return (
    <div
      className="
        fixed
        inset-0
        -z-50

        bg-cover
        bg-center
        bg-no-repeat
        bg-fixed
      "
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(5,8,22,.96) 0%,
            rgba(5,8,22,.90) 28%,
            rgba(5,8,22,.65) 45%,
            rgba(5,8,22,.20) 65%,
            rgba(5,8,22,.55) 100%
          ),
          linear-gradient(
            to top,
            rgba(5,8,22,.96) 0%,
            rgba(5,8,22,.35) 25%,
            transparent 45%
          ),
          url('/images/hero/background.webp')
        `,
      }}
    >
      {/* Glow kiri */}
      <div className="absolute left-[-250px] top-1/2 h-[650px] w-[650px] -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />

      {/* Glow kanan */}
      <div className="absolute right-[-250px] top-24 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[180px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />
    </div>
  );
}