'use client'
import { useChangePasswordMutation } from "@/redux/features/user/userApi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function UpdatePassword({ user }: any) {

    const toastId: any = useRef(null); // store toast id
    const [changePassword, { data, isSuccess, error, isLoading }]:any = useChangePasswordMutation()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    useEffect(() => {

        if (isLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading('please wait...')
            }
        }

        if (isSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success('Password Updated ✔')
        }

        if (error) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            const errorMessage = error.data.message
            toast.error(errorMessage)
        }

    }, [isSuccess, error, isLoading])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            toast.error('All Fields are required')
        }

        if (newPassword !== confirmNewPassword) {
            toast.error('New Password & Confirm Password Not Matching')
        }

        await changePassword({ oldPassword, newPassword })
    }

    return (
        <div className=" col-span-3" >

            <div className="flex justify-center" >

                <div className="w-[50%] " >

                    <form onSubmit={handleSubmit} className="grid gap-4"  >

                        <div className="flex flex-col gap-2" >
                            <label htmlFor="oldPassword">Old Password</label>
                            <input type="text" id="oldPassword" value={oldPassword} onChange={(e: any) => setOldPassword(e.target.value)} className="border outline-none px-2 py-1" />
                        </div>

                        <div className="flex flex-col gap-2" >
                            <label htmlFor="newPassword">New Password</label>
                            <input type="text" id="newPassword" value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} className="border outline-none px-2 py-1" />
                        </div>

                        <div className="flex flex-col gap-2" >
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <input type="text" id="confirmNewPassword" value={confirmNewPassword} onChange={(e: any) => setConfirmNewPassword(e.target.value)} className="border outline-none px-2 py-1" />
                        </div>

                        <input type="submit" value="Submit" className="border cursor-pointer px-12 py-1 w-fit mt-2" />

                    </form>

                </div>

            </div>

        </div>
    )
}

