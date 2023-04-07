import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-playback-state",
    }),

    // ...add more providers here
  ],

  callbacks: {},
};
export default NextAuth(authOptions);
