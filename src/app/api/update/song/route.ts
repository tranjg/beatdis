import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/connect.ts";
import { getSignedURL } from "@/utils/signedUrl.ts";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions)

    const bucketUrl = process.env.NEXT_PUBLIC_AWS_PROFILE_PIC_BUCKET_URL

    const bucket = process.env.AWS_PROFILE_PIC_BUCKET as String
    if (session) {
      try {
        const data = await req.formData();
        const artist: string = data.get("artist") as unknown as string;
        const image: File = data.get("image") as unknown as File;
        const imageName: string = data.get("image") as unknown as string;
        const imageType: string = data.get("image") as unknown as string;
        const name: string = data.get("name") as unknown as string;

        const binaryFile = await image.arrayBuffer()
        const fileBuffer = Buffer.from(binaryFile)
        const signedUrl = await getSignedURL(imageName, bucket, imageType)
        const upload = await axios.put(signedUrl.data!.url, fileBuffer)

        const formattedFileName = imageName.replaceAll(" ", "+")
        const imgUrl = `${bucketUrl}${formattedFileName}`

        const updatedUser = await prisma.song.update({
            where: {
                id: session!.user!.email!
            },
            data: {
                artist: artist,
                imagePath: imgUrl,
                name: name,
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