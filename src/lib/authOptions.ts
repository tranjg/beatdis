import prisma from "@/utils/connect.ts";
import { DefaultSession, AuthOptions } from "next-auth";
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
                    return ("Error: " + error)
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
                token.image = session.image;
            }

            // pass user id, artist name, and profile pic to token
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.artistName,
                    image: user.profilePic,
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