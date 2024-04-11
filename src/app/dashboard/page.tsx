import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts"
import UserInfo from "@/components/UserInfo.tsx"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }
    return(
        <div className="grid place-items-start h-screen p-5">
            <div className="shadow-lg p-2 bg-zinc-300/10 rounded-md flex border flex-col"> 
                Placeholder
            </div>
        </div>
    )
}
