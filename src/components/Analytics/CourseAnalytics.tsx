'use client'

import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


export default function CourseAnalytics() {

    const { data: courseAnalyticsData, isLoading } = useGetCoursesAnalyticsQuery({})

    const [data, setData]: any = useState([]);

    useEffect(() => {

        if (courseAnalyticsData) {
            const formatedData = courseAnalyticsData.data.map((course: any) => ({
                month: course.month,
                courses: course.count
            }))
            setData(formatedData)
        }

    }, [courseAnalyticsData])

    // const sampleData = [
    //     { month: "Sep 2023", courses: 3 },
    //     { month: "Oct 2023", courses: 7 },
    //     { month: "Nov 2023", courses: 5 },
    //     { month: "Dec 2023", courses: 2 },
    //     { month: "Jan 2024", courses: 9 },
    //     { month: "Feb 2024", courses: 4 },
    //     { month: "Mar 2024", courses: 6 },
    //     { month: "Apr 2024", courses: 3 },
    //     { month: "May 2024", courses: 8 },
    //     { month: "Jun 2024", courses: 10 },
    //     { month: "Jul 2024", courses: 7 },
    //     { month: "Aug 2024", courses: 12 },
    // ];

    let totalCourses = 0;
    let highest = { month: "-", courses: 0 };
    let lowest = { month: "-", courses: 0 };

    if (data.length > 0) {
        totalCourses = data.reduce((acc: any, item: any) => acc + item.courses, 0);
        highest = data.reduce((a: any, b: any) => (a.count > b.count ? a : b));
        lowest = data.reduce((a: any, b: any) => (a.count < b.count ? a : b));
    }

    if(isLoading){
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>

            <div className="w-full h-96 mt-10 ">
                <h2 className="text-xl font-semibold mb-10 text-center">Courses Created (Last 12 Months)</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="courses" fill="#121A3A" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 📦 Summary Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                <div className="bg-[#121A3A] shadow-md rounded-xl p-6 text-center border-t-4 border-blue-500">
                    <h3 className="text-white text-sm uppercase tracking-wide">
                        Total Courses
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                        {totalCourses}
                    </p>
                </div>

                <div className="bg-[#121A3A] shadow-md rounded-xl p-6 text-center border-t-4 border-green-500">
                    <h3 className="text-white text-sm uppercase tracking-wide">
                        Highest Month
                    </h3>
                    <p className="text-lg font-semibold text-slate-400 mt-1">
                        {highest.month}
                    </p>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {highest.courses}
                    </p>
                </div>

                <div className="bg-[#121A3A] shadow-md rounded-xl p-6 text-center border-t-4 border-red-500">
                    <h3 className="text-white text-sm uppercase tracking-wide">
                        Lowest Month
                    </h3>
                    <p className="text-lg font-semibold text-slate-400 mt-1">
                        {lowest.month}
                    </p>
                    <p className="text-3xl font-bold text-red-600 mt-2">
                        {lowest.courses}
                    </p>
                </div>
            </div>

        </div>
    )

}