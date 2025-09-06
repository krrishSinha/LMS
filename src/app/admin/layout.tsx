import React from 'react'
import AdminProtected from '@/hooks/useAdminProtected'
import AdminSidebar from '@/components/Admin/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import DashboardHeader from '@/components/Admin/DashboardHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const links = [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/courses", label: "Courses" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/settings", label: "Settings" },
    ];

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

                    <main className='w-full py-10 pr-6' >
                        <DashboardHeader />
                        {children}
                    </main>

                </div>
            </AdminProtected>
        </>

    )

}