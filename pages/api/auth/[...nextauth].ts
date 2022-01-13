import NextAuth, { Awaitable } from "next-auth"
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyAPI, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token: JWT): Awaitable<JWT> {
   try {

      spotifyAPI.setAccessToken((token.accessToken as string));
      spotifyAPI.setRefreshToken((token.refreshToken as string));


      return token;
   } catch (error) {
      console.log(error);

      return {
         ...token,
         error: "RefreshAccessTokenError",
      };
   }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: (process.env.NEXT_PUBLIC_CLIENT_ID as string),
      clientSecret: (process.env.NEXT_PUBLIC_CLIENT_SECRET as string),
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
     signIn: '/login'
  },
  callbacks: {
     async jwt({ token, account, user}) {
         if (account && user) {
            return {
               ...token,
               accessToken: account.access_token,
               refreshToken: account.refresh_token,
               username: account.providerAccountId,
               accessTokenExpires: (account.expires_at as number) * 1000
            }
         }

         if (Date.now() < (token.accessTokenExpires as number) * 1000) {
            console.log("Existing Access Token is Valid");
            return token;
         }

         console.log("Access Token has Expired, Refreshing...");
         return await refreshAccessToken(token);
     },
  },
})