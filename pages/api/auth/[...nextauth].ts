import axios from "axios";
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
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const refreshAccessToken = async (token: any) => {
  console.log("TODO: FIX THIS");

  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    }).toString();

  const options = {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID! +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET!
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    },
    json: true,
  };

  console.log("URLL", options);

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    options
  );

  console.log("Fetchedddd", data);

  return {
    ...token,
    accessToken: data.access_token,
    expires_at: Date.now() + data.expires_in * 1000,
    refreshToken: data.refresh_token ?? token.refreshToken, // Fall back to old refresh token
  };
};

export default NextAuth(authOptions);
