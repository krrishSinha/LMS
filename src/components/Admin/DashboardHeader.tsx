'use client'

import React, { useState } from 'react'
import ThemeSwitcher from '../ThemeSwitcher'
import { IoMdNotifications } from "react-icons/io";


function DashboardHeader() {

    const [open, setOpen] = useState(false)

    return (
        <div className='flex justify-end' >

            <div className='flex items-center gap-5' >
                <ThemeSwitcher />
                <div className='relative ' >
                    <IoMdNotifications size={25} className='relative cursor-pointer' onClick={() => setOpen(!open)} />
                    <div className='absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[8px] bg-teal-600 rounded-full select-none' > 10 </div>
                    {
                        open && <div className='w-[350px] max-h-[350px] overflow-scroll absolute top-10 right-0 bg-[#121A3A] text-white z-[999] ' >
                            <div className='text-center text-xl py-3' >Notifications</div>

                            <div className='bg-[#1E2A40] px-2 py-2 border-b grid space-y-1 ' >
                                <div className='flex justify-between items-center' >
                                    <span>New Question Received</span>
                                    <span className='text-zinc-400 text-xs cursor-pointer' >Mark as read</span>
                                </div>
                                <div className='text-sm text-zinc-300' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae architecto omnis vero veritatis.</div>
                                <div className='text-zinc-400 text-xs' >5 days ago</div>
                            </div>

                              <div className='bg-[#1E2A40] px-2 py-2 border-b grid space-y-1 ' >
                                <div className='flex justify-between items-center' >
                                    <span>New Question Received</span>
                                    <span className='text-zinc-400 text-xs cursor-pointer' >Mark as read</span>
                                </div>
                                <div className='text-sm text-zinc-300' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae architecto omnis vero veritatis.</div>
                                <div className='text-zinc-400 text-xs' >5 days ago</div>
                            </div>

                             <div className='bg-[#1E2A40] px-2 py-2 border-b grid space-y-1 ' >
                                <div className='flex justify-between items-center' >
                                    <span>New Question Received</span>
                                    <span className='text-zinc-400 text-xs cursor-pointer' >Mark as read</span>
                                </div>
                                <div className='text-sm text-zinc-300' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae architecto omnis vero veritatis.</div>
                                <div className='text-zinc-400 text-xs' >5 days ago</div>
                            </div>
                        </div>
                    }
                </div>


            </div>

        </div>
    )
}

export default DashboardHeader