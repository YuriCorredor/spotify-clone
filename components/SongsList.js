import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import SongItem from "./SongItem"

export default function SongsList() {

    const playlist = useRecoilValue(playlistState)

    return (
        <div className="text-white px-8 flex flex-col space-y-4 pb-32">
            {playlist?.tracks?.items?.map((track, index) => (
                <SongItem key={track.track.id} track={track} index={index} />
            ))}
        </div>
    )
}
