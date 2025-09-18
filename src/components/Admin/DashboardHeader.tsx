'use client'

import React, { useEffect, useState } from 'react'
import ThemeSwitcher from '../ThemeSwitcher'
import { IoMdNotifications } from "react-icons/io";
import { useGetNotificationsQuery, useUpdateNotificationStatusMutation } from '@/redux/features/notification/notificationApi';
import { format } from 'timeago.js';
import toast from 'react-hot-toast';


function DashboardHeader() {

    const [open, setOpen] = useState(false);

    const { data, isLoading, refetch }: any = useGetNotificationsQuery({})
    const [updateNotificationStatus, { isSuccess }]: any = useUpdateNotificationStatusMutation({})

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (data) {
            const unreadNotifications = data?.notifications.filter((notification: any) =>
                notification.status == 'unread'
            )
            setNotifications(unreadNotifications)
        };

        if (isSuccess) {
            refetch()
        }

    }, [data, isSuccess])

    const handleMarkAsRead = async (id: any) => {
        await updateNotificationStatus(id)
        toast.success('Notification marked as read')
    }

    return (
        <div className='flex justify-end' >

            <div className='flex items-center gap-5' >
                <ThemeSwitcher />
                <div className='relative ' >
                    <IoMdNotifications size={25} className='relative cursor-pointer' onClick={() => setOpen(!open)} />
                    <div className='absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[8px] bg-teal-600 rounded-full select-none' > {notifications.length} </div>
                    {
                        open && <div className='w-[350px] max-h-[350px] overflow-scroll absolute top-10 right-0 bg-[#121A3A] text-white z-[999] ' >
                            <div className='text-center text-xl py-3' >Notifications</div>

                            <div className='bg-[#1E2A40] px-2 py-2 border-b grid space-y-1 ' >
                                {
                                    notifications.length > 0 ? notifications?.map((notification: any, index: any) => (
                                        <div key={index} >
                                            <div className='flex justify-between items-center' >
                                                <span> {notification.title} </span>
                                                <span className='text-zinc-400 text-xs cursor-pointer' onClick={() => handleMarkAsRead(notification._id)} >Mark as read</span>
                                            </div>
                                            <div className='text-sm text-zinc-300' > {notification.message} </div>
                                            <div className='text-zinc-400 text-xs' > {format(notification.createdAt)} </div>
                                        </div>
                                    ))
                                        : (
                                            <div className='text-center text-gray-400 text-sm ' > No New Notifications </div>
                                        )
                                }
                            </div>

                        </div>
                    }
                </div>


            </div>

        </div>
    )
}

export default DashboardHeader