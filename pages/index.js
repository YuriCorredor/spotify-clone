import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Head from 'next/head'

export default function Home() {

  const { data: session, status } = useSession()

  console.log(session)

  return (
   <div>
     <Head>
       <title>Spotify 2.0</title>
     </Head>
     <main>
       <button onClick={() => signOut()}>log out</button>
       <h1 className='text-red-600'>ajshdas</h1>
       {/*SideBar*/}
       {/*Main*/}
     </main>
   </div>
  )
}
