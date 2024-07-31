import { CirclePlay, FastForward, Rewind } from "lucide-react";
import { Button } from "../ui/button";

export default function Controls() {
  return (
    <div className="flex w-full justify-center items-center gap-5">
      <Button
        variant={"ghost"}
        className="focus:outline-0 focus:ring-0"
        onClick={(e) => e.preventDefault()}
      >
        <Rewind size={32} />
      </Button>
      <Button
        variant={"ghost"}
        className="focus:outline-0 focus:ring-0"
        onClick={(e) => e.preventDefault()}
      >
        <CirclePlay size={32} />
      </Button>
      <Button
        variant={"ghost"}
        className="focus:outline-0 focus:ring-0"
        onClick={(e) => e.preventDefault()}
      >
        <FastForward size={32} />
      </Button>
    </div>
  );
}
