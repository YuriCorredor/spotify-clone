import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackPlayingIdState, erroredState, errorMessageState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { debounce } from "lodash"

export default function Player() {

    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [currentTrackPlayingId, setCurrentTrackPlayingId] = useRecoilState(currentTrackPlayingIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)
    const songInfo = useSongInfo()
    const [errored, setErrored] = useRecoilState(erroredState)
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState)

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack()
                .then(data => {
                    setCurrentTrackPlayingId(data?.body?.item?.id)
                    spotifyApi.getMyCurrentPlaybackState()
                        .then(data => {
                            setIsPlaying(data?.body?.is_playing)
                        })                    
                })
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackPlayingId) {
            fetchCurrentSong()
            setVolume(50)
        }
    }, [spotifyApi, currentTrackPlayingId, session])

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debounceAdjustVolume(volume)
        }
    }, [volume])

    const debounceAdjustVolume = useCallback(debounce(volume => {
        console.log(volume)
        spotifyApi.setVolume(volume).catch(() => {})
    }, 400), [])

    const handlePlayAndPause = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then(data => {
                if (data?.body?.is_playing) {
                    spotifyApi.pause().then(() => setIsPlaying(false)).catch(err => {
                        setErrored(true)
                        setErrorMessage(err.message)
                    })
                } else {
                    spotifyApi.play().then(() => setIsPlaying(true)).catch(err => {
                        setErrored(true)
                        setErrorMessage(err.message)
                    })
                }
            })
            .catch(err => {
                setErrored(true)
                setErrorMessage(err.message)
            })
    }

    const handleSkip = () => {
        spotifyApi.skipToNext()
            .then(data => console.log(data))
            .catch(err => {
                setErrored(true)
                setErrorMessage(err.message)
            })
    }

    const handlePrevious = () => {
        spotifyApi.skipToPrevious()
            .then(data => console.log(data))
            .catch(err => {
                setErrored(true)
                setErrorMessage(err.message)
            })
    }

    return (
        <div className="px-4 w-full flex flex-row justify-between sticky bottom-0 left-0 h-16 sm:h-24 bg-black sm:bg-gradient-to-r sm:from-black sm:to-gray-900 text-white text-xs sm:text-sm space-x-4 sm:space-x-8 md:px-4">
            <div className='flex w-42 truncate whitespace-nowrap items-center space-x-4'>
                <img className='hidden truncate md:inline h-12 w-12' alt='' src={songInfo?.album?.images?.[0]?.url} />
                <div className='truncate'>
                    <h3 className='truncate'>{songInfo?.name}</h3>
                    <p className='opacity-60 truncate'>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className='flex truncate flex-row space-x-2 justify-evenly items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:w-8 md:h-8 button" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
                <svg onClick={handlePrevious} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:w-8 md:h-8 button" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
                {isPlaying ? (
                <svg onClick={handlePlayAndPause} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:w-8 md:h-8 button" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                ) : ( 
                <svg onClick={handlePlayAndPause} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:w-8 md:h-8 button" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                )}
                <svg onClick={handleSkip} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 button" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:w-8 md:h-8 button" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
            <div className='flex truncate items-center space-x-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:w-8 md:h-8 button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <input onChange={(e) => setVolume(Number(e.target.value))} value={volume} className='w-16 sm:w-32' type='range' min={0} max={100} />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:w-8 md:h-8 button" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    )
}
