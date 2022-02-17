import Player from "./Player"
import UserInfo from "./UserInfo"
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"

export default function Center() {

  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    
    spotifyApi
      .getPlaylist(playlistId)
      .then(data => setPlaylist(data.body))
      .catch(err => console.log(err))

  }, [spotifyApi, playlistId])

  console.log(playlist)

  return (
    <div className="flex-grow flex-col pb-12 sm:w-[80%] h-[92%] sm:h-full relative">
      <section className='flex-grow overflow-y-scroll overflow-x-hidden scrollbar bg-black'>
        <UserInfo />
        <div className={`flex items-end space-x-7 h-80 bg-gradient-to-b to-black from-red-500`}>
          <h1>asd;lkas</h1>
        </div>
      </section>
      <Player />
    </div>
  )
}
