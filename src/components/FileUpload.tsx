"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast.ts";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import DragDropZone from "@/components/DragDropZone.tsx";
import SongPreview from "@/components/SongInfo";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import SongInfo from "@/components/SongInfo";

export default function FileUpload() {
  const [files, setFiles] = useState<Object>([]);
  const [error, setError] = useState("");
  const [musicSrc, setMusicSrc] = useState("");

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;
    console.log(files);
    // setFiles(undefined);
  };

  return (
    <div className="flex flex-col">
      {Object.values(files).length == 0 && (
        <>
          <DialogHeader className="py-4">
            <DialogTitle>Upload your files</DialogTitle>
          </DialogHeader>
          <DragDropZone setFiles={setFiles} />
        </>
      )}
      {Object.values(files).length > 0 && (
        <div className="flex w-full items-center">
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7">
            <SongInfo />
            <DialogFooter>
              <button
                type="submit"
                className="bg-purple-600 border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-purple-600  hover:bg-white hover:text-purple-600"
              >
                Save Changes
              </button>
            </DialogFooter>
          </form>
        </div>
      )}
    </div>
  );
}
