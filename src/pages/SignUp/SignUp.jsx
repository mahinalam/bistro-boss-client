import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import img from '../../assets/others/authentication1.png'
import { useContext, useRef } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import axios from 'axios'
import Swal from 'sweetalert2'



const SignUp = () => {

    const { user, createUser, handleGoogleSignIn, updateUserProfile, loading, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value
        const image = form.image.files[0]
        console.log(image)
        const formData = new FormData()
        formData.append('image', image);


        await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_KEY}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                const imageURL = imageData.data.display_url

                createUser(email, password)
                    .then(result => {
                        const user = result.user.email
                        console.log(user)

                        updateUserProfile(name, imageURL)
                            .then(() => {
                                const saveUser = { name: name, email: email }
                                console.log(saveUser)
                                axios.post(`${import.meta.env.VITE_API_URL}/users`, saveUser)
                                    .then(res => {
                                        console.log(res.data)
                                        if (res.data.insertedId) {
                                            Swal.fire({
                                                position: "top-end",
                                                icon: "success",
                                                title: "Signup successfull",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                        }
                                        navigate(from, { replace: true })
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                            })

                    })
                    .catch(err => console.log(err))

            }

            )
            .catch(err => {
                console.log(err)
            })
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(result => {
                console.log(result.user)
                const user = result.user
                if (user) {
                    const saveUser = { name: user.displayName, email: user.email }
                    axios.post(`/${import.meta.env.VITE_API_URL}`, saveUser)
                        .then(res => {
                            console.log(res.data)
                            if (res.data) {
                                navigate(from, { replace: true })
                            }
                        })
                }
                // navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className='md:flex justify-center items-center bg-[#F1F2F4] my-10'>
            <div className='md:w-1/2 md:py-16 px-10'>

                <img className='md:w-[600px] justify-center items-center' src={img} alt="" />

            </div>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                    <div className='mb-8 text-center'>
                        <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                        <p className='text-sm text-gray-400'>Welcome to Bistro Boss</p>
                    </div>
                    <form onSubmit={handleSubmit}
                        noValidate=''
                        action=''
                        className='space-y-6 ng-untouched ng-pristine ng-valid'
                    >
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Enter Your Name Here'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>
                            <div>
                                <label htmlFor='image' className='block mb-2 text-sm'>
                                    Select Image:
                                </label>
                                <input
                                    required
                                    type='file'
                                    id='image'
                                    name='image'
                                    accept='image/*'
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Email address
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    required
                                    placeholder='Enter Your Email Here'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <label htmlFor='password' className='text-sm mb-2'>
                                        Password
                                    </label>
                                </div>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    required
                                    placeholder='*******'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='bg-rose-500 w-full rounded-md py-3 text-white'
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                    <div className='flex items-center pt-4 space-x-1'>
                        <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                        <p className='px-3 text-sm dark:text-gray-400'>
                            Signup with social accounts
                        </p>
                        <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    </div>
                    <div onClick={googleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                        <FcGoogle size={32} />

                        <p>Continue with Google</p>
                    </div>
                    <p className='px-6 text-sm text-center text-gray-400'>
                        Already have an account?{' '}
                        <Link
                            to='/login'
                            className='hover:underline hover:text-rose-500 text-gray-600'
                        >
                            Login
                        </Link>
                        .
                    </p>
                </div>
            </div>

        </div>
    )
}

export default SignUp