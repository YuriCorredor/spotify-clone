import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"

export default function PlaylistList({ playlists }) {

  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  return (
    <div className="w-full hidden sm:flex flex-col items-start">
        {playlists.map(playlist => (
          <button  key={playlist.id} onClick={() => setPlaylistId(playlist.id)}>
            <p className={`text-[#b2b2b2] hover:text-white text-sm cursor-pointer mt-4 mx-2 ${playlist.id === playlistId ?? 'text-white' }`}>{playlist.name}</p>
          </button>
        ))}
      </div>
  )
}
