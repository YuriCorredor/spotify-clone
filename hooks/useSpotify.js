import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyApi from '../utils/spotify'

export default function useSpotify() {

    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshToken error') {
                signIn()
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session])
    

    return spotifyApi
}
