import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isGoogleEnabled } from "@/lib/auth/checkProvider";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    ...(isGoogleEnabled()
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    // TODO: Kakao and Naver providers will be added in later sprints.
  ],
  session: {
    strategy: "jwt",
  },
});
