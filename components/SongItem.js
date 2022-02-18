import { useRecoilState } from "recoil"
import { currentTrackPlayingIdState, erroredState, errorMessageState, isPlayingState } from "../atoms/songAtom"
import useSpotify from "../hooks/useSpotify"
import { prettifyTime } from "../utils/utils"

export default function SongItem({ track, index }) {

    const spotifyApi = useSpotify()
    const songCoverSource = track?.track?.album?.images
    const [currentTrackPlayingId, setCurrentTrackPlayingId] = useRecoilState(currentTrackPlayingIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [errored, setErrored] = useRecoilState(erroredState)
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState)

    const playSong = () => {
        spotifyApi.play({
            uris: [track?.track?.uri],
        }).then(() => {
            setCurrentTrackPlayingId(track?.track?.id)
            setIsPlaying(true)
        }).catch(err => {
            setErrorMessage(err.message)
            setErrored(true)
        })
    }

    return (
        <div onClick={playSong} className={`pl-4 flex items-center space-x-4 hover:bg-gray-900 rounded-lg cursor-pointer`}>
            <div className="w-8 text-center">
                <p className="font-thin text-sm opacity-80">{index + 1}</p>
            </div>
            <img className="w-10" alt='song cover' src={songCoverSource[songCoverSource.length - 1].url}></img>
            <div className="truncate whitespace-nowrap inline-block overflow-hidden w-60 ">
                <h2 className="truncate">{track?.track?.name}</h2>
                <a target='_blank' href={track?.track?.artists?.[0].external_urls?.spotify} className="truncate font-thin text-sm opacity-60 hover:underline hover:opacity-100 cursor-pointer w-fit">{track?.track?.artists?.[0].name}</a>
            </div>
            <div className="truncate whitespace-nowrap items-center justify-end pr-8 sm:pr-0 sm:justify-between md:pr-16 lg:pr-48 ml-auto flex flex-grow w-36">
                <a href={track?.track?.album?.external_urls?.spotify} target='_blank' className="truncate font-thin opacity-60 text-sm hidden sm:inline px-2 hover:underline hover:opacity-100 cursor-pointer">{track?.track?.album?.name}</a>
                <p className="sm:px-2 font-thin text-sm opacity-60">{prettifyTime(track?.track?.duration_ms)}</p>
            </div>
        </div>
    )
}
