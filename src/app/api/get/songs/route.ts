import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/connect.ts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)

    if (session) {
    try{
        const songs = await prisma.song.findMany({
            where: {
                userId: session!.user.id 
            }
        })
        console.log(songs)
        return NextResponse.json(songs) 
    } catch(error){
        return NextResponse.json({message: "An error occurred while getting the songs."}, {status: 500})
    }
} else {
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
}
}