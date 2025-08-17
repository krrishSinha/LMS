"use client";

import Link from "next/link";

export const navitems = [
    {
        name: 'Home',
        url: "/"
    },
    {
        name: 'Courses',
        url: "/courses"
    },

    {
        name: 'About',
        url: "/about"
    },
    {
        name: 'Policy',
        url: "/policy"
    },
    {
        name: 'FAQ',
        url: "/faq"
    },
]

export default function NavItems({ activeItem, isMobile }: any) {

    return (
        <>
            <div className="hidden md:flex items-center gap-5 text-sm">
                {navitems && navitems.map((item, index) => {
                    return (
                        <Link key={index} href={item.url}>
                            <span className={`${activeItem == index ? 'text-[crimson] dark:text-[#37a39a]' : 'text-black dark:text-white'}`} >
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>

            {/* for mobile  */}

            {
                isMobile && (
                    <div className="md:hidden">

                        <div className="flex flex-col items-center mt-10 gap-6">
                            {
                                navitems.map((item, index) => {
                                    return (
                                        <Link key={index} href={item.url} >
                                            <span className={`${activeItem == index ? 'text-[crimson] dark:text-[#37a39a]' : ''}`} >
                                                {item.name}
                                            </span>
                                        </Link> 
                                    )
                                })
                            }

                        </div>

                    </div>
                )
            }

        </>
    );
}
