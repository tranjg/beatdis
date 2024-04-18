"use client";

import UserInfo from "@/components/UserInfo.tsx";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command.tsx";
import { RxBackpack, RxFile } from "react-icons/rx";

export default function Sidebar() {
  const menuItems = [
    {
      title: "Files",
      icon: <RxFile className="mr-2 h-5 w-5" />,
    },
    {
      title: "Packs",
      icon: <RxBackpack className="mr-2 h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div className="grow">
        <Command>
          <CommandList>
            <CommandGroup heading="Library">
              {menuItems.map((item, index) => (
                <CommandItem key={index}>
                  <div key={index} className="flex place-items-center">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
