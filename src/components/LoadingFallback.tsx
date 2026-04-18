export default function LoadingFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "#07070d" }}
    >
      <img
        src="/images/logo.png"
        alt="Loading…"
        className="h-14 w-14 animate-pulse"
        style={{ filter: "drop-shadow(0 2px 12px rgba(245, 225, 160, 0.28))" }}
      />
    </div>
  );
}
