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
        <UserInfo />
    )
}
