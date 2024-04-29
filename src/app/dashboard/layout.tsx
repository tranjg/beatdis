import Navbar from "@/components/Navbar.tsx";
import Sidebar from "@/components/Sidebar.tsx";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <section className="flex items-start justify-between">
        <Sidebar />
        <main className="w-full h-full">{children}</main>
      </section>
    </section>
  );
}
