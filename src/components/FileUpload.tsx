"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast.ts";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import DragDropZone from "@/components/DragDropZone.tsx";
import SongPreview from "@/components/SongInfo";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import SongInfo from "@/components/SongInfo";
import axios from "axios";
import formattedFilename from "@/utils/formattedFilename.ts";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

export default function FileUpload() {
  interface InputData {
    id: string;
    songName: string;
    artistName: string;
    image: File;
  }

  const [files, setFiles] = useState<Object>([]);
  const [error, setError] = useState("");
  const [musicSrc, setMusicSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [songsData, setSongsData] = useState<InputData[]>([]);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    songsData.map(async (songData) => {
      const data = new FormData();
      data.append("id", songData.id);
      songData.artistName.length > 0 &&
        data.append("artist", songData.artistName);
      songData.image && data.append("image", songData.image);
      songData.image && data.append("imageName", songData.image.name);
      songData.image && data.append("imageType", songData.image.type);
      songData.songName.length > 0 && data.append("name", songData.songName);
      const updatedSong = await axios.put("/api/update/song", data);
    });
    toast({
      variant: "success",
      title: "Changes Saved",
      duration: 3000,
    });
    if (!files) return;
  };

  const handleInputChange = (id: string, data: InputData) => {
    if (songsData.length == 0) {
      setSongsData([data]);
    } else {
      const prevSongsData = songsData.map((songData) => {
        if (songData.id == id) {
          let songs = songsData;
          const foundSongIndex = songs.findIndex((value) => value.id == id);
          songs.splice(foundSongIndex, 1);
          songs.push(data);
          setSongsData(songs);
        } else {
          setSongsData([data, ...songsData]);
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [files]);

  return (
    <div className="flex flex-col">
      {Object.values(files).length == 0 && (
        <>
          <DialogHeader className="py-4">
            <DialogTitle>Upload your files</DialogTitle>
          </DialogHeader>
          <DragDropZone setFiles={setFiles} setIsLoading={setIsLoading} />
        </>
      )}
      {isLoading && (
        <div className="flex justify-center place-items-center w-[50vh] h-[20vh]">
          <LoadingSpinner />
        </div>
      )}
      {Object.values(files).length > 0 && !isLoading && (
        <div className="flex w-full items-center">
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7">
            {Object.values(files).map((arrayFiles) =>
              arrayFiles.map((file: File, index: number) => {
                const data = new FormData();
                data.append("fileName", formattedFilename(file.name));
                return (
                  <SongInfo
                    key={index}
                    data={data}
                    onInputChange={handleInputChange}
                  />
                );
              })
            )}

            <DialogFooter>
              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-primary border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-primary hover:ring-1 ring-primary  hover:bg-white hover:text-primary"
                >
                  Save
                </button>
              </DialogClose>
            </DialogFooter>
          </form>
        </div>
      )}
    </div>
  );
}
