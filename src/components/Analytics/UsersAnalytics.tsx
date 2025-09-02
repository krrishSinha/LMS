'use client'

import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi"
import { useEffect, useState } from "react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


export default function UsersAnalytics() {

    const { data: usersAnalyticsData, isLoading } = useGetUsersAnalyticsQuery({})

    const [data, setData]: any = useState([]);

    useEffect(() => {

        if (usersAnalyticsData) {

            const formatedData = usersAnalyticsData.data.map((user: any) => ({
                month: user.month,
                users: user.count
            }))

            setData(formatedData)
        }

    }, [usersAnalyticsData, isLoading])

    // sample data 
    // const userData = [
    //     { month: "Sep 2023", users: 120 },
    //     { month: "Oct 2023", users: 200 },
    //     { month: "Nov 2023", users: 150 },
    //     { month: "Dec 2023", users: 180 },
    //     { month: "Jan 2024", users: 220 },
    //     { month: "Feb 2024", users: 170 },
    //     { month: "Mar 2024", users: 260 },
    //     { month: "Apr 2024", users: 300 },
    //     { month: "May 2024", users: 250 },
    //     { month: "Jun 2024", users: 320 },
    //     { month: "Jul 2024", users: 280 },
    //     { month: "Aug 2024", users: 350 },
    // ];

    let totalUsers = 0;
    let highest = { month: "-", users: 0 };
    let lowest = { month: "-", users: 0 };

    if (data.length > 0) {
        totalUsers = data.reduce((acc: number, item: any) => acc + item.users, 0);
        highest = data.reduce((a: any, b: any) => (a.users > b.users ? a : b));
        lowest = data.reduce((a: any, b: any) => (a.users < b.users ? a : b));
    }

    if (isLoading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>

            <div className="w-full mt-10 ">
                <h2 className="text-xl font-semibold mb-10 text-center">Users Created (Last 12 Months)</h2>

                <div className="h-96" >
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#colorUsers)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>




                <div className="mt-10 grid md:grid-cols-2 gap-5 " >
                    <div className="bg-[#121A3A] shadow-md rounded-xl p-6 text-center border-t-4 border-blue-500">
                        <h3 className="text-white text-sm uppercase tracking-wide">
                            Total Users
                        </h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {totalUsers}
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
                            {highest.users}
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )

}