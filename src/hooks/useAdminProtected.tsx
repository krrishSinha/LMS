'use client'

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";


export default function AdminProtected({ children }: any) {
    const { user } = useSelector((state: any) => state.auth)

    if(!user || user?.role !== 'admin'){
        console.log('hello')
        return redirect('/')
    }

    if(user?.role == 'admin'){
        return children
    }
   
}