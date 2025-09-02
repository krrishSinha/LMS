'use client'

import { useGetEnrollmentsAnalyticsQuery } from "@/redux/features/analytics/analyticsApi"
import { useEffect, useState } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


export default function EnrollmentsAnalytics() {

    const { data: enrollmentsAnalyticsData, isLoading } = useGetEnrollmentsAnalyticsQuery({})

    const [data, setData] = useState([]);

    useEffect(() => {

        if (enrollmentsAnalyticsData) {
            setData(enrollmentsAnalyticsData.data)
        }

    }, [enrollmentsAnalyticsData])

    console.log(data)

    const enrollmentData = [
        { month: "Sep 2023", enrollments: 80 },
        { month: "Oct 2023", enrollments: 120 },
        { month: "Nov 2023", enrollments: 95 },
        { month: "Dec 2023", enrollments: 70 },
        { month: "Jan 2024", enrollments: 150 },
        { month: "Feb 2024", enrollments: 100 },
        { month: "Mar 2024", enrollments: 160 },
        { month: "Apr 2024", enrollments: 130 },
        { month: "May 2024", enrollments: 170 },
        { month: "Jun 2024", enrollments: 140 },
        { month: "Jul 2024", enrollments: 200 },
        { month: "Aug 2024", enrollments: 180 },
    ];

    const totalEnrollments = enrollmentData.reduce((acc, item) => acc + item.enrollments, 0);
    const highest = enrollmentData.reduce((a, b) => a.enrollments > b.enrollments ? a : b);
    const lowest = enrollmentData.reduce((a, b) => a.enrollments < b.enrollments ? a : b);


    return (
        <div>

            <div className="w-full mt-10 ">
                <h2 className="text-xl font-semibold mb-10 text-center">Enrollments (Last 12 Months)</h2>

                <div className="h-96" >
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={enrollmentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="enrollments"
                                fill="#6366f1"
                                radius={[6, 6, 0, 0]}
                                barSize={50}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className=" grid md:grid-cols-2 gap-5 " >

                    <div className="bg-[#121A3A] shadow-md rounded-xl p-6 text-center border-t-4 border-blue-500">
                        <h3 className="text-white text-sm uppercase tracking-wide">
                            Total Enrollments
                        </h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {totalEnrollments}
                        </p>
                    </div>

                    <div className="bg-[#121A3A] shadow-md rounded-xl p-6 text-center border-t-4 border-green-500">
                        <h3 className="text-white text-sm uppercase tracking-wide">
                            Peak Month
                        </h3>
                        <p className="text-lg font-semibold text-slate-400 mt-1">
                            {highest.month}
                        </p>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {highest.enrollments}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )

}