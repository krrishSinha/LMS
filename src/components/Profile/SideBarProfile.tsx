import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

export default function SideBarProfile({ user, active, avatar, setActive, logOutHandler }: any) {


    return (
        // main div 
        <div className="dark:bg-[#101524] border border-slate-800 shadow-md max-h-fit " >

            <div
                className={` ${active == 1 ? `dark:bg-slate-800 bg-gray-100` : `bg-transparent`} flex items-center  px-3 py-5 cursor-pointer`}
                onClick={() => setActive(1)}
            >

                <div className="w-10 h-10 overflow-hidden rounded-full flex items-center "
                    style={{ minWidth: 30, minHeight: 30 }}  >
                    <Image src={user?.avatar?.url || `/assets/avatar.png`} alt="avatar" height={30} width={30} className="object-cover rounded-full" />
                </div>

                <h5>
                    My Account
                </h5>
            </div>

            <div
                className={` ${active == 2 ? `dark:bg-slate-800 bg-gray-100` : `bg-transparent`}  flex items-center px-3 py-5 gap-2 cursor-pointer`}
                onClick={() => setActive(2)}
            >

                <div>
                    <RiLockPasswordLine size={20} className="dark:text-white text-black" />
                </div>

                <h5>
                    Change Password
                </h5>
            </div>

            <div
                className={` ${active == 3 ? `dark:bg-slate-800 bg-gray-100` : `bg-transparent`} flex items-center  px-3 py-5 gap-2 cursor-pointer`}
                onClick={() => setActive(3)}
            >

                <div>
                    <SiCoursera size={20} className="dark:text-white text-black" />
                </div>
                <h5>
                    Enrolled Courses
                </h5>
            </div>

            <div
                className={` ${active == 4 ? `dark:bg-slate-800 bg-gray-100` : `bg-transparent`} flex items-center  px-3 py-5 gap-2 cursor-pointer`}
                onClick={() => logOutHandler()}
            >

                <div>
                    <AiOutlineLogout size={20} className="dark:text-white text-black" />
                </div>

                <h5>
                    Log Out
                </h5>
            </div>


        </div>
    )
}

