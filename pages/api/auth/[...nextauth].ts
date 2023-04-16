import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

//https://www.youtube.com/watch?v=3xrko3GpYoU

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-playback-state,user-modify-playback-state",
    }),

    // ...add more providers here
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = account.id;
        token.expires_at = (account.expires_at! * 1000) as number;
        token.username = account.providerAccountId;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        return token;
      }

      // @ts-ignore
      if (Date.now() < token.expires_at) {
        return token;
      }

      // Access token has expired, try to update it
      refreshAccessToken();

      // this is temporary
      token.expired = true;

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const refreshAccessToken = () => {
  console.log("TODO: FIX THIS");
};

export default NextAuth(authOptions);
