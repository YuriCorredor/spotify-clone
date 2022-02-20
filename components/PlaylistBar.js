import { useState, useEffect } from "react"
import useSpotify from "../hooks/useSpotify"
import { useSession } from "next-auth/react"
import Image from "next/image"
import logo from "../public/spotify-logo.png"
import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"
import PlaylistList from "./PlaylistList"

export default function PlaylistBar() {

  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const spotifyApi = useSpotify()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <aside className="flex scrollbar overflow-x-hidden overflow-y-scroll sm:flex-col sm:justify-start justify-around items-center bottom-0 left-0 w-screen order-last sm:order-first sm:w-[20%] sm:min-w-[20%] sm:h-screen bg-black">
      <div className="p-2 m-8 hidden sm:block">
        <img alt="" width={85} height={80} src={`/spotify-logo.png`}/>
      </div>
      <div className="flex flex-col sm:flex-row items-center group sm:self-start cursor-pointer sm:mb-5 mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2 stroke-[#b2b2b2] group-hover:stroke-white" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <p className="sm:m-2 mx-4 text-xs sm:text-sm text-[#b2b2b2] group-hover:text-white font-bold">Início</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center group sm:self-start cursor-pointer sm:mb-5  mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2 stroke-[#b2b2b2] group-hover:stroke-white" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="sm:m-2 mx-4 text-xs sm:text-sm text-[#b2b2b2] group-hover:text-white font-bold">Procure</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center group sm:self-start cursor-pointer sm:mb-5  mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2 stroke-[#b2b2b2] group-hover:stroke-white" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <p className="sm:m-2 mx-4 text-xs sm:text-sm text-[#b2b2b2] group-hover:text-white font-bold">Biblioteca</p>
      </div>
      <hr className="border-t-[0.1px] w-[90%] border-[#b2b2b2] hidden sm:block" />
      <PlaylistList playlists={playlists} playlistId={playlistId} />
    </aside>
  )
}
