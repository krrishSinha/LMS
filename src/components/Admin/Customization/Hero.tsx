'use client'

import { useEditLayoutMutation, useGetLayoutByTypeQuery } from '@/redux/features/layout/layoutApi'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineCamera } from "react-icons/ai";
import toast from 'react-hot-toast'


export default function Hero() {

    const { data, isSuccess, isLoading, refetch }: any = useGetLayoutByTypeQuery('banner', { refetchOnMountOrArgChange: true })
    const [editLayout, { data: editLayoutData, isSuccess: editLayoutIsSuccess, isLoading: editLayoutIsLoading, error }] = useEditLayoutMutation({})

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const toastId = useRef<string | null>(null);

    useEffect(() => {

        if (isSuccess) {
            const heroData = data?.layout?.banner
            setImage(heroData.image.url)
            setTitle(heroData.title)
            setDescription(heroData.description)
        }

        if (editLayoutIsLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading("please wait...");
            }
        }

        if (editLayoutIsSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current);
                toastId.current = null;
            }
            toast.success("Hero Updated ✅");
            refetch()
        }

    }, [data, editLayoutIsLoading, editLayoutIsSuccess, error])

    const handleUpdate = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async () => {
        const bannerData = {
            image,
            title,
            description,
        }

        await editLayout({
            type: "banner",
            bannerData
        });
    };

    if (isLoading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div className="w-full md:flex items-center">

            <div className=" mx-auto  lg:grid grid-cols-2 gap-10 items-center sm:space-y-10  my-10 " >
                {/* hero animation div  */}
                {/* <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div> */}

                {/* hero image div  */}
                <div className="relative w-full">
                    <img src={image} alt="hero image" className="object-contain  " />
                    <input
                        type="file"
                        name=""
                        id="banner"
                        accept="image/*"
                        onChange={handleUpdate}
                        className="hidden"
                    />
                    <label htmlFor="banner" className="absolute bottom-0 right-15 border-2 border-white rounded-full p-1 z-20">
                        <AiOutlineCamera className="dark:text-white text-black text-[25px] cursor-pointer" />
                    </label>
                </div>

                <div className="flex flex-col gap-3 lg:gap-6 " >

                    <textarea name="" id="" className="text-3xl lg:text-6xl font-[600] leading-10 lg:leading-17 field-sizing-content resize-none  outline-none"
                        value={title} onChange={(e) => setTitle(e.target.value)} />

                    <textarea name="" id="" className="font-josefin italic font-[600] text-sm lg:w-[85%] leading-6  field-sizing-content resize-none  outline-none"
                        value={description} onChange={(e) => setDescription(e.target.value)} />

                    <div className="relative rounded-md overflow-hidden border border-[#575757] dark:border-none flex items-center justify-between lg:w-[85%] " >
                        <input type="text" className="w-full py-2 px-2  dark:border-none outline-0  dark:bg-[#575757] dark:text-[#ffffffdd] dark:placeholder:text-[#ffffffdd] font-josefin italic font-[500] text-sm  " placeholder="Search Courses..." />
                        <div className="absolute right-0 bg-[#51A2FF] text-white  px-2 cursor-pointer h-full flex items-center " ><BiSearch /></div>
                    </div>

                    <div className="flex items-center gap-2 "  >
                        <div className="flex items-center" >
                            <Image src={'/assets/client-1.jpg'} alt="client-image" width={30} height={30} className="rounded-full " />
                            <Image src={'/assets/client-2.jpg'} alt="client-image" width={30} height={30} className="rounded-full ml-[-10px]" />
                            <Image src={'/assets/client-3.jpg'} alt="client-image" width={30} height={30} className="rounded-full ml-[-10px] " />
                        </div>
                        <p className="font-josefin italic text-sm  font-[600]  " >
                            500k+ People already trusted us.
                            <br className=":hidden" />
                            <Link href={'/courses'} className="dark:text-[#46e256] text-[crimson] " >View Courses</Link>
                        </p>
                    </div>

                    <div className={`px-10 py-1
                             ${data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.description !== description ||
                            data?.layout?.banner?.image?.url !== image
                            ? "cursor-pointer bg-[crimson] font-bold"
                            : "bg-slate-600 opacity-50"
                        }
                        !rounded absolute bottom-2 md:bottom-12 right-12`}
                        onClick={
                            data?.layout?.banner?.title !== title ||
                                data?.layout?.banner?.description !== description ||
                                data?.layout?.banner?.image?.url !== image
                                ? handleEdit
                                : () => null
                        }
                    >
                        Save
                    </div>
                </div>

            </div>

        </div>
    )
}

