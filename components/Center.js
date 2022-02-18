import Player from "./Player"
import UserInfo from "./UserInfo"
import PlaylistInfo from "./PlaylistInfo"
import SongsList from "./SongsList"

export default function Center() {

  return (
    <div className="flex-grow flex-col sm:w-[80%] h-[92%] sm:h-full relative overflow-y-scroll overflow-x-hidden scrollbar bg-black">
      <section className='flex-grow'>
        <UserInfo />
        <PlaylistInfo />
      </section>
      <SongsList />
      <Player />
    </div>
  )
}
