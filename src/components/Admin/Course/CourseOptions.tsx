'use client'

import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";


function CourseOptions({ active, setActive }: any) {
    const options = [
        "Course Information",
        "Course Data",
        "Course Content",
        "Course Preview"
    ]

    return (
        <div>
            {options.map((option: any, index: number) => (
                <div key={index} className={`w-full flex py-5`}>
                    <div className={` flex items-center justify-center  relative`} >
                        <FaRegCheckCircle size={35} className={`${active + 1 > index ? "text-blue-500" : "text-[#384766]"}`} />
                        {index !== options.length - 1 && (
                            <div className={`absolute h-[30px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"} bottom-[-100%]`} />
                        )}
                    </div>
                    <h5 className={`pl-3 ${active === index ? "dark:text-white text-black" : "dark:text-white text-black"} text-[20px]`}>
                        {option}
                    </h5>
                </div>
            ))}
        </div>
    )
}

export default CourseOptions