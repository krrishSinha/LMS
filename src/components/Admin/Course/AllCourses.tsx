'use client'

import React, { useEffect, useState } from 'react'
import { useGetAllCoursesQuery } from '@/redux/features/course/courseApi';
import { format } from 'timeago.js';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";



export default function AllCourses() {
    const [courses, setCourses] = useState([])
    const { data, isLoading } = useGetAllCoursesQuery({})

    const [globalFilter, setGlobalFilter] = useState<string>("");

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ratings: { value: null, matchMode: FilterMatchMode.CONTAINS },
        purchased: { value: null, matchMode: FilterMatchMode.EQUALS },
        created_at: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters: any = { ...filters };
        _filters["global"].value = value;
        setFilters(_filters);
        setGlobalFilter(value);
    };

    useEffect(() => {

        if (!isLoading) {
            const selected = data?.courses?.map((course: any) => ({
                id: course._id,
                title: course.title,
                ratings: course.ratings,
                purchased: course.purchased,
                created_at: format(course.createdAt)
            }))

            setCourses(selected)

            console.log(data)
        }

    }, [data])

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Courses</h2>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilter || ""}
                        onChange={onGlobalFilterChange}
                        placeholder="Search by Keyword"
                        className="p-inputtext-sm"
                    />
                </span>
            </div>
        );
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (

        <div className='mt-10  ' >

            <div className="p-6 bg-white rounded-xl shadow-lg">
                <DataTable
                    value={courses}
                    paginator
                    rows={5}
                    filters={filters}
                    onFilter={(e: any) => setFilters(e.filters)}
                    filterDisplay="row"
                    globalFilterFields={["_id", "title", "ratings", "createdAt", "purchased"]}
                    header={renderHeader()}
                    className="rounded-lg overflow-hidden"
                >
                    <Column field="id" header="ID" filter filterPlaceholder="Search" sortable />
                    <Column field="title" header="Course Title" filter filterPlaceholder="Search" sortable />
                    <Column field="ratings" header="Ratings" filter filterPlaceholder="Search" sortable />
                    <Column field="purchased" header="Purchased" filter filterPlaceholder="Search" sortable />
                    <Column field="created_at" header="Created At" filter filterPlaceholder="Search" sortable />
                </DataTable>
            </div>


        </div>


    )

}



const sample = () => {
    const [filters, setFilters] = useState({
        id: "",
        name: "",
        email: "",
        age: "",
    });

    const clearFilters = () => {
        setFilters({ id: "", name: "", email: "", age: "" });
    };


    const usersData: any = [
        { id: 1, title: "John Doe", ratings: "john@example.com", purchased: '0', created_at: 25, },
    ];

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    const filteredUsers = usersData.filter((user: any) => {
        return (
            (filters.id === "" || user.id.toString().includes(filters.id))
            // user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            // user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            // (filters.age === "" || user.age.toString().includes(filters.age))
        )
    });

    return (

        <div className='mt-10' >

            <div className="p-6 bg-[#121A3A] text-white rounded-2xl shadow-lg">
                <div className='flex items-center justify-between mb-5' >
                    <h2 className="text-xl font-bold mb-4">Courses</h2>
                    <button onClick={clearFilters} className="px-3 py-1.5 text-sm bg-[crimson] text-white font-bold  hover:scale-[1.05] transition-all duration-300 ease-in-out rounded-md cursor-pointer">
                        Clear Filters
                    </button>
                </div>


                <table className="w-full border-collapse rounded-lg overflow-hidden">
                    {/* Header */}
                    <thead className="">
                        <tr>
                            <th className="p-3 text-left font-semibold ">ID</th>
                            <th className="p-3 text-left font-semibold ">Name</th>
                            <th className="p-3 text-left font-semibold ">Email</th>
                            <th className="p-3 text-left font-semibold ">Age</th>
                        </tr>
                        {/* Filter row (directly below headers) */}
                        <tr className="">
                            <th className="p-2">
                                <input
                                    type="text"
                                    placeholder="Filter ID"
                                    value={filters.id}
                                    onChange={(e) => handleFilterChange("id", e.target.value)}
                                    className="w-full px-2 py-1 border rounded-md text-sm"
                                />
                            </th>
                            <th className="p-2">
                                <input
                                    type="text"
                                    placeholder="Filter Name"
                                    value={filters.name}
                                    onChange={(e) => handleFilterChange("name", e.target.value)}
                                    className="w-full px-2 py-1 border rounded-md text-sm"
                                />
                            </th>
                            <th className="p-2">
                                <input
                                    type="text"
                                    placeholder="Filter Email"
                                    value={filters.email}
                                    onChange={(e) => handleFilterChange("email", e.target.value)}
                                    className="w-full px-2 py-1 border rounded-md text-sm"
                                />
                            </th>
                            <th className="p-2">
                                <input
                                    type="text"
                                    placeholder="Filter Age"
                                    value={filters.age}
                                    onChange={(e) => handleFilterChange("age", e.target.value)}
                                    className="w-full px-2 py-1 border rounded-md text-sm"
                                />
                            </th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {filteredUsers.map((user: any) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-[#1947ff47] transition-colors"
                            >
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.age}</td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No matching course found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

