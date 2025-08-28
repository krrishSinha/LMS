import AdminSidebar from '@/components/Admin/AdminSidebar'
import AllCourses from '@/components/Admin/Course/AllCourses'
import CourseOptions from '@/components/Admin/Course/CourseOptions'
import CreateCourse from '@/components/Admin/Course/CreateCourse'
import DashboardHeader from '@/components/Admin/DashboardHeader'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AdminProtected from '@/hooks/useAdminProtected'
import React from 'react'

export default function page() {
    return (
        <>
            <AdminProtected>

                <div className='flex' >

                    {/* sidebar  */}
                    <div className=''>
                        <SidebarProvider>
                            <AdminSidebar />
                            <main>
                                <SidebarTrigger />
                            </main>
                        </SidebarProvider>
                    </div>

                    <div className='py-10  w-full px-18' >
                        <DashboardHeader />
                        <AllCourses />
                    </div>

                </div>

            </AdminProtected>
        </>
    )
}

