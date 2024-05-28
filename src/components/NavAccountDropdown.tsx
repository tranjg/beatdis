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
import stringToGradient from "@/utils/stringToGradient.ts";
import { acceptedImageTypes } from "@/utils/types.ts";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavAccountDropdown() {
  const { data: session, update } = useSession();

  const [artistName, setArtistName] = useState(`${session?.user.name}`);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState(`${session?.user.image}`);
  const [error, setError] = useState("");

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (artistName === "") {
      setError("Artist name cannot be blank");
      return;
    } else {
      setError("");
    }

    const data = new FormData();
    data.append("artistName", artistName);
    if (image) {
      data.append("file", image);
      data.append("fileName", image.name);
      data.append("fileType", image.type);
    }

    try {
      if (image === undefined) {
        const res = await axios.put("/api/update/user/artistName", data);
        update({ name: artistName, image: session!.user.image });
        toast({
          variant: "success",
          title: "Changes have been saved",
          duration: 3000,
        });
      } else if (artistName === undefined || artistName === "") {
        const res = await axios.put("/api/update/user/profilePic", data);

        const formattedFileName = image.name.replace(" ", "+");

        const imageUrl =
          process.env.NEXT_PUBLIC_AWS_PROFILE_PIC_BUCKET_URL! +
          formattedFileName;
        update({ name: session?.user.name, image: imageUrl });
        toast({
          variant: "success",
          title: "Changes have been saved",
          duration: 3000,
        });
      } else if (image !== undefined && artistName !== undefined) {
        const formattedFileName = image.name.replace(" ", "+");

        const imageUrl =
          process.env.NEXT_PUBLIC_AWS_PROFILE_PIC_BUCKET_URL! +
          formattedFileName;

        const res = await axios.put("/api/update/user/artistName", data);
        const res2 = await axios.put("/api/update/user/profilePic", data);

        setPreview(imageUrl);

        update({ name: artistName, image: imageUrl });
        toast({
          variant: "success",
          title: "Changes have been saved",
          duration: 3000,
        });
      } else {
        return;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error with saving",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer gap-2 p-2 mr-2 rounded">
            <Avatar className="border">
              <AvatarImage src={session?.user.image} />
              <AvatarFallback
                style={{
                  backgroundImage: stringToGradient(`${session?.user.id}`),
                }}
              >
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
            <DropdownMenuItem
              onClick={() => {
                setPreview(session!.user.image);
                setArtistName(session!.user.name);
              }}
            >
              Account Settings
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={() => {
              signOut({ callbackUrl: "/login", redirect: true });
            }}
            className="text-red-500"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[40vh]"
      >
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
                <Avatar className="border h-[65px] w-[65px]">
                  <AvatarImage src={preview} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="sr-only" htmlFor="avatar">
                  Avatar
                </Label>
                <Input
                  className="hidden"
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (
                      acceptedImageTypes.includes(
                        e.target.files?.[0].type as string
                      )
                    ) {
                      setImage(e.target.files?.[0]);
                      setPreview(
                        URL.createObjectURL(e.target.files?.[0] as File)
                      );
                    } else {
                      return;
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="artistName" className="text-right text-base">
                Artist Name
              </Label>
              <Input
                id="artistName"
                defaultValue={`${artistName}`}
                form="accountForm"
                onChange={(e) => setArtistName(e.target.value)}
                className="col-span-3 text-base"
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 mt-2">
              {error}
            </div>
          )}
          <DialogFooter>
            {artistName === session?.user.name &&
            preview === session.user.image ? (
              <></>
            ) : (
              <button
                type="submit"
                form="accountForm"
                className=" bg-primary border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-primary hover:ring-1 ring-primary  hover:bg-white hover:text-primary"
              >
                Save
              </button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
