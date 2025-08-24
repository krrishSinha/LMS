'use client'
import { AiOutlineCamera } from "react-icons/ai";
import { useLoadUserQuery, useRefreshTokenQuery } from "@/redux/features/api/apiSlice"
import Image from "next/image"
import { useEditInfoMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileInfo({ user }: any) {


    const [updateAvatar, { data, isSuccess, error, isLoading }] = useUpdateAvatarMutation()
    const [editInfo, { data: editinfoData, isSuccess: editInfoIsSuccess, error: editInfoError, isLoading: editinfoIsLoading }] = useEditInfoMutation()
    const [name, setName] = useState(user?.name || '')

    const toastId: any = useRef(null); // store toast id

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
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success('Avatar Updated ✔')
        }

        if (editinfoIsLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading('please wait...')
            }
        }

        if (editInfoIsSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success('Profile Updated ✔')
        }

        if (editInfoError) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.error('Error...')
            console.log(editInfoError)
        }

    }, [isLoading, isSuccess, editInfoIsSuccess, editinfoIsLoading, editInfoError])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (name !== '') {
            await editInfo({ name })
        }
    }


    return (
        <div className=" col-span-3" >

            <div className=" flex flex-col items-center gap-5 " >

                <div className="flex justify-center " >
                    <div className="relative" >
                        <label htmlFor="avatar " className="" >
                            <div className=" w-30 h-30 flex items-center  cursor-pointer border-[3px] border-[#37a39a] rounded-full overflow-hidden " >
                                <Image
                                    src={user?.avatar?.url || '/assets/avatar.png'}
                                    alt="avatar"
                                    height={200}
                                    width={200}
                                    className="object-contain rounded-full"
                                />
                            </div>
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

                    <form onSubmit={handleSubmit} className="grid gap-4"  >

                        <div className="flex flex-col gap-2" >
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" id="fullname" value={name} onChange={(e: any) => setName(e.target.value)} className="border outline-none px-2 py-1" />
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

