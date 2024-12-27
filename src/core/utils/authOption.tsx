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
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as any;
          const res = await fetch(apiPaths.baseUrl + apiPaths.loginUrl, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();
          if (res.ok && user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              accessToken: user.token,
            };
          }
          throw new Error("Invalid credentials");
        } catch (error) {
          console.log("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }

      if (trigger === "update" || trigger === "signIn") {
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
          token.email = responseData.userInfo.email;
          token.username = responseData.userInfo.username;
          token.id = responseData.userInfo.id;
          token.name = responseData.userInfo.name;
          token.avatar = responseData.userInfo.avatar;
          console.log(">>>>>>>>>>>response", token);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id || "",
        name: token.name || "",
        email: token.email || "",
        accessToken: token.accessToken || "",
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/login",
  },
};
