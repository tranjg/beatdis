import { Button } from "@/components/ui/button.tsx";
import axios from "axios";

export default function TestButton() {
  return (
    <Button
      onClick={async () => {
        const songs = await axios.get("/api/get/songs");
        console.log(songs);
      }}
    >
      Get Songs
    </Button>
  );
}
