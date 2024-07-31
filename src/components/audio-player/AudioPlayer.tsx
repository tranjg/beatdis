import { CirclePlay, FastForward, Play, Rewind } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { Button } from "../ui/button";
import Controls from "./Controls";

export default function AudioPlayer() {
  return (
    <div className="flex flex-col h-[10vh] w-full border justify-center place-items-center gap-3 p-3 bg-background rounded-md">
      <ProgressBar />
      <Controls />
    </div>
  );
}
