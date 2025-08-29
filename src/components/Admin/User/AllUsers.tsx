'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useGetAllCoursesQuery } from '@/redux/features/course/courseApi';
import { format } from 'timeago.js';
import { MdDelete, MdEmail } from "react-icons/md";
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';



type Course = {
    id: string
    title: string
    ratings: number
    purchased: number
    createdAt: string
}

export default function AllUsers({type}:any) {
    const { data, isSuccess, error, isLoading } = useGetAllUsersQuery({})

    const [users, setUsers] = useState([])

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {

        console.log(data)

        if (isSuccess && data?.users) {

            if (type == 'admin') {
                console.log('admin')
                const selectedUser: any = data?.users
                    .filter((user: any) => user.role === "admin") // only admins
                    .map((user: any) => ({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        purchased_courses: user.purchasedCourses || 0,
                        joined_at: format(user.createdAt),
                    }));

                setUsers(selectedUser)
            } else {
                console.log('user')
                const selectedUser: any = data?.users.map((user: any) => ({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    purchased_courses: user.purchasedCourses || 0,
                    joined_at: format(user.createdAt),
                }))
                setUsers(selectedUser)
            }
        }

        if (error) {
            console.log(error)
            toast.error('Error')
        }

    }, [data, isLoading, isSuccess, error])

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


    return (
        <div>

            <div className="p-6 bg-[#121A3A] text-white rounded-xl shadow-lg mt-10">
                {/* Header with Global Search */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Users</h2>

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
                            <th className="p-3 border text-left">Delete</th>
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
                                <td className="p-3 text-center cursor-pointer " onClick={() => console.log(user.id)}> <MdDelete size={20} className='text-red-500' /> </td>
                                <td className="p-3 text-center cursor-pointer " onClick={() => console.log(user.id)}> <MdEmail size={20} /> </td>
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



        </div>
    )
}



