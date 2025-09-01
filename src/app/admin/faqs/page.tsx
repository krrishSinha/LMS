import AdminSidebar from '@/components/Admin/AdminSidebar'
import FAQ from '@/components/Admin/Customization/FAQ'
import DashboardHeader from '@/components/Admin/DashboardHeader'
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
                       <FAQ />
                    </div>

                </div>

            </AdminProtected>
        </>
    )
}

