import EditCourse from '@/components/Admin/Course/EditCourse'
import React from 'react'


export default async function page({ params }: any) {
    const id = await params.id
    return (
        <EditCourse id={id} />
    )
}

