import AdminSidebar from '@/components/Admin/AdminSidebar'
import AllCourses from '@/components/Admin/Course/AllCourses'
import DashboardHeader from '@/components/Admin/DashboardHeader'
import AllUsers from '@/components/Admin/User/AllUsers'
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
                        <AllUsers type={'admin'} />
                    </div>

                </div>

            </AdminProtected>
        </>
    )
}

