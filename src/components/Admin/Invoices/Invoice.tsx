'use client'
import { useGetAllCoursesQuery } from '@/redux/features/course/courseApi'
import { useGetAllEnrollmentsQuery } from '@/redux/features/enrollment/enrollmentApi'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
import { format } from 'timeago.js';
import React, { useEffect, useMemo, useState } from 'react'
import { MdEmail } from 'react-icons/md'



export default function Invoice({ isDashboard }: any) {

    const { data, isLoading } = useGetAllEnrollmentsQuery({})
    const { data: usersData, isLoading: usersIsLoading } = useGetAllUsersQuery({})
    const { data: coursesData, isLoading: coursesIsLoading } = useGetAllCoursesQuery({})

    const [invoiceData, setInvoiceData] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Sample mock data
    const sampleUsers = [
        { _id: "u1", name: "John Doe", email: "john@example.com" },
        { _id: "u2", name: "Jane Smith", email: "jane@example.com" },
    ];

    const sampleCourses = [
        { _id: "c1", title: "React for Beginners", price: 49 },
        { _id: "c2", title: "Full Stack Development", price: 99 },
    ];

    const sampleEnrollments = [
        { _id: "e1", userId: "u1", courseId: "c1", createdAt: "2024-08-10" },
        { _id: "e2", userId: "u2", courseId: "c2", createdAt: "2024-08-15" },
    ];

    useEffect(() => {

        if (data) {

            // const temp = data.enrollments.map((enrollment: any) => {

            //     const user = usersData?.users.find((user: any) => user._id == enrollment.userId);

            //     const course = coursesData?.courses.map((course: any) => course._id == enrollment.courseId);

            //     return {
            //         ...enrollment,
            //         name: user?.name,
            //         email: user?.email,
            //         course: course?.title,
            //         price: "$" + course?.price,
            //         createdAt: format(enrollment.createdAt)
            //     }
            // });

            // setInvoiceData(temp)

            const temp: any = sampleEnrollments.map((enrollment) => {
                const user = sampleUsers.find((u) => u._id === enrollment.userId);
                const course = sampleCourses.find((c) => c._id === enrollment.courseId);

                return {
                    ...enrollment,
                    name: user?.name,
                    email: user?.email,
                    course: course?.title,
                    price: "$" + course?.price,
                    createdAt: format(enrollment.createdAt)
                };
            });

            setInvoiceData(temp);
        }

    }, [data, usersData, coursesData]);

    // Apply global search
    const filteredData = useMemo(() => {
        if (!invoiceData.length) return [];
        return invoiceData.filter((user: any) =>
            Object.values(user).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, invoiceData]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    if (isLoading) {
        return (
            <div>loading...</div>
        )
    };


    return (

        <div>

            <div className="p-6 bg-[#121A3A] text-white rounded-xl shadow-lg mt-10">

                {
                    isDashboard && (
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                Invoices
                            </h2>

                            <div>
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
                    )
                }


                <table className="w-full border-collapse">
                    <thead>
                        <tr className="">
                            <th className="p-3 border text-left">ID</th>
                            <th className="p-3 border text-left">Name</th>
                            <th className="p-3 border text-left">Email</th>
                            <th className="p-3 border text-left">Course</th>
                            <th className="p-3 border text-left">Price</th>
                            <th className="p-3 border text-left">Joined At</th>
                            <th className="p-3 border text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData && paginatedData.map((invoice: any) => (
                            <tr key={invoice._id} className="border-b hover:bg-[#00000058] transition">
                                <td className="p-3">{invoice._id}</td>
                                <td className="p-3">{invoice.name}</td>
                                <td className="p-3">{invoice.email}</td>
                                <td className="p-3">{invoice.course}</td>
                                <td className="p-3">{invoice.price}</td>
                                <td className="p-3"> {invoice.createdAt}  </td>

                                <td className="p-3 text-center cursor-pointer ">
                                    <a href={`mailto:${invoice.email}`} target='_blank' >
                                        <MdEmail size={20} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No matching Invoices found.
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

