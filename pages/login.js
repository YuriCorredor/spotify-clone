import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import Spotify from "../public/spotify-logo.png"

export default function Login({ providers }) {

    return (
        <div className="flex h-screen flex-col justify-center items-center bg-black">
            <Image alt="spotify-logo" width={250} height={250} src={Spotify} />
            {Object.values(providers).map( provider =>
                <div key={provider.name}>
                    <button
                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                        className="bg-[#1ed760] p-5 m-2 rounded-full font-bold" 
                    >Logue com {provider.name}</button>
                </div>
            )}
        </div>
    )
}

export async function getServerSideProps() {

    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}