'use client'

import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi"
import { useEffect, useState } from "react";
import CourseCard from "../Courses/CourseCard";


export default function Courses() {

    const { data, isLoading } = useGetAllCoursesQuery({});
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        if (data) {
            console.log(data?.courses)
            setCourses(data?.courses)
        }

    }, [data])

    if (isLoading) {
        return (
            <div>loading...</div>
        )
    }


    return (
        <div>

            <div className="w-[90%] sm:w-[90%] md:w-[85%] mx-auto py-10 md:py-10 lg:py-2  "  >

                <h1 className="text-center text-2xl sm:text-4xl leading-14 font-bold font-josefin " >
                    Expand Your Career
                    {" "}
                    <span
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Opportunity
                    </span>{" "}
                    <br />
                    Opportunity With Our Courses
                </h1>

                <div className=" py-10 grid grid-cols-4 gap-5 " >
                    {
                        courses.length > 0 && courses.map((course: any, index: any) => (
                            <CourseCard key={index} course={course} />
                        ))
                    }

                </div>

            </div>

        </div>
    )

}