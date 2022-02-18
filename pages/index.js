import Head from 'next/head'
import Center from '../components/Center'
import PlaylistBar from '../components/PlaylistBar'
import ErrorMessage from '../components/ErrorMessage'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify 2.0</title>
      </Head>
      <main className='flex flex-col sm:flex-row h-screen overflow-hidden'>
        <PlaylistBar />
        <Center />
        <ErrorMessage />
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}
