'use client'

import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi"
import { useEffect, useState } from "react";
import CourseCard from "../Courses/CourseCard";
import FullScreenLoader from "../Loader";
import { useSelector } from "react-redux";


export default function Courses() {

    const { data, isLoading } = useGetAllCoursesQuery({});
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        if (data) {
            setCourses(data?.courses)
        }

    }, [data])

    if (isLoading) {
        return (
            <FullScreenLoader />
        )
    }


    return (
        <div>

            <div className="w-[90%] sm:w-[90%] md:w-[85%] mx-auto pt-20 md:pt-10 lg:pt-2  "  >

                <h1 className="text-center text-2xl sm:text-4xl leading-10 sm:leading-14 font-bold font-josefin " >
                    Expand Your Career
                    {" "}
                    <span
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Opportunity
                    </span>{" "}
                    <br />
                    Opportunity With Our Courses
                </h1>

                <div className=" py-10 grid sm:grid-cols-3 lg:grid-cols-4 gap-5 " >
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