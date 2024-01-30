import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';


const Login = () => {

    const [disable, setDisable] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';
    const { user, handleGoogleSignIn, loading, signIn, setLoading } = useContext(AuthContext)


    const handleValidateCaptcha = (e) => {
        const captchaValue = e.target.value

        if (validateCaptcha(captchaValue, false) == true) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }


    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
            signIn(email, password)
                .then(result => {
                 if(result.user){
                    console.log(result)
                    reset()
                    const user = result.user
                    console.log(user)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User Login Successfull",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(from, { replace: true })
                 }
                })
                .catch(err => {
                    console.log(err)
                })

        
    }
    
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user)
                if (user) {
                    const saveUser = { name: user.displayName, email: user.email }
                    axios.post(`${import.meta.env.VITE_API_URL}/users`, saveUser)
                        .then(res => {
                            console.log(res.data)
                            if (res.data) {
                                Swal.fire({
                                    position: "top",
                                    icon: "success",
                                    title: "User Login Successfull",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate(from, { replace: true })
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err)

            })
    }

    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                {...register("email", { required: true })}
                                id='email'
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            {errors.email && <span className='mt-2 text-red-600'>This field is required</span>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                {...register("password", { required: true })}
                                type='password'
                                name='password'
                                id='password'

                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                            {errors.password && <span className='mt-2 text-red-600'>This field is required</span>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='captcha' className='text-sm mb-2'>
                                    <LoadCanvasTemplate></LoadCanvasTemplate>
                                </label>
                            </div>
                            <input
                                onInput={handleValidateCaptcha}
                                type='text'
                                {...register("captcha", { required: true })}
                                id='captcha'

                                placeholder='type the captcha here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                            {errors.captcha && <span className='mt-2 text-red-600'>This field is required</span>}

                        </div>
                    </div>

                    <div>
                        <button disabled={false}
                            type='submit'
                            className={`${disable ? 'w-full rounded-md py-3  border-2' : 'bg-rose-500 w-full rounded-md py-3 text-white'}`}
                        >
                            Continue
                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={googleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login