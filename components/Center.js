import Player from "./Player"
import UserInfo from "./UserInfo"
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import PlaylistInfo from "./PlaylistInfo"
import SongsList from "./SongsList"

export default function Center() {

  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    
    spotifyApi
      .getPlaylist(playlistId)
      .then(data => setPlaylist(data.body))
      .catch(err => console.log(err))

  }, [spotifyApi, playlistId])

  return (
    <div className="flex-grow flex-col sm:w-[80%] h-[92%] sm:h-full relative overflow-y-scroll overflow-x-hidden scrollbar bg-black">
      <section className='flex-grow'>
        <UserInfo />
        <PlaylistInfo playlist={playlist} />
      </section>
      <SongsList />
      <Player />
    </div>
  )
}
