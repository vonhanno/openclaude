import Link from "next/link";

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Simple header */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-pixel text-[10px] tracking-wide text-[#1A1A1A] transition-opacity hover:opacity-70"
        >
          OpenClaude
        </Link>
      </header>

      {/* Centered content area */}
      <main className="mx-auto max-w-5xl px-6 pb-16 sm:px-10">
        {children}
      </main>
    </div>
  );
}
