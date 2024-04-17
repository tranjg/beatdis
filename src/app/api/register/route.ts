
import prisma from "@/utils/connect.ts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        
        const bcrypt = require('bcryptjs');

        const {artistName, email, password } = await req.json();
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
            data: { 
                artistName: artistName, 
                email: email, 
                password: hashedPassword,
                profilePic: '',
            }
        });
        console.log(newUser)
        return NextResponse.json({message: "User registered."}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "An error occurred while registering the user"}, {status: 500})
    }   finally {
        prisma.$disconnect
    }
}