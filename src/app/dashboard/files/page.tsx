import FileUpload from "@/components/FileUpload.tsx";
import UploadDialog from "@/components/UploadDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Files() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex place-items-start h-screen p-5 ">
      <div className="flex place-items-center border p-5 w-full">
        <div className="flex flex-grow">
          <div className="flex border p-3">Filter</div>
          <div className="flex border p-3">Filter</div>
          <div className="flex border p-3">Filter</div>
          <div className="flex border p-3">Filter</div>
        </div>
        <div>
          {/* <FileUpload /> */}
          <UploadDialog />
        </div>
      </div>
    </div>
  );
}
