"use client"
import { useFormik } from "formik";
import * as Yup from 'yup'
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../app/styles/style";
import { useEffect, useRef, useState } from "react";
import { useLoginMutation, useSocialLoginMutation } from "@/redux/features/api/authApi";
import toast from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react"
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";


const schema = Yup.object().shape({
    email: Yup.string().email('Invalid Email!').required('Please enter your email.'),
    password: Yup.string().required('Please enter your password').min(6)
});


export default function Login({ setRoute, setOpen }: any) {

    const [show, setShow] = useState(false)
    const [login, { data, error, isSuccess, isError, isLoading }] = useLoginMutation()
    const [socialLogin, { isSuccess: socialIsSuccess, error: socialError, data: SocialData }] = useSocialLoginMutation()
    const { user } = useSelector((state: any) => state.auth)
    const toastId: any = useRef(null); // store toast id

    const { data: session }: any = useSession()

    //login
    useEffect(() => {
        if (isLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading('please wait...')
            }
        }
        if (isSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success('Logged In ✔')
            setOpen(false)
        }

        if (isError) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            const errorData = error as any
            toast.error(errorData.data.message)
        }

    }, [isSuccess, error, isLoading])

    // google login 
    useEffect(() => {
        const socialLoginHandler = async () => {
            if (!user) {
                if (session) {
                    await socialLogin({
                        email: session?.user?.email,
                        name: session?.user?.name,
                        avatar: session?.avatar?.avatar || ''
                    })
                    if (socialIsSuccess) {
                        toast.success('Login Successfull')
                    }
                }
            }

            if (socialError) {
                toast.error('Error')
            }
        }
        socialLoginHandler()
    }, [user, session])

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password }).unwrap();
        }
    })

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">

            <h1 className={`${styles.title}`} > Login with ELearning </h1>

            <form onSubmit={handleSubmit} className="mt-4" >

                <div className="grid space-y-2" >

                    <div className="grid space-y-2" >
                        <label htmlFor="email" className={`${styles.label}`} >Enter your Email</label>
                        <input type="text" id="email" className={`${errors.email && touched.email && 'border-red-500'} ${styles.input}`} placeholder="login@gmail.com" value={values.email} onChange={handleChange} />
                        {errors.email && touched.email && (
                            <span className="text-red-500 block">{errors.email}</span>
                        )}
                    </div>

                    <div className="grid space-y-2" >
                        <label htmlFor="password" className={`${styles.label}`}>Enter your Password</label>
                        <div className="relative " >
                            <input type={`${show ? 'text' : 'password'}`} id="password" className={`${errors.password && touched.password && 'border-red-500'}  ${styles.input}`} placeholder="password@123" value={values.password} onChange={handleChange} />
                            {!show ? (
                                <AiOutlineEyeInvisible
                                    className="absolute right-4 top-[50%] -translate-y-1/2 "
                                    size={20}
                                    onClick={() => setShow(true)}
                                />
                            ) : (
                                <AiOutlineEye
                                    className="absolute right-4 top-[50%] -translate-y-1/2 "
                                    size={20}
                                    onClick={() => setShow(false)}
                                />
                            )}
                        </div>
                        {errors.password && touched.password && (
                            <span className="text-red-500 block">{errors.password}</span>
                        )}
                    </div>

                    <input type="submit" className={`${styles.button}`} value='Login' />
                    <p className="text-center mt-2" >Or join with</p>

                    <div className="flex justify-center gap-3" >
                        <FcGoogle size={25} onClick={() => signIn('google')} className="cursor-pointer" />
                        <AiFillGithub size={25} className="cursor-pointer" />
                    </div>

                    <p className="flex justify-center gap-1" >
                        Not have any account?
                        <span className="text-[#2190ff] cursor-pointer underline" onClick={() => setRoute('Signup')} >
                            Sign Up
                        </span>
                    </p>

                </div>

            </form>

        </div>
    )
}
