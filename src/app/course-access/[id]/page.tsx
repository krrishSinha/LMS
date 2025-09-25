'use client'

import CourseAccess from "@/components/Admin/Course/CourseAccess"
import Header from "@/components/Header"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export default function page({ params }: any) {

    const { id } = params
    const { user } = useSelector((state: any) => state.auth)

    const [open, setOpen] = useState(false)
    const [activeIem, setActiveItem] = useState(0)
    const [route, setRoute] = useState('Login')


    useEffect(() => {
        if (!user) {
            return redirect('/')
        };

        const isPurchased = user && user?.enrolledCourses.map((item: any) => item._id.includes(params.id));

        if (!isPurchased) {
            return redirect('/')
        }
    }, [])


    return (
        <div>

            <Header open={open} setOpen={setOpen} activeItem={activeIem} route={route} setRoute={setRoute} />

            <CourseAccess />

        </div>
    )

}