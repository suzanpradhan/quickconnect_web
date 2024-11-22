
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiPaths } from "../api/apiConstants";

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as any;
          const res = await fetch(apiPaths.baseUrl + apiPaths.loginUrl, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();
          if (res.ok && user) {
            return user;
          }
          throw null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token = {
          accessToken: (user as any).token
        };
      }
      if (trigger == "update" || trigger == "signIn") {
        const response = await fetch(
          `${apiPaths.baseUrl}${apiPaths.myProfileUrl}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token.accessToken}`,
              accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          token.email = responseData.email;
          token.username = responseData.username;
          token.id = responseData.id;
          return Promise.resolve(token);
        }
      }
      console.log("token", token);

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.user = token as any;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/",
    signOut: "/login",
  },
};
