import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { currentTrackPlayingIdState } from "../atoms/songAtom"
import useSpotify from "./useSpotify"


export default function useSongInfo() {

    const spotifyApi = useSpotify()
    const [currentTrackPlayingId, setCurrentTrackPlayingId] = useRecoilState(currentTrackPlayingIdState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackPlayingId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackPlayingId}`,
                    {
                        headers: {
                            authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                )
                const trackInfoJson = await trackInfo.json()
                setSongInfo(trackInfoJson)
            }
        }
        fetchSongInfo()
    }, [currentTrackPlayingId, spotifyApi])

    return songInfo
}
