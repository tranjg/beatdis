"use client";

import FileUpload from "@/components/FileUpload.tsx";
import TestButton from "@/components/TestButton.tsx";
import UploadDialog from "@/components/UploadDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { authOptions } from "@/utils/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
export default function Files() {
  const session = useSession();

  const [songs, setSongs] = useState();

  if (!session) {
    redirect("/login");
  }

  // const getSongs = async () => {
  //   const songData = await axios.get("/api/get/songs");
  //   console.log(songData.data);
  //   setSongs(await songData.data);
  // };

  // useEffect(() => {
  //   getSongs();
  // }, []);
  return (
    <div className="flex flex-col place-items-start h-screen p-5 ">
      <div className="flex place-items-center border p-5 w-full">
        <div className="flex flex-grow">
          <div className="flex border p-3">Filter</div>
          <div className="flex border p-3">Filter</div>
          <div className="flex border p-3">Filter</div>
          <div className="flex border p-3">Filter</div>
        </div>
        <div>
          <UploadDialog />
        </div>
      </div>
      <div className="flex justify-center w-full p-5 border">
        <TestButton />
      </div>
    </div>
  );
}
