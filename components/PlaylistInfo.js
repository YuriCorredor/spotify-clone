import { useState, useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistColorState, playlistIdState } from "../atoms/playlistAtom"

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-pink-500",
    "from-yellow-500",
    "from-purple-500",
    "from-cyan-500"
]

export default function PlaylistInfo({ playlist }) {

    const [color, setColor] = useRecoilState(playlistColorState)
    const playlistId = useRecoilValue(playlistIdState)

    useEffect(() => {
      setColor(colors[Math.floor(Math.random()*colors.length)])
    }, [playlistId])
    

  return (
    <div className={`flex items-end justify-center sm:justify-start space-x-7 bg-gradient-to-b to-black ${color}`}>
        <div className="p-8 pt-32 flex sm:space-x-6 text-white flex-col sm:flex-row">
        <img className="h-44 w-44 shadow-2xl place-self-center" src={playlist?.images?.[0]?.url} alt="playlist image" />
        <div className="place-self-end text-center sm:text-left">
            <p className="font-bold text-sm">PLAYLIST</p>
            <h2 className="font-bold text-4xl">{playlist?.name}</h2>
            <p className="font-light opacity-60">{playlist?.description}</p>
            <a href={playlist?.owner?.external_urls?.spotify} target="_blank" className="font-bold text-sm cursor-pointer hover:underline">{playlist?.owner?.id}</a>
        </div>
        </div>
    </div>
  )
}
