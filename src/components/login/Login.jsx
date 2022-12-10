import { auth, db, provider } from "../../firebase"
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"




const Login = ({setUser}) => {

    const navigate = useNavigate();

    let signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                let newUser = {
                    fullName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                }
                navigate('/')
                setUser(newUser)
                localStorage.setItem('user', JSON.stringify(newUser))

                await setDoc(doc(db, 'users', result.user.email), newUser)

            }).catch((error) => {
                alert(error.message)
            })
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-1/3 h-[400px] flex flex-col justify-center items-center rounded-lg shadow-2xl my-28 py-28 space-y-4'>
                <img src='./images/wa-filled.png' alt='Whatsapp Logo' className='w-44' />
                <p className='font-semibold '>WhatsApp Web</p>
                <button className='flex justify-center items-center bg-[#12Bc7e] rounded px-6 py-1 space-x-2'>
                    <img src="./images/google.png" alt="Google Logo" className='w-8' />
                    <p className='font-semibold text-white' onClick={signInWithGoogle}>Login With Google</p>
                </button>
            </div>
        </div>
    )
}

export default Login




