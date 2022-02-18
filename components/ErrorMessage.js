import { useRecoilState } from "recoil"
import { erroredState } from "../atoms/songAtom"


const message = "WebapiPlayerError: An error occurred while communicating with Spotify's Web API. Details: Player command failed: Premium required PREMIUM_REQUIRED."

export default function ErrorMessage() {

    const [errored, setErrored] = useRecoilState(erroredState)

    return (
        <div className={`${errored ? 'absolute' : 'hidden'} w-[300px] h-[220px] mt-[-110px] ml-[-150px] rounded top-1/2 left-1/2 bg-green-500`}>
            <div className='justify-center flex flex-col h-full items-center'>
                <svg onClick={() => setErrored(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 self-end mb-4 mr-4 cursor-pointer opacity-80 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className='text-black opacity-80 font-bold p-2'>{message}</p>
            </div>
        </div>
    )
}
