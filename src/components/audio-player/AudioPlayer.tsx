import { CirclePlay, FastForward, Play, Rewind } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { Button } from "../ui/button";
import Controls from "./Controls";
import { useState } from "react";

export default function AudioPlayer() {
  const [value, setValue] = useState(0);
  return (
    <div className="flex flex-col h-[11vh] w-full border justify-start place-items-center bg-background rounded-md">
      <ProgressBar min={0} max={100} value={value} onChange={setValue} />
      <Controls />
    </div>
  );
}
