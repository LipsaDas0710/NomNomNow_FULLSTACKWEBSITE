// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//    providers: [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
//   })
// ]
// })

// export { handler as GET, handler as POST }

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../../models/user";
import { verifyPassword } from "../../../lib/auth";

const handler = NextAuth({

   pages: {
    signIn: '/auth/signin', // 👈 this tells NextAuth to use your custom sign-in page
  },
  
  //  Google Sign-In
  providers: [  
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Manual Credentials Sign-In
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "your username" },
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          urlname: user.urlname,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.urlname = user.urlname;

       // 🧠 Check and store Google users in DB
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const googleName = user.name || "Google User";
          const googleUrlname = googleName.toLowerCase().replace(/\s+/g, '');

          const newUser = await User.create({
            username: googleName,
            urlname: googleUrlname,
            email: user.email,
            password: null,
          });
          token.id = newUser._id.toString();
          token.urlname = googleUrlname;
          console.log("✅ Google user added to DB");
        } else {
          token.id = existingUser._id.toString();
          token.urlname = existingUser.urlname;
          console.log("✅ Google user already exists in DB");
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.urlname = token.urlname;
         session.user.name = token.urlname;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
