"use client";
import Navbar from "@/components/Navbar.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import { ActivitySquareIcon } from "lucide-react";
import AudioPlayer from "react-modern-audio-player";

const playList = [
  {
    name: "name",
    writer: "Me",
    img: null,
    src: "",
    id: 1,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex items-start justify-between">
        <Sidebar />
        <main className="w-full h-full">{children}</main>
      </section>
      {/* <div className="flex w-full sticky bottom-0">
        <AudioPlayer
          playList={playList}
          activeUI={{ all: true, progress: "bar" }}
        />
      </div> */}
    </section>
  );
}
