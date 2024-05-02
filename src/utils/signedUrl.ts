'use server'

import { authOptions } from "@/utils/authOptions.ts"
import { getServerSession } from "next-auth"
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from 'next/server';

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_IAM_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_IAM_SECRET_KEY!
    }
})

export async function getSignedURL(fileName: String, bucket: String, fileType: String) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return {error: "Unauthorized"}
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: `${bucket}`,
        Key: `${fileName}`,
        ContentType: `${fileType}`,
    })

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60,
    })
    return {data: {url: signedUrl}}
}