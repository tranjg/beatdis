import { authOptions } from "@/utils/authOptions.ts";
import prisma from "@/utils/connect.ts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (session){
    try {
        const data = await req.formData()
        const fileName: String | null = data.get("fileName") as unknown as String;
        console.log(fileName)
        const song = await prisma.song.findUnique({
            where: {
                name: `${fileName}`
            }
        })
        console.log(song)
        return NextResponse.json({song})
    } catch (error) {
        return NextResponse.json({message: "An error occurred while getting the song."}, {status: 500})
    }
} else {
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
}
}