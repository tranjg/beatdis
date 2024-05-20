"use client";

import { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import formattedFilename from "@/utils/formattedFilename.ts";
import { arrayBuffer } from "stream/consumers";

export default function FileUpload() {
  interface InputData {
    id: string;
    songName: string;
    artistName: string;
  }

  const [files, setFiles] = useState<Object>([]);
  const [error, setError] = useState("");
  const [musicSrc, setMusicSrc] = useState("");

  const [songsData, setSongsData] = useState<InputData[]>([]);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(songsData);
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
          setSongsData([data, songData]);
        }
      });
    }
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
              <button
                type="submit"
                className="bg-primary border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-primary hover:ring-1 ring-primary  hover:bg-white hover:text-primary"
              >
                Save
              </button>
            </DialogFooter>
          </form>
        </div>
      )}
    </div>
  );
}
