"use client"
import { useFormik } from "formik";
import * as Yup from 'yup'
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../app/styles/style";
import { useState } from "react";


const schema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().email('Invalid Email!').required('Please enter your email.'),
    password: Yup.string().required('Please enter your password').min(6)
});


export default function Signup({route,setRoute}:any) {

    const [show, setShow] = useState(false)

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema: schema,
        onSubmit: async ({ name,email, password }) => {
            setRoute('Verification')
            console.log(name,email, password);
        }
    })

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">

            <h1 className={`${styles.title}`} > Login with ELearning </h1>

            <form onSubmit={handleSubmit} className="mt-4" >

                <div className="grid space-y-2" >

                    <div className="grid space-y-2" >
                        <label htmlFor="name" className={`${styles.label}`} >Enter your Name</label>
                        <input type="text" id="name" className={`${errors.name && touched.name && 'border-red-500'} ${styles.input}`} placeholder="john doe" value={values.name} onChange={handleChange} />
                        {errors.email && touched.email && (
                            <span className="text-red-500 block">{errors.name}</span>
                        )}
                    </div>

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

                    <input type="submit" className={`${styles.button}`} value='Submit' />
                    <p className="text-center mt-2" >Or join with</p>

                    <div className="flex justify-center gap-3" >
                        <FcGoogle size={25} />
                        <AiFillGithub size={25} />
                    </div>

                    <p className="flex justify-center gap-1" >
                        Already have any account?
                        <span className="text-[#2190ff] cursor-pointer underline" onClick={()=>setRoute('Login')} >
                            Login
                        </span>
                    </p>

                </div>

            </form>

        </div>
    )
}
