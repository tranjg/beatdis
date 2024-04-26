import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts";
import prisma from "@/utils/connect.ts";
import { PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    const songData = new FormData();

     try {
        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
                secretAccessKey: process.env.AWS_IAM_SECRET_KEY
            }
        })

        const bucketUrl = process.env.NEXT_PUBLIC_AWS_BUCKET_URL
        
        const data = await req.formData()
        const file: File | null = data.get('file') as unknown as File
        const fileName: String | null = data.get("fileName") as unknown as String;
        const fileType: String | null = data.get("fileType") as unknown as String;
    
        const binaryFile = await file.arrayBuffer()
    
        const fileBuffer = Buffer.from(binaryFile)
        const params = {
            Bucket: process.env.AWS_MUSIC_FILES_BUCKET,
            Key: `${fileName}`,
            Body: fileBuffer,
            ContentType: `${fileType}`,
        }

        const formattedFileName = fileName.replaceAll(" ", "+")

        const upload = await s3.send(new PutObjectCommand(params))
        
        const songUrl = `${bucketUrl}${formattedFileName}`

        songData.append('filePath', songUrl);


        const newSong = await prisma.song.create({
            data: { 
                filePath: songUrl,
                artist:{
                    connect: {id: `${session?.user.id}`},
                 },
        }});
        return NextResponse.json({message: "File uploaded."}, {status: 201});
     } catch (error) {
        return NextResponse.json({message: "An error occurred while uploading"}, {status: 500})
    }
}