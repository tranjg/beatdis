import prisma from "@/utils/connect.ts";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const session = await getServerSession()
    try {
        const {artistName} = await req.json();
        console.log(session)

        const updatedUser = await prisma.user.update({
            where: {
                email: session!.user!.email!
            },
            data: {
                artistName: artistName
            }
        })
        console.log(updatedUser)
        return NextResponse.json({message: "User updated."}, {status: 201})
    } catch (error) {
        
    }
}