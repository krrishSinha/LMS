'use client'

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";


export default function AdminProtected({ children }: any) {
    const { user } = useSelector((state: any) => state.auth)

    console.log(user)

    if (!user || user?.role !== 'admin') {
        return redirect('/')
    }

    if (user?.role == 'admin') {
        return children
    }

}