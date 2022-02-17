import Head from 'next/head'
import Center from '../components/Center'
import PlaylistBar from '../components/PlaylistBar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify 2.0</title>
      </Head>
      <main className='flex flex-col sm:flex-row h-screen overflow-hidden'>
        <PlaylistBar />
        <Center />
      </main>
    </>
  )
}
