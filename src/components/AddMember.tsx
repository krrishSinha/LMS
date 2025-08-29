import { useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


export default function AddMember({ setOpen }: any) {
    const [updateUserRole, { data, isSuccess, isLoading, error }] = useUpdateUserRoleMutation({})

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const toastId: any = useRef(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, role });
        await updateUserRole({ email, role })
    };

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
            toast.success('Member Added ✔')
            setOpen(false)
        }

        if (error) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            const errorData = error as any
            toast.error(errorData.data.message)
        }

    }, [data, isSuccess, error, isLoading])


    return (
        <div>

            <div className="p-6  shadow-md rounded-lg w-full max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Add Member</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email input */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter member email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Role select */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-[#121A3A] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Add Member
                    </button>
                </form>
            </div>

        </div>
    )

}