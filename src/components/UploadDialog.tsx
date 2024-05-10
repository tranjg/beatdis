"use client";

import FileUpload from "@/components/FileUpload.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

export default function UploadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="submit"
          className="bg-purple-600 border overflow-hidden rounded-md text-white font-bold cursor-pointer px-6 py-2 transition-all duration-200 ease-out hover:border-1 hover:border-purple-600  hover:bg-white hover:text-purple-600"
        >
          Upload
        </button>
      </DialogTrigger>
      <DialogContent>
        <FileUpload />
      </DialogContent>
    </Dialog>
  );
}
