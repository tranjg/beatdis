import FileUpload from "@/components/FileUpload.tsx";
import UserInfo from "@/components/UserInfo.tsx";
import { Input } from "@/components/ui/input.tsx";
import { authOptions } from "@/lib/authOptions.ts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useState } from "react";

export default async function Files() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div className="grid place-items-start h-screen p-5">
      <div className="shadow-lg p-2 bg-zinc-300/10 rounded-md flex border flex-col">
        <FileUpload />
      </div>
    </div>
  );
}
