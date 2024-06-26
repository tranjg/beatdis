import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/connect.ts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions)
    if (session) {
      try {
        const data = await req.formData();
        const artistName: string = data.get("artistName") as unknown as string;

        const updatedUser = await prisma.user.update({
            where: {
                email: session!.user!.email!
            },
            data: {
                artistName: artistName
            }
        })
        return NextResponse.json({message: "User updated."}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "An error occurred while updating."}, {status: 500})
    }  
    } else {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
}