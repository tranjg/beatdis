"use client";

import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import formattedFilename from "@/utils/formattedFilename.ts";
import axios from "axios";
import { use, useEffect, useState } from "react";

export default function SongInfo(props: { data: FormData }) {
  const [song, setSong] = useState();

  const getSong = async () => {
    const songData = await axios.postForm("/api/get/song", props.data);
    setSong(songData.data);
  };

  useEffect(() => {
    getSong();
  }, []);
  return (
    <div className="flex flex-col gap-6 my-6 p-4 border rounded-md">
      <div className="flex place-items-center">
        <label className="cursor-pointer hover:contrast-50" htmlFor="avatar">
          <div className="flex justify-center place-items-center border rounded-md h-[100px] w-[100px]">
            Song Cover
          </div>
        </label>
        <div className="flex max-w-sm items-center ">
          <Input
            className="hidden"
            id="cover"
            type="file"
            accept="image/*"
            onChange={(e) => {
              console.log(e);
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
              console.log(song.name);
              // console.log(e);
            }}
          />
          <Input
            id="songName"
            defaultValue={"Artist Name"}
            type="text"
            className="border-0 font-bold focus-visible:ring-0 outline-none"
            onChange={(e) => {
              console.log(e);
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
