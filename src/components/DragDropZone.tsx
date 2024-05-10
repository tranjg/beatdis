"use client";
import { toast } from "@/components/ui/use-toast.ts";
import axios from "axios";
import { File } from "buffer";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { DropEvent, useDropzone } from "react-dropzone";
import * as musicMetaData from "music-metadata-browser";
import { useSession } from "next-auth/react";
import { authOptions } from "@/utils/authOptions.ts";

interface Props {
  setFiles: Dispatch<SetStateAction<Object>>;
}

export default function DragDropZone(props: Props) {
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const onDrop = useCallback((acceptedFiles: object) => {
    let duplicateCount = 0;
    {
      Object.values(acceptedFiles!).map(async (file, index) => {
        const data = new FormData();
        const artist = (await musicMetaData.parseBlob(file)).common.artist; // acquires artist metadata from file

        data.append("file", file);
        data.append("fileName", file.name);
        data.append("fileType", file.type);
        data.append("fileArtist", artist ? artist : session?.user.name!);

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
    props.setFiles([acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [],
      "audio/wav": [],
      "audio/aiff": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center border border-dashed p-20 rounded-md transition hover:bg-slate-400/30"
    >
      <label>
        Click to upload or <span className="font-semibold">drag and drop</span>{" "}
        your files here.
      </label>
      <input {...getInputProps()} />
      {error && (
        <div className="bg-red-500 rounded-md text-white w-fit text-sm py-1 px-3 mt-2">
          {error}
        </div>
      )}
    </div>
  );
}
