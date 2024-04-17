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
  const [artistName, setArtistName] = useState("");
  const { toast } = useToast();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(artistName);
    try {
      const res = await axios.put("/api/update", { artistName });
      if (res.data) {
        toast({
          variant: "success",
          title: "Changes have been saved",
          duration: 3000,
        });
      }
    } catch (error) {}
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://i.pinimg.com/564x/b4/1e/ca/b41eca44d12461cc5e02f2b594c9fdf2.jpg" />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
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
          <div className="grid gap-4 py-4">
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
