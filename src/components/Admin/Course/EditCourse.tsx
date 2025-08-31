'use client'
import React, { useEffect, useRef, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import CourseOptions from './CourseOptions'
import { useGetAllCoursesWithDataQuery, useUpdateCourseMutation } from '@/redux/features/course/courseApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

export default function EditCourse({ id }: any) {
    const { data, isLoading, isSuccess, error } = useGetAllCoursesWithDataQuery({})
    const [updateCourse, { data: updateCourseData, isSuccess: updateCourseIsSuccess, isLoading: updateCourseIsLoading, error: updateCourseError }] = useUpdateCourseMutation({})

    const [active, setActive] = useState(0)

    const [courseInfo, setCourseInfo]:any = useState({
        title: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "",
        demoUrl: "",
        thumbnail: "",
    });

    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

    const [sections, setSections]: any = useState([
        {
            sectionTitle: 'Untitled Section',
            videos: []
        }
    ]);

    const [courseData, setCourseData] = useState();

    const handleCourseSubmit = () => {

        // format= benefits array
        const formatedBenefits = benefits.map((benefit) => ({
            title: benefit.title
        }));

        // format prerequisites array
        const formatedPrerequisites = prerequisites.map((prerequisite) => ({
            title: prerequisite.title
        }));

        // format sections array 
        const formatedSections = sections.map((section: any) => ({
            title: section.title,
            videos: section.videos.map((video: any) => ({
                title: video.title,
                description: video.description,
                videoUrl: video.videoUrl,
                links: video.links.map((link: any) => ({
                    title: link.title,
                    url: link.url
                })),
                videolength: '',
                videoPlayer: '',
                suggestions: '',
            }))
        }));

        // prepare our course data 
        const data: any = {
            title: courseInfo.title,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            categories: courseInfo.categories,
            thumbnail: courseInfo.thumbnail,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            benefits: formatedBenefits,
            prerequisites: formatedPrerequisites,
            sections: formatedSections,
        }

        setCourseData(data)
        setActive(active + 1);

    }

    const toastId: any = useRef(null); // store toast id

    useEffect(() => {

        if (isLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading('please wait...')
            }
        }

        if (isSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }

            const selectedCourse = data?.courses.filter((course: any) => course._id == id)

            setCourseInfo({
                title: selectedCourse[0].title,
                description: selectedCourse[0].description,
                price: selectedCourse[0].price,
                estimatedPrice: selectedCourse[0].estimatedPrice,
                tags: selectedCourse[0].tags,
                level: selectedCourse[0].level,
                categories: selectedCourse[0].categories,
                demoUrl: selectedCourse[0].demoUrl,
                thumbnail: {
                    public_id: selectedCourse[0].thumbnail?.public_id,
                    url: selectedCourse[0].thumbnail?.url,
                },
            });

            setBenefits(selectedCourse[0].benefits)

            setPrerequisites(selectedCourse[0].prerequisites)

            setSections(selectedCourse[0].sections)
        }

        if (error) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            const errorData = error as any
            toast.error(errorData.data.message)
        }

    }, [isLoading, isSuccess, error, data]);

    useEffect(() => {
        if (updateCourseIsLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading('please wait...')
            }
        }

        if (updateCourseIsSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success('Course Updated ✔')
            console.log(updateCourseData)
            redirect('/admin/courses');
        }

        if (updateCourseError) {
            if (toastId.current) {
                toast.dismiss(toastId.current)
                toastId.current = null
            }
            toast.success('Error')
            console.log(updateCourseError)
        }
    }, [updateCourseData, updateCourseIsSuccess, updateCourseIsLoading, updateCourseError])


    const handleCourseCreate = async () => {
        const data = courseData
        console.log(data)
        await updateCourse({ data, courseId:id })
    }

    return (
        <div className=''>

            <div className='grid grid-cols-4 gap-20  mt-5' >

                <div className='col-span-3' >
                    {
                        active == 0 && <CourseInformation active={active} setActive={setActive} courseInfo={courseInfo} setCourseInfo={setCourseInfo} />
                    }

                    {
                        active == 1 && <CourseData active={active} setActive={setActive} benefits={benefits} setBenefits={setBenefits} prerequisites={prerequisites} setPrerequisites={setPrerequisites} />
                    }

                    {
                        active == 2 && <CourseContent active={active} setActive={setActive} sections={sections} setSections={setSections} handleCourseSubmit={handleCourseSubmit} />
                    }

                    {
                        active == 3 && <CoursePreview active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseCreate} />
                    }
                </div>

                <CourseOptions active={active} setActive={setActive} />
            </div>

        </div>
    )
}
