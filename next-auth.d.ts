import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    error?: string;

    user: {
      /** The user's postal address. */
      accessToken?: string;
    } & DefaultSession["user"];
  }
}
