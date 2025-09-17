'use client'
import CourseCard from '@/components/Courses/CourseCard'
import Header from '@/components/Header'
import { useGetAllCoursesQuery } from '@/redux/features/course/courseApi'
import { useGetLayoutByTypeQuery } from '@/redux/features/layout/layoutApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {

    const searchParams = useSearchParams()
    const initialTitle = searchParams.get('title')
    const { data, isLoading }: any = useGetAllCoursesQuery({})
    const { data: categoriesData, isLoading: categoriesIsLoading }: any = useGetLayoutByTypeQuery('categories')

    const [courses, setCourses]: any = useState([])
    const [category, setCategory] = useState('All')
    const [searchTitle, setSearchTitle] = useState(initialTitle)

    useEffect(() => {
        if (!data?.courses) return;

        let filtered = [...data.courses];

        if (category !== "All") {
            filtered = filtered.filter((course: any) => course.category === category);
        }

        if (searchTitle) {
            filtered = filtered.filter((course: any) =>
                course.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        }

        setCourses(filtered);
    }, [data, category, searchTitle]);

    if (isLoading && categoriesIsLoading) {
        return <div>loading...</div>
    }

    const categories = categoriesData?.layout?.categories || []
    console.log(courses)

    return (
        <div>

            <Header />

            <div className='w-[90%] sm:w-[90%] md:w-[85%] mx-auto' >

                {/* categories  */}
                <div className='flex items-center gap-3 mt-4 ' >
                    <div className={` ${category == 'All' ? 'bg-[crimson]' : 'bg-[#5050cb]'} w-fit px-3 py-2 rounded-full cursor-pointer`}
                        onClick={() => {
                            setCategory('All')
                            setSearchTitle(null)
                        }} >
                        All
                    </div>
                    {
                        categories &&
                        categories.map((item: any, index: any) => (
                            <div className={` ${category == item.title ? 'bg-[crimson]' : 'bg-[#5050cb]'} w-fit px-3 py-2 rounded-full cursor-pointer `}
                                onClick={() => {
                                    setCategory(item.title)
                                    setSearchTitle(null)
                                }}
                            >
                                {item.title}
                            </div>
                        ))
                    }
                </div>


                {/* courses  */}
                <div className="py-10" >
                    {
                        courses?.length > 0 ? (
                            <div className='grid sm:grid-cols-3 lg:grid-cols-4 gap-5' >
                                {
                                    courses.map((course: any, index: any) => (
                                        <CourseCard course={course} />
                                    ))
                                }
                            </div>
                        ) :
                            (
                                <div className='text-center font-bold' >No Course Found.</div>
                            )
                    }
                </div>


            </div>

        </div>
    )
}

