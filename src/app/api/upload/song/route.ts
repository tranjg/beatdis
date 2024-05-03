import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/connect.ts";
import { getSignedURL } from "@/utils/signedUrl.ts";
import { PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    const bucket = process.env.AWS_MUSIC_FILES_BUCKET as String

    const bucketUrl = process.env.AWS_MUSIC_FILES_BUCKET_URL


    if (session) {
     try {
        const data = await req.formData()
            const file: File | null = data.get('file') as unknown as File
            const fileName: String | null = data.get("fileName") as unknown as String;
            const fileType: String | null = data.get("fileType") as unknown as String
        
            const binaryFile = await file.arrayBuffer()
            const fileBuffer = Buffer.from(binaryFile)
            const signedUrl = await getSignedURL(fileName, bucket, fileType)
            const upload = await axios.put(signedUrl.data!.url, fileBuffer)
            
            const formattedFileName = fileName.replaceAll(" ", "+")
            const songUrl = `${bucketUrl}${formattedFileName}`

        // songData.append('filePath', songUrl);

        const newSong = await prisma.song.create({
            data: { 
                filePath: songUrl,
                name: `${fileName}`,
                artist:{
                    connect: {id: `${session?.user.id}`},
                 },
        }});
        return NextResponse.json({message: "File uploaded."}, {status: 201});
     } catch (error) {
        return NextResponse.json({message: "An error occurred while uploading"}, {status: 500})
    }
} else {
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
}
}