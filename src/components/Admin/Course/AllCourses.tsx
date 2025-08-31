'use client'

import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/course/courseApi';
import { format } from 'timeago.js';
import { MdEdit, MdDelete } from "react-icons/md";
import CustomModal from '@/components/CustomModal';
import Confirmation from '@/components/Confirmation';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Course = {
    id: string
    title: string
    ratings: number
    purchased: number
    createdAt: string
}

export default function AllCourses() {
    const { data, isSuccess, error, isLoading } = useGetAllCoursesQuery({})
    const [deleteCourse, { isSuccess: deleteCourseIsSuccess, isLoading: deleteCourseIsLoading, error: deleteCourseError }] = useDeleteCourseMutation()
    const toastId: any = useRef(null);

    const [courses, setCourses] = useState([])
    const [courseId, setCourseId] = useState('')
    const [openDeleteCourseConfirmation, setOpenDeleteCourseConfirmation] = useState(false)

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {

        if (isSuccess && data?.courses) {

            const selectedCourse: any = data?.courses.map((course: any) => ({
                id: course._id,
                title: course.title,
                ratings: course.ratings,
                purchased: course.purchased,
                createdAt: format(course.createdAt)
            }))

            setCourses(selectedCourse)
        }

        if (deleteCourseIsLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading('please wait...')
            }
        }

        if (deleteCourseIsSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success('Course Deleted ✔')
        }

        if (deleteCourseError) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            const errorData = error as any
            toast.error('Error')
        }

    }, [data, isLoading, isSuccess, deleteCourseIsLoading, deleteCourseIsSuccess, deleteCourseError])

    // Apply global search
    const filteredData = useMemo(() => {
        if (!courses.length) return [];
        return courses.filter((course: any) =>
            Object.values(course).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, courses]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


    if (isLoading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Loading courses...
            </div>
        );
    }

    const deleteCourseTrigger = (id: any) => {
        setOpenDeleteCourseConfirmation(!openDeleteCourseConfirmation)
        setCourseId(id)
    }

    const handleDeleteCourse = async () => {
        await deleteCourse({ courseId })
        setOpenDeleteCourseConfirmation(false)
    }


    return (
        <div>

            <div className="p-6 bg-[#121A3A] text-white rounded-xl shadow-lg mt-10">
                {/* Header with Global Search */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Courses</h2>

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
                            <th className="p-3 border text-left">Course Title</th>
                            <th className="p-3 border text-left">Ratings</th>
                            <th className="p-3 border text-left">Purchased</th>
                            <th className="p-3 border text-left">Created At</th>
                            <th className="p-3 border text-left">Edit</th>
                            <th className="p-3 border text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData && paginatedData.map((course: any) => (
                            <tr key={course.id} className="border-b hover:bg-[#00000058] transition">
                                <td className="p-3">{course.id}</td>
                                <td className="p-3">{course.title}</td>
                                <td className="p-3">{course.ratings}</td>
                                <td className="p-3">{course.purchased}</td>
                                <td className="p-3">{course.createdAt}</td>
                                <td className="p-3  text-center cursor-pointer ">
                                    <Link href={`/admin/edit-course/${course.id}`} >
                                        <MdEdit size={20} />
                                    </Link>
                                </td>
                                <td className="p-3 text-center cursor-pointer " onClick={() => deleteCourseTrigger(course.id)}> <MdDelete size={20} className='text-red-500' /> </td>
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

            {/* Delete Course Model  */}
            {
                openDeleteCourseConfirmation && (
                    <CustomModal open={openDeleteCourseConfirmation} setOpen={setOpenDeleteCourseConfirmation} component={Confirmation} handleAction={handleDeleteCourse} />
                )
            }

        </div>
    )
}



