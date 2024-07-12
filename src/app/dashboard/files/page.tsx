"use client";

import { Song, columns } from "@/app/dashboard/files/columns.tsx";
import { DataTable } from "@/app/dashboard/files/data-table.tsx";
import FileUpload from "@/components/FileUpload.tsx";
import TestButton from "@/components/TestButton.tsx";
import UploadDialog from "@/components/UploadDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { getSongs } from "@/lib/utils.ts";
import { authOptions } from "@/utils/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { cache, useEffect, useState } from "react";

export default function Files() {
  const session = useSession();

  const [songs, setSongs] = useState([]);

  if (!session) {
    redirect("/login");
  }

  const getSongs = async () => {
    const songData = await axios.get("/api/get/songs");
    setSongs(songData.data);
  };

  useEffect(() => {
    getSongs();
  }, []);
  
  return (
    <div className="flex flex-col place-items-start h-screen p-5 ">
      <div className="flex place-content-end p-5 w-full">
        <UploadDialog />
      </div>
      <div className="flex justify-center w-full p-5">
        {/* <TestButton /> */}
        <DataTable columns={columns} data={songs} />
      </div>
    </div>
  );
}
