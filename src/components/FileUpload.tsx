"use client";

import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast.ts";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import DragDropZone from "@/components/DragDropZone.tsx";

export default function FileUpload() {
  const [files, setFiles] = useState<Object>();
  const [error, setError] = useState("");
  const [musicSrc, setMusicSrc] = useState("");

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;
    let duplicateCount = 0;
    {
      Object.values(files!).map(async (file, index) => {
        const data = new FormData();
        data.append("file", file);
        data.append("fileName", file.name);
        data.append("fileType", file.type);

        const songExists = await axios.postForm("/api/songExists", data);

        if (songExists.data.song == null) {
          const res = await axios.postForm("/api/upload/song", data);

          if (!res.data) {
            setError("File upload failed.");
          }
        }

        if (songExists.data.song !== null) {
          duplicateCount = duplicateCount + 1;

          toast({
            variant: "default",
            title: `${duplicateCount} duplicate files ignored`,
            duration: 2000,
          });
        }
      });
    }
    setFiles(undefined);
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <DragDropZone setFiles={setFiles} />
        <button
          type="submit"
          className="bg-purple-600 border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-purple-600  hover:bg-white hover:text-purple-600"
        >
          Save Changes
        </button>
        {error && (
          <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
