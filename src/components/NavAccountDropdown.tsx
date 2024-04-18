"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

export default function NavAccountDropdown() {
  const { data: session, update } = useSession();

  const [artistName, setArtistName] = useState("");
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState(session?.user.image);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) return;
    console.log(artistName);
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("fileName", image.name);
      data.append("fileType", image.type);
      data.append("artistName", artistName);

      const res2 = await axios.post("/api/upload/profilepic", data);
      const res = await axios.put("/api/update", data);

      const formattedFileName = image.name.replace(" ", "+");

      const imageUrl =
        process.env.NEXT_PUBLIC_AWS_BUCKET_URL! + formattedFileName;

      if (res2.data) {
        update({ image: imageUrl });
      }
      if (res.data) {
        update({ name: artistName });
      }
      if (res.data && res2.data) {
        toast({
          variant: "success",
          title: "Changes have been saved",
          duration: 3000,
        });
        update({ name: artistName, image: imageUrl });
      }
    } catch (error) {
    } finally {
      console.log(artistName);
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer gap-2 p-2 mr-2 rounded">
            <Avatar className="border">
              <AvatarImage src={session?.user.image} />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                {session?.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>{session?.user?.name}</div>
            <Button variant="ghost">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
        </DialogHeader>
        <form id="accountForm" onSubmit={handleSubmit}>
          <div className="grid gap-9 py-4">
            <div className="grid grid-row-4 place-items-center">
              <label
                className="cursor-pointer hover:contrast-50"
                htmlFor="avatar"
              >
                <img
                  alt="Avatar"
                  className="aspect-square object-cover rounded-full border text-center"
                  height={100}
                  src={preview}
                  width={100}
                />
              </label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="sr-only" htmlFor="avatar">
                  Avatar
                </Label>
                <Input
                  className="hidden"
                  id="avatar"
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files?.[0]);
                    setPreview(URL.createObjectURL(e.target.files?.[0]));
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="artistName" className="text-right">
                Artist Name
              </Label>
              <Input
                id="artistName"
                defaultValue={`${session?.user?.name}`}
                form="accountForm"
                onChange={(e) => setArtistName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" form="accountForm">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
