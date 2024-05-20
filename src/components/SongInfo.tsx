"use client";

import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import formattedFilename from "@/utils/formattedFilename.ts";
import stringToGradient from "@/utils/stringToGradient.ts";
import { acceptedImageTypes } from "@/utils/types.ts";
import { Song } from "@prisma/client";
import axios from "axios";

import { use, useEffect, useState } from "react";

export default function SongInfo({ ...props }) {
  const [song, setSong] = useState<Song>();
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [image, setImage] = useState<File>();

  const [preview, setPreview] = useState("");

  const getSong = async (data: FormData) => {
    const songData = await axios.postForm("/api/get/song", data);
    setSong(await songData.data);
  };

  useEffect(() => {
    getSong(props.data);
  }, [props.data]);
  return (
    <div className="flex flex-col gap-6 my-6 p-4 border rounded-md">
      <div className="flex place-items-center">
        <label
          className="cursor-pointer hover:contrast-50"
          htmlFor={`${song?.id}`}
        >
          <div
            style={{
              backgroundImage:
                preview.length > 0
                  ? `url(${preview})`
                  : song?.imagePath
                  ? `url(${song.imagePath})`
                  : stringToGradient(`${song?.id}`),
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            className="flex justify-center place-items-center border rounded-md h-[100px] w-[100px]"
          ></div>
        </label>
        <div className="flex max-w-sm items-center ">
          <Input
            className="hidden"
            id={`${song?.id}`}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (
                acceptedImageTypes.includes(e.target.files?.[0].type as string)
              ) {
                setImage(e.target.files?.[0]);
                setPreview(URL.createObjectURL(e.target.files?.[0] as File));
                props.onInputChange(`${song?.id}`, {
                  id: `${song?.id}`,
                  image: e.target.files?.[0],
                  songName,
                  artistName,
                });
              } else {
                toast({
                  variant: "destructive",
                  title: "File type is not acceptable",
                  duration: 3000,
                });
                return;
              }

              if (e.target.files?.[0].size > 5 * 1024 * 1024) {
                toast({
                  variant: "destructive",
                  title: "File must be 5MB or less",
                  duration: 3000,
                });
              }
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <Input
            id="songName"
            defaultValue={song ? `${song.name}` : ""}
            type="text"
            className="border-0 focus-visible:ring-0 outline-none"
            onChange={(e) => {
              setSongName(e.target.value);
              props.onInputChange(`${song?.id}`, {
                id: `${song?.id}`,
                image,
                songName: e.target.value,
                artistName,
              });
            }}
          />
          <Input
            id="artistName"
            defaultValue={song ? `${song.artist}` : ""}
            type="text"
            className="border-0 font-bold focus-visible:ring-0 outline-none"
            onChange={(e) => {
              setArtistName(e.target.value);
              props.onInputChange(`${song?.id}`, {
                id: `${song?.id}`,
                image,
                songName,
                artistName: e.target.value,
              });
            }}
          />
        </div>
      </div>
      {/* <div className="flex place-items-start">
        <div className="flex flex-col w-full gap-4">
          <Label className="font-bold text-sm">BPM</Label>
          <Input
            id="bpm"
            placeholder="Enter the BPM"
            type="number"
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div> */}
      {/* <div className="flex place-items-start">
        <div className="flex flex-col w-full gap-4">
          <Label className="font-bold text-sm">Key</Label>
          <Input
            id="key"
            placeholder="Enter the key signature"
            type="text"
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div> */}
      <div className="flex place-items-start">
        <div className="flex flex-col w-full gap-4">
          <Label className="font-bold text-sm">Tags</Label>
          <Input
            id="tags"
            placeholder="Coming Soon"
            type="search"
            className="rounded-3xl"
            onChange={(e) => {
              console.log(e);
            }}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
