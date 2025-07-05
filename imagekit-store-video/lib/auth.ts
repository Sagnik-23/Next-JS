import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required")
                }
                try {
                    await connectToDatabase()
                    const user = await User.findOne({ email: credentials.email })
                    if (!user) {
                        throw new Error("No user found with this email")
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password)
                    if (!isValid) {
                        throw new Error("Invalid password")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    }
                } catch (error) {
                    console.error("Error in authorize:", error)
                    throw new Error("Authorization failed")
                }
            }
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
        // async redirect({ url, baseUrl }) {
        //     // Allow redirects to the same origin
        //     if (url.startsWith(baseUrl)) {
        //         return url
        //     }
        //     // Otherwise, redirect to the base URL
        //     return baseUrl
        // }
    },
    pages: {
        signIn: "/login",
        error: "/login", // Error code passed in query string as ?error=
        // signOut: '/auth/signout',
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: null // Will disable the new account creation screen
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)