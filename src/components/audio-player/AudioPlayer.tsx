import { CirclePlay, FastForward, Play, Rewind } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { Button } from "../ui/button";
import Controls from "./Controls";

export default function AudioPlayer() {
  return (
    <div className="flex flex-col h-[11vh] w-full border justify-start place-items-center bg-background rounded-md">
      <ProgressBar />
      <Controls />
    </div>
  );
}
