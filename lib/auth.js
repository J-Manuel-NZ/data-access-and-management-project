import connectDB from "@/lib/mongoose";
import User from "@/models/user.js";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";


export const authOptions = {
    providers: [
      credentials({
        name: "Credentials",
        id: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            await connectDB();
            const user = await User.findOne({
            email: credentials.email,
            }).select("+password");

            if (!user) throw new Error("Wrong Email");

            const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
            );

            if (!passwordMatch) throw new Error("Wrong Password");
            return user;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
      async session({ session, token }) {
        // Include user role in the session
        session.user.role = token.role;
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role;
        }
        return token;
      },
    }
  };