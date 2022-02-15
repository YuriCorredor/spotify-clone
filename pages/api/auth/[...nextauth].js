import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../utils/spotify"

const refreshToken = async token => {
    try {

        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshToken.expires_in * 1000,
            refreshToken: refreshToken.refresh_token ?? token.refreshToken
        }

    } catch (error) {
        return {
            ...token,
            error: 'RefreshToken error'
        }
    }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
      signIn: '/login'
  },
  callbacks: {
      async jwt({ token, account, user }) {

        // initial sing in
        if (account && user) {
            return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000 // * 1000 to handle the time in milliseconds, not the date 1 hour in advance (in spotify's case, this is 1 hour ahead)
            }
          }

        if (Date.now() < token.accessTokenExpires) { // return previous token that is still valid
            return token
        }

        // access token has expired
        return await refreshToken(token)
      },
      
      async session({ session, token }) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username

        return session
      }
  }
})