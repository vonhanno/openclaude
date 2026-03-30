import Sidebar from "@/components/layout/Sidebar";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      {/* Main content area — offset for desktop sidebar */}
      <main className="md:pl-[240px]">
        <div className="mx-auto max-w-4xl px-4 py-6 pt-16 md:px-8 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
