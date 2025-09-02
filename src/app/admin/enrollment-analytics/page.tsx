import AdminSidebar from '@/components/Admin/AdminSidebar'
import DashboardHeader from '@/components/Admin/DashboardHeader'
import EnrollmentsAnalytics from '@/components/Analytics/EnrollmentsAnalytics'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AdminProtected from '@/hooks/useAdminProtected'
import React from 'react'


export default async function page() {
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
                       <EnrollmentsAnalytics />
                    </div>

                </div>

            </AdminProtected>
        </>
    )
}

