import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function UserInfo() {

  const { data: session } = useSession()

  return (
    <header className='fixed top-5 group right-8 text-white'>
        <div className='flex flex-row items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full bg-black p-1 pr-2'>
          {session?.user?.image === undefined ? 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> : 
          <img className='h-10 w-10 rounded-full object-cover' alt='' src={session?.user?.image} />}
          <h2 className="font-bold text-sm">{session?.user?.name}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div onClick={signOut} className="mt-2 pt-4 pb-4 text-center bg-black rounded-xl hidden group-hover:block">
          <p className="p-2 cursor-pointer hover:bg-gray-900">Sair da conta</p>
        </div>
    </header>
  )
}
