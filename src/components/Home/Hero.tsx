import { useGetLayoutByTypeQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";


export default function Hero() {

    const { data, isLoading } = useGetLayoutByTypeQuery('banner')
    const [header, setHeader]: any = useState([]);
    const [search, setSearch] = useState('')

    const router = useRouter()

    useEffect(() => {
        if (data) {
            setHeader(data.layout.banner)
        }
    }, [data])

    if (isLoading) {
        return (
            <div>loading...</div>
        )
    };

    const handleSearch = () => {
        if (search == '') {
            return
        } else {
            router.push(`/courses?title=${search}`)
        }
    }

    return (
        // main div 
        <div className="w-full md:flex items-center ">

            <div className="w-[90%] sm:w-[90%] md:w-[85%] mx-auto lg:h-[calc(100vh-80px)] lg:grid grid-cols-2 items-center sm:space-y-10 mt-10 md:mt-0  " >
                {/* hero animation div  */}
                {/* <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div> */}

                {/* hero image div  */}
                <div className="relative w-full h-[40vh] lg:h-full flex items-center ">
                    {header?.image &&
                        <img src={header?.image?.url} alt="hero image" className="" />
                    }

                </div>

                <div className="flex flex-col gap-3 lg:gap-6 " >
                    <h1 className="text-3xl lg:text-6xl font-[600] leading-10 lg:leading-17">
                        {header?.title}
                    </h1>
                    <p className="font-josefin italic font-[600] text-sm lg:w-[85%] leading-6 " >
                        {header?.description}
                    </p>

                    <div className="relative rounded-md overflow-hidden border border-[#575757] dark:border-none flex items-center justify-between lg:w-[85%] " >
                        <input type="text" className="w-full py-2 px-2  dark:border-none outline-0  dark:bg-[#575757] dark:text-[#ffffffdd] dark:placeholder:text-[#ffffffdd] font-josefin italic font-[500] text-sm  " placeholder="Search Courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className="absolute right-0 bg-[#51A2FF] text-white  px-2 cursor-pointer h-full flex items-center " onClick={handleSearch}><BiSearch /></div>
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
                </div>

            </div>

        </div>
    )
}

