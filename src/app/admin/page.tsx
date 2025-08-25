import React from 'react'
import useAdminProtected from '@/hooks/useAdminProtected'
import AdminProtected from '@/hooks/useAdminProtected'
import AdminSidebar from '@/components/Admin/AdminSidebar'

function page() {
    return (
        <>
            <AdminProtected>

                <div>

                    {/* sidebar  */}
                    <div className='' >
                        <AdminSidebar />
                    </div>

                </div>

            </AdminProtected>
        </>
    )
}

export default page