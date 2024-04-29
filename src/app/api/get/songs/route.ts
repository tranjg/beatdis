import { authOptions } from "@/lib/authOptions.ts";
import prisma from "@/utils/connect.ts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions)
    console.log(session)
    try{
        const songs = await prisma.song.findFirst({
            where: {
                artistId: session!.user.id 
            }
        })
        console.log(songs)
        return NextResponse.json(songs) 
    } catch(error){
        return NextResponse.json({message: "An error occurred while getting the songs."}, {status: 500})
    }
}