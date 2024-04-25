"use client";

import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast.ts";

export default function FileUpload() {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");
  const [musicSrc, setMusicSrc] = useState("");

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("fileName", file.name);
      data.append("fileType", file.type);

      const res = await axios.postForm("/api/upload/song", data);

      if (res.data) {
        const form = e.target as HTMLFormElement;
        form.reset();
        toast({
          variant: "success",
          title: "File has been uploaded",
          duration: 3000,
        });
      } else {
        setError("File upload failed.");
      }
    } catch (error) {
      console.log(error);
    }
    const s3FileUrl = `https://music-files-beatdis.s3.us-east-2.amazonaws.com/${file.name}`;
    setMusicSrc(s3FileUrl);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          id="picture"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button
          type="submit"
          className="bg-purple-600 border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-purple-600  hover:bg-white hover:text-purple-600"
        >
          Upload
        </button>
        {error && (
          <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 mt-2">
            {error}
          </div>
        )}
      </form>
      {/* {imageSrc.length > 0 && (
        <Image
          src={imageSrc}
          width={350}
          height={350}
          alt={"profile picture"}
        />
      )} */}
    </div>
  );
}
