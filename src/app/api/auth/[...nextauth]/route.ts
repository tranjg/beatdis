import prisma from "@/utils/connect.ts";
import { AuthOptions, DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
            image: string,

        } & DefaultSession["user"]
    }
}

const bcrypt = require('bcryptjs');

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },

            async authorize(credentials) {
                // const {email, password} = credentials;

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials!.email
                        }
                    })
                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(credentials!.password, user.password);
                    
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
    callbacks: {
        async jwt({ token, user, session, trigger}) {

            if(trigger === "update" ) {
                token.name = session.name;
            }

            // pass user id, artist name, and profile pic to token
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.artistName,
                    image: user.profilePic
                }
            }
            return token;
        },
        async session({ session, token, user}) {

            session.user.id = token.id
            session.user.name = token.name
            session.user.image = token.image
            
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}