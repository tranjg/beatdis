"use client";
import { File } from "buffer";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { DropEvent, useDropzone } from "react-dropzone";

interface Props {
  setFiles: Dispatch<SetStateAction<File | undefined>>;
}

export default function DragDropZone(props: Props) {
  const onDrop = useCallback((acceptedFiles: object) => {
    props.setFiles(acceptedFiles as File);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
        Click to upload or{" "}
        <span className="font-semibold">drag and drop your files here.</span>
      </label>
      <input {...getInputProps()} />
    </div>
  );
}
