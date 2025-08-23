'use client'

import { useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLazyLogoutQuery } from "@/redux/features/api/authApi";
import toast from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";


export default function Profile({ user }: any) {

    const [scroll, setScroll]: any = useState(false);
    const [avatar, setAvatar]: any = useState(null);
    const [logout, setLogout]: any = useState(false);
    const [active, setActive]: any = useState(1);

    const [triggerLogout, { isLoading, error }] = useLazyLogoutQuery();

    const logOutHandler: any = async () => {
        try {
            const res = await triggerLogout({}).unwrap(); // API response
            toast.success(res.message);
        } catch (err) {
            console.log(error);
            toast.error("Logout failed ❌");
        }

    };


    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }


    return (
        // main div 
        <div className="w-full md:flex items-center">

            <div className=" w-[95%] sm:w-[90%] md:w-[80%] mx-auto grid grid-cols-4 gap-5 mt-10 " >

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
                    active == 2 && <div>update password</div>
                }


            </div>

        </div>
    )
}

