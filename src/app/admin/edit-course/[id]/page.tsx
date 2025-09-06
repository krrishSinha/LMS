import AdminSidebar from '@/components/Admin/AdminSidebar'
import EditCourse from '@/components/Admin/Course/EditCourse'
import DashboardHeader from '@/components/Admin/DashboardHeader'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AdminProtected from '@/hooks/useAdminProtected'
import React from 'react'


export default async function page({ params }: any) {
    const id = await params.id
    return (
        <EditCourse id={id} />
    )
}

