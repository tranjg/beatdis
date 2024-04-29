"use client";

import { SidebarButton } from "@/components/SidebarButton.tsx";
import UserInfo from "@/components/UserInfo.tsx";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { link } from "fs";
import { Backpack, File, Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxBackpack, RxFile } from "react-icons/rx";

export default function Sidebar() {
  const menuItems = [
    {
      title: "Files",
      icon: File,
      path: "/dashboard/files",
    },
    {
      title: "Packs",
      icon: Package2,
      path: "/dashboard/packs",
    },
  ];

  const pathname = usePathname();
  return (
    <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 ">
      <div className="grow">
        <div className="text-sm my-2 px-4 text-slate-400">Library</div>
        {menuItems.map((item, index) => (
          <Link key={index} href={`${item.path}`}>
            <SidebarButton
              variant={pathname === item.path ? "default" : "ghost"}
              icon={item.icon}
              className="w-full"
            >
              {item.title}
            </SidebarButton>
          </Link>
        ))}
      </div>
    </div>
  );
}
