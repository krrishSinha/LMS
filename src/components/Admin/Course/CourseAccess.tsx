'use client'

import CoursePlayer from "@/components/CoursePlayer";
import { useGetCourseWithDataQuery } from "@/redux/features/course/courseApi";
import { useEffect, useState } from "react";


export default function CourseAccess({id, user}:any){

    const {data, isLoading, error }  =  useGetCourseWithDataQuery(id)
    const [course, setCourse]:any = useState()


    useEffect(()=>{
        if(data){
            setCourse(data?.course)
        }
    },[course])

    console.log(course)

    if(isLoading){
        return <div>loading...</div>
    };


    return (
        <div className="mt-5" >

            <div className="w-[95%] md:w-[80%] mx-auto flex  " >

                {/* video section  */}
                <div className="border-2 border-red-400 flex-1" >
                    {/* video div  */}
                    <div>
                        <CoursePlayer videoUrl={ course?.sections[0]?.videos[0]?.videoUrl } /> 
                        <h2 className="" >  {course?.title} </h2>

                        <div className="flex justify-between" >
                            {
                                ['Overview', 'Resources', 'Q&A', 'Reviews'].map((item:any,index:any)=>(
                                    <div  > {item} </div>
                                ))
                            }
                        </div>

                    </div>
                </div>

                {/* sections  */}
                <div className="border border-blue-600 min-w-[20vw] " >
                </div>
                                
            </div>

        </div>
    )

}