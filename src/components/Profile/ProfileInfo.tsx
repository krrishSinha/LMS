'use client'
import { AiOutlineCamera } from "react-icons/ai";
import { useLoadUserQuery, useRefreshTokenQuery } from "@/redux/features/api/apiSlice"
import Image from "next/image"
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function ProfileInfo({ user }: any) {

    const [updateAvatar, { data, isSuccess, error, isLoading }] = useUpdateAvatarMutation()
    const toastId:any = useRef(null); // store toast id

    const imageHandler = async (e: any) => {
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result;
                await updateAvatar({ avatar });
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (isLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading('please wait...')
            }
        }
        if (isSuccess) {
            if(toastId.current){
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success('Avatar Updated Successfully...')
        }
    }, [isLoading, isSuccess])


    return (
        <div className=" col-span-3" >

            <div className=" flex flex-col items-center gap-5 " >

                <div className="flex justify-center " >
                    <div className="relative" >
                        <label htmlFor="avatar " className="" >
                            <Image
                                src={user?.avatar?.url || '/assets/avatar.png'}
                                alt="avatar"
                                height={150}
                                width={150}
                                className="cursor-pointer border-[3px] border-[#37a39a] rounded-full"
                            />
                            <input
                                type="file"
                                name=""
                                id="avatar"
                                className="hidden"
                                onChange={imageHandler}
                                accept="image/png,image/jpg,image/jpeg,image/webp"
                            />
                        </label>
                        <label htmlFor="avatar">
                            <div className="p-1 bg-slate-900 text-white rounded-full absolute bottom-0 right-0 flex items-center justify-center cursor-pointer">
                                <AiOutlineCamera size={20} className="z-1" />
                            </div>
                        </label>
                    </div>
                </div>


                <div className="w-[50%] " >

                    <form action="" className="grid gap-4"  >

                        <div className="flex flex-col gap-2" >
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" id="fullname" value={user?.name} readOnly className="border outline-none px-2 py-1" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Email Address</label>
                            <input type="email" readOnly value={user?.email} className="border outline-none px-2 py-1" />
                        </div>

                        <input type="submit" value="Update" className="border cursor-pointer px-12 py-1 w-fit mt-2" />

                    </form>

                </div>

            </div>

        </div>
    )
}

