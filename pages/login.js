import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import Spotify from "../public/spotify-logo.png"

export default function Login({ providers }) {

    return <></>
}

export async function getServerSideProps() {

    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}