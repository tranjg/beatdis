"use client";

import { columns } from "@/components/data-table/columns.tsx";
import { DataTable } from "@/components/data-table/DataTable.tsx";
import UploadDialog from "@/components/UploadDialog.tsx";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

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
      <div className="flex justify-center p-3 mt-2 w-full">
        <DataTable columns={columns} data={songs} />
      </div>
    </div>
  );
}
