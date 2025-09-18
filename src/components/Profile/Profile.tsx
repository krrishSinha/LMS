'use client'

import { useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import toast from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";
import UpdatePassword from "./UpdatePassword";
import { useLogoutMutation } from "@/redux/features/api/authApi";
import { useSelector } from "react-redux";
import CourseCard from "../Courses/CourseCard";


export default function Profile() {

    const { user }: any = useSelector((state: any) => state.auth)

    const [scroll, setScroll]: any = useState(false);
    const [avatar, setAvatar]: any = useState(null);
    // const [logout, setLogout]: any = useState(false);
    const [active, setActive]: any = useState(1);

    const [logout]: any = useLogoutMutation({});

    const logOutHandler: any = async () => {
        try {
            const res: any = await logout()// API response
            toast.success(res.message);
        } catch (err) {
            console.log(err);
            toast.error("Logout failed ❌");
        }

    };


    // if (typeof window !== "undefined") {
    //     window.addEventListener("scroll", () => {
    //         if (window.scrollY > 85) {
    //             setScroll(true);
    //         } else {
    //             setScroll(false);
    //         }
    //     });
    // }


    return (
        // main div 
        <div className="w-full md:flex items-center mt-30 ">

            <div className=" w-[95%] sm:w-[90%] md:w-[80%] mx-auto md:grid md:grid-cols-4 md:gap-5 mt-10 " >

                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logOutHandler={logOutHandler}
                />

                {
                    active == 1 && <ProfileInfo user={user} />
                }

                {
                    active == 2 && <UpdatePassword user={user} />
                }

                {
                    active == 3 &&
                    <div className="col-span-3 " >
                        <h2 className="text-xl" >Enrolled Courses</h2>

                        <div className="mt-5 grid md:grid-cols-3 gap-5" >
                            {user?.enrolledCourses?.map((course:any, index:any)=>(
                                <>
                                <CourseCard course={course} index={index} />
                                <CourseCard course={course} index={index} />
                                <CourseCard course={course} index={index} />
                                </>
                            ))}
                        </div>
                    </div>
                }


            </div>

        </div>
    )
}

