'use client'

import React, { useEffect, useState, useMemo, useRef } from 'react'
import { format } from 'timeago.js';
import { MdDelete, MdEmail } from "react-icons/md";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
import CustomModal from '@/components/CustomModal';
import AddMember from '@/components/AddMember';
import Confirmation from '@/components/Confirmation';


type Course = {
    id: string
    title: string
    ratings: number
    purchased: number
    createdAt: string
}

export default function AllUsers({ type }: any) {

    const { data, isSuccess, error, isLoading } = useGetAllUsersQuery({})
    const [updateUserRole,
        { data: updateUserData, isSuccess: updateUserIsSuccess, isLoading: updateUserIsLoading, error: updateUserError }] = useUpdateUserRoleMutation({})

    const [deleteUser, { isSuccess: deleteUserIsSuccess, isLoading: deleteUserIsLoading, error: deleteUserError }] = useDeleteUserMutation({})

    const [openRemoveMemberConfirmation, setOpenRemoveMemberConfirmation] = useState(false)
    const [openDeleteUserConfirmation, setOpenDeleteUserConfirmation] = useState(false)

    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const toastId: any = useRef(null);

    const [users, setUsers] = useState([])

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {

        if (isSuccess && data?.users) {

            if (type == 'admin') {
                const selectedUser: any = data?.users
                    .filter((user: any) => user.role === "admin") // only admins
                    .map((user: any) => ({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        purchased_courses: user.enrolledCourses?.length || 0,
                        joined_at: format(user.createdAt),
                    }));

                setUsers(selectedUser)
            } else {
                const selectedUser: any = data?.users.map((user: any) => ({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    purchased_courses: user.enrolledCourses?.length || 0,
                    joined_at: format(user.createdAt),
                }))
                setUsers(selectedUser)
            }
        }

        if (error) {
            console.log(error)
            toast.error('Error')
        }

        if (updateUserIsLoading || deleteUserIsLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading('please wait...')
            }
        }

        if (updateUserIsSuccess || deleteUserIsSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success(updateUserIsSuccess ? 'Member Removed ✔' : 'User Deleted ✔')
            setOpen(false)
        }

        if (updateUserError || deleteUserError) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            const errorData = error as any
            toast.error('Error')
        }


    }, [data, isLoading, isSuccess, error, updateUserIsSuccess, updateUserIsLoading, updateUserError, deleteUserIsLoading, deleteUserIsSuccess])

    // Apply global search
    const filteredData = useMemo(() => {
        if (!users.length) return [];
        return users.filter((user: any) =>
            Object.values(user).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, users]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


    if (isLoading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Loading users...
            </div>
        );
    }

    const handleRemove = (email: any) => {
        setEmail(email)
        setOpenRemoveMemberConfirmation(!openRemoveMemberConfirmation)
    }

    const handleRemoveMember = async () => {
        const role = 'user'
        await updateUserRole({ email, role })
        setOpenRemoveMemberConfirmation(!openRemoveMemberConfirmation)
    }

    const handleDelete = (email: any) => {
        setEmail(email)
        setOpenDeleteUserConfirmation(!openDeleteUserConfirmation)
    }

    const handleDeleteUser = async () => {
        // console.log('delete user')
        await deleteUser({ email })
        setOpenDeleteUserConfirmation(!openDeleteUserConfirmation)
    }


    return (
        <div>

            <div className="p-6 bg-[#121A3A] text-white rounded-xl shadow-lg mt-10">
                {/* Header with Global Search */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {type ? 'Members' : 'Users'}
                    </h2>

                    <div >
                        <input
                            type="text"
                            placeholder="Search keyword"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-3 py-2 border rounded-md text-sm w-64"
                        />

                        <button onClick={() => setSearch("")} className="ml-2 px-3 py-2 text-sm bg-[crimson] text-white font-bold  hover:scale-[1.05] transition-all duration-300 ease-in-out rounded-md cursor-pointer">
                            Clear Filters
                        </button>

                        {
                            type && (
                                <button onClick={() => setOpen(!open)} className="ml-2 px-3 py-2 text-sm bg-gray-200 text-black font-bold  hover:scale-[1.05] transition-all duration-300 ease-in-out rounded-md cursor-pointer">
                                    Add Member
                                </button>
                            )
                        }

                        {/* Add Member Modal  */}
                        {
                            open && (
                                <CustomModal open={open} setOpen={setOpen} component={AddMember} />
                            )
                        }

                    </div>

                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="">
                            <th className="p-3 border text-left">ID</th>
                            <th className="p-3 border text-left">Name</th>
                            <th className="p-3 border text-left">Email</th>
                            <th className="p-3 border text-left">Role</th>
                            <th className="p-3 border text-left">Purchased Courses</th>
                            <th className="p-3 border text-left">Joined At</th>
                            {type ? (<th className="p-3 border text-left">Remove</th>) : (<th className="p-3 border text-left">Delete</th>)}
                            <th className="p-3 border text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData && paginatedData.map((user: any) => (
                            <tr key={user.id} className="border-b hover:bg-[#00000058] transition">
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3">{user.purchased_courses}</td>
                                <td className="p-3">{user.joined_at}</td>
                                {
                                    type ?
                                        (
                                            <td className="p-3 text-center cursor-pointer ">
                                                <button onClick={() => handleRemove(user.email)} className="ml-2 px-3 py-2 text-sm bg-[crimson] text-white font-bold rounded-md cursor-pointer">
                                                    Remove
                                                </button>
                                            </td>
                                        )
                                        :
                                        (
                                            <td className="p-3 text-center cursor-pointer " onClick={() => handleDelete(user.email)}> <MdDelete size={20} className='text-red-500' /> </td>
                                        )
                                }

                                <td className="p-3 text-center cursor-pointer ">
                                    <a href={`mailto:${user.email}`} target='_blank' >
                                        <MdEmail size={20} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No matching courses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        className="px-3 py-1 bg-white text-black rounded disabled:bg-gray-200 "
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                        ⬅ Prev
                    </button>
                    <span>
                        Page {currentPage} of {totalPages || 1}
                    </span>
                    <button
                        className="px-3 py-1 bg-white text-black rounded disabled:bg-gray-200 "
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    >
                        Next ➡
                    </button>
                </div>
            </div>


            {/* Remove Member Confirmation  */}
            {
                openRemoveMemberConfirmation && (
                    <CustomModal open={openRemoveMemberConfirmation} setOpen={setOpenRemoveMemberConfirmation} component={Confirmation} handleAction={handleRemoveMember} />
                )
            }


            {/* Delete User Confirmation  */}
            {
                openDeleteUserConfirmation && (
                    <CustomModal open={openDeleteUserConfirmation} setOpen={setOpenDeleteUserConfirmation} component={Confirmation} handleAction={handleDeleteUser} />
                )
            }

        </div>
    )
}



