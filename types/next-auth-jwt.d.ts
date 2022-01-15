import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
   interface JWT {
      accessToken: string | undefined,
      refreshToken: string | undefined,
      accessTokenExpires: number | undefined,
      username: string | undefined,
      error: string | undefined,
   }
}