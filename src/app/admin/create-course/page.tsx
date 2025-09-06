import AdminSidebar from '@/components/Admin/AdminSidebar'
import CreateCourse from '@/components/Admin/Course/CreateCourse'
import DashboardHeader from '@/components/Admin/DashboardHeader'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AdminProtected from '@/hooks/useAdminProtected'
import React from 'react'

function page() {
    return (
        <CreateCourse />
    )
}

export default page