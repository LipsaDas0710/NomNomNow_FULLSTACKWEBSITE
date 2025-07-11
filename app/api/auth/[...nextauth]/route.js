import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../../models/user";
import { verifyPassword } from "../../../lib/auth";

export const authOptions =({
  pages: {
    signIn: '/SignIn', // 👈 this tells NextAuth to use your custom sign-in page
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
          urlname: user.urlName, // Use urlName from your schema
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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        
        // Handle Google OAuth users
        if (account?.provider === "google") {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const googleName = user.name || "Google User";
            const googleUrlname = googleName.toLowerCase().replace(/\s+/g, '');

            // Ensure unique username
        let uniqueUsername = googleName;
        let count = 1;
        while (await User.findOne({ username: uniqueUsername })) {
          uniqueUsername = `${googleName} ${count++}`;
        }

            const newUser = await User.create({
              username: uniqueUsername,
              urlName: googleUrlname, // Match your schema field name
              email: user.email,
              password: null, // Google users don't have passwords
            });
            
            token.id = newUser._id.toString();
            token.urlname = newUser.urlName; // Use urlName from DB but store as urlname in token
          } else {
            token.id = existingUser._id.toString();
            token.urlname = existingUser.urlName; // Use urlName from DB
          }
        } else {
          // Handle credentials login
          token.urlname = user.urlname;
        }
      }else if (!token.urlname && token.email) {
      // This handles returning users where 'user' is not passed
      const existingUser = await User.findOne({ email: token.email });
      if (existingUser) {
        token.urlname = existingUser.urlName;
      }
    }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.urlname = token.urlname;
        // Keep the original name for display, but add urlname for routing
      }
      return session;
    },
  },
});

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
