import React from 'react'
import AdminProtected from '@/hooks/useAdminProtected'
import AdminSidebar from '@/components/Admin/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import DashboardHero from '@/components/Admin/DashboardHero'
import Invoice from '@/components/Admin/Invoices/Invoice'

function page() {
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

                    <div className='py-10 w-full px-10' >
                        <DashboardHero />
                        <Invoice isDashboard={true} />
                    </div>

                </div>

            </AdminProtected>
        </>
    )
}

export default page