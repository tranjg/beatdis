import prisma from "@/utils/connect.ts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {email} = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        console.log(user)
        return NextResponse.json({user})
    } catch (error) {
        return NextResponse.json({message: "An error occurred while registering the user"}, {status: 500})
    }
}