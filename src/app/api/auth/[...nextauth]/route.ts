import prisma from "@/utils/connect.ts";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const bcrypt = require('bcryptjs');

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const {email, password} = credentials;

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    console.log("PW Match: ", passwordsMatch )
                    
                    if (!passwordsMatch) {
                        return null
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error)
                }

            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}