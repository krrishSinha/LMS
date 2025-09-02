"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { IoIosPeople } from "react-icons/io";
import { FaFileInvoice, FaVideo } from "react-icons/fa";
import { FaClipboardQuestion, FaUserGroup } from "react-icons/fa6";
import { MdOutlineOndemandVideo, MdOutlineFeaturedVideo } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { SiSimpleanalytics } from "react-icons/si";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"

import { useSelector } from "react-redux"
import Link from "next/link"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: Home,
    },
    {
        title: "Users",
        url: "#",
        icon: Home,
    },
    {
        title: "Invoives",
        url: "#",
        icon: Home,
    },
    {
        title: "Create Course",
        url: "#",
        icon: Home,
    },
    {
        title: "Live Course",
        url: "#",
        icon: Home,
    },
    {
        title: "Hero",
        url: "#",
        icon: Home,
    },
    {
        title: "FAQ",
        url: "#",
        icon: Home,
    },
    {
        title: "Categories",
        url: "#",
        icon: Home,
    },
    {
        title: "Manage team",
        url: "#",
        icon: Home,
    },
    {
        title: "Course Analytics",
        url: "#",
        icon: Home,
    },
]

export default function AdminSidebar() {

    const { state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }: any = useSidebar()

    const { user } = useSelector((state: any) => state.auth)

    return (
        <div>
            <Sidebar collapsible="icon"  >
                <SidebarContent className="bg-[#121A3A] text-white  " >
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-2xl mb-5 text-white font-bold  flex justify-center" >ELearning</SidebarGroupLabel>

                        <div className="flex justify-center flex-col items-center gap-1 " >
                            <img src={user?.avatar?.url} alt="" className={` ${open ? 'w-20 h-20' : 'w-5 h-5'} rounded-full  `} />

                            {
                                open && (
                                    <>
                                        <h3 className="text-white " >Krrish Sinha</h3>
                                        <h4 className="text-sm text-white" >- Admin</h4>
                                    </>
                                )
                            }

                        </div>

                        <SidebarGroupContent className="mt-3 " >

                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/admin'}>
                                            <Home />
                                            <span> Dashboard </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            {
                                open && <SidebarMenu>
                                    <SidebarMenuItem >
                                        <SidebarMenuButton className="hover:bg-transparent hover:text-white " >
                                            <div className=" -mb-2 " >Data</div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            }


                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/admin/users'}>
                                            <IoIosPeople />
                                            <span className="dark:text-zinc-400 " > Users </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'#'}>
                                            <FaFileInvoice />
                                            <span className="dark:text-zinc-400"> Invoices </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            {
                                open && <SidebarMenu>
                                    <SidebarMenuItem >
                                        <SidebarMenuButton className="hover:bg-transparent hover:text-white  " >
                                            <div className=" -mb-2 " >Content</div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            }


                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/admin/create-course'}>
                                            <FaVideo />
                                            <span className="dark:text-zinc-400" > Create Course </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/admin/courses'}>
                                            <MdOutlineOndemandVideo />
                                            <span className="dark:text-zinc-400"> Live Courses </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            {
                                open && <SidebarMenu>
                                    <SidebarMenuItem >
                                        <SidebarMenuButton className="hover:bg-transparent hover:text-white " >
                                            <div className=" -mb-2" >Customization</div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            }


                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/admin/hero'}>
                                            <MdOutlineFeaturedVideo />
                                            <span className="dark:text-zinc-400" > Hero  </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/admin/faqs'}>
                                            <FaClipboardQuestion />
                                            <span className="dark:text-zinc-400"> FAQ</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/admin/categories'}>
                                            <TbCategoryFilled />
                                            <span className="dark:text-zinc-400"> Categories</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            {
                                open && <SidebarMenu>
                                    <SidebarMenuItem >
                                        <SidebarMenuButton className="hover:bg-transparent hover:text-white  " >
                                            <div className=" -mb-2" >Controllers</div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            }


                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/admin/team'}>
                                            <FaUserGroup />
                                            <span className="dark:text-zinc-400" > Manage Team  </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            {
                                open && <SidebarMenu>
                                    <SidebarMenuItem >
                                        <SidebarMenuButton className="hover:bg-transparent hover:text-white " >
                                            <div className=" -mb-2" >Analytics</div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            }


                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'#'}>
                                            <SiSimpleanalytics />
                                            <span className="dark:text-zinc-400" > Courses Analytics  </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'#'}>
                                            <SiSimpleanalytics />
                                            <span className="dark:text-zinc-400" > Orders Analytics  </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'#'}>
                                            <SiSimpleanalytics />
                                            <span className="dark:text-zinc-400" > Users Analytics  </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            {
                                open && <SidebarMenu>
                                    <SidebarMenuItem >
                                        <SidebarMenuButton className="hover:bg-transparent hover:text-white " >
                                            <div className=" -mb-2" >Extras</div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            }


                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'#'}>
                                            <SiSimpleanalytics />
                                            <span className="dark:text-zinc-400" > Setting  </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'#'}>
                                            <SiSimpleanalytics />
                                            <span className="dark:text-zinc-400" > Logout  </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}