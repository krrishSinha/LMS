"use client";

import Link from "next/link";
import { useState } from "react";
import NavItems from "./NavItems";
import ThemeSwitcher from "./ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "./CustomModal";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Header({ open, setOpen, activeItem, route, setRoute }: any) {

    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const { user } = useSelector((state: any) => state.auth)

    console.log(user)

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setActive(true)
            } else {
                setActive(false)
            }
        })
    }

    const handleClose = (e: any) => {
        if (e.target.id == "screen") {
            setOpenSidebar(false)
        }
    }

    return (
        <>
            <div className="w-full relative" >

                <div className={`${active ? ' dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500' : 'dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:border-b dark:border-[#ffffff1c] w-full h-[80px] shadow-md '}`}  >

                    <div className=" w-[95%] md:w-[80%] h-full mx-auto">

                        <div className="w-full h-full flex items-center justify-between">
                            <div>
                                <Link href={'/'} className="text-black dark:text-white font-[600] text-2xl" >ELearning</Link>
                            </div>

                            {/* nav items div */}
                            <div className="flex items-center gap-5" >
                                <NavItems activeItem={activeItem} isMobile={false} />
                                <ThemeSwitcher />

                                {/* menu icon for mobile  */}
                                <HiOutlineMenuAlt3 size={25} className="md:hidden" onClick={() => setOpenSidebar(true)} />

                                {
                                    user ? (
                                        <Link href={'/profile'}>
                                            <Image src={'/assets/avatar.png'} alt="avatar" width={30} height={30} className="flex items-center" />
                                        </Link>
                                    ) : (
                                        <HiOutlineUserCircle className="hidden md:block cursor-pointer" size={25} onClick={() => setOpen(true)} />
                                    )
                                }
                            </div>
                        </div>

                    </div>

                    {/* mobile sidebar  */}
                    {
                        openSidebar && (
                            <div id="screen" className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset]  bg-[#00000024]" onClick={handleClose}  >
                                <div className={`fixed top-0 right-0 z-[99999999] w-[70%] h-screen bg-white  dark:bg-slate-900 dark:opacity-95 transition-all duration-500 py-10 px-5`} >
                                    <div className="text-center" >
                                        <Link href={'/'} className="text-black dark:text-white font-[600] text-2xl" >ELearning</Link>
                                    </div>
                                    <NavItems isMobile={true} activeItem={0} />
                                    <HiOutlineUserCircle className="mt-6 mx-auto cursor-pointer" size={25} onClick={() => setOpen(true)} />
                                    <div className="text-center mt-6" >
                                        Copyright &copy; 2025 ELearing
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>

                {/* Auth Model  */}
                {
                    route == 'Login' && (
                        <>
                            {
                                open && (
                                    <CustomModal open={open} setOpen={setOpen} route={route} setRoute={setRoute} component={Login} activeItem={activeItem} />
                                )
                            }
                        </>
                    )
                }
                {
                    route == 'Signup' && (
                        <>
                            {
                                open && (
                                    <CustomModal open={open} setOpen={setOpen} route={route} setRoute={setRoute} component={Signup} activeItem={activeItem} />
                                )
                            }
                        </>
                    )
                }
                {
                    route == 'Verification' && (
                        <>
                            {
                                open && (
                                    <CustomModal open={open} setOpen={setOpen} route={route} setRoute={setRoute} component={Verification} activeItem={activeItem} />
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    );
}
