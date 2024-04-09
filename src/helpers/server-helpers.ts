import prisma from "@/utils/connect.ts";


export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        throw new Error("Unable to connect")
    }
};