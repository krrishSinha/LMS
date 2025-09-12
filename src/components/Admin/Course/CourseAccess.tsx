'use client'

import CoursePlayer from "@/components/CoursePlayer";
import CourseSection from "@/components/Courses/CourseSection";
import { useGetCourseWithDataQuery } from "@/redux/features/course/courseApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

export default function CourseAccess() {
    const params = useParams()
    const id = params.id

    const { data, isLoading, error } = useGetCourseWithDataQuery(id)
    const { user } = useSelector((state: any) => state.auth)
    const [course, setCourse]: any = useState()
    const [active, setActive]: any = useState(0)
    const [activeSection, setActiveSection]: any = useState(0)
    const [activeVideo, setActiveVideo]: any = useState(0)

    const [comment, setComment]: any = useState('')
    const [rating, setRating]: any = useState(1)

    useEffect(() => {
        if (data) {
            setCourse(data?.course)
        }
    }, [data, id])

    if (isLoading) {
        return <div>loading...</div>
    };

    const handlePrev = () => {
        // If not the first video of the section → just go one step back
        if (activeVideo > 0) {
            setActiveVideo(activeVideo - 1);
        }
        // If first video of section and not the very first section → go to last video of previous section
        else if (activeSection > 0) {
            const prevSection = activeSection - 1;
            const lastVideoIndex = course?.sections[prevSection]?.videos?.length - 1;
            setActiveSection(prevSection);
            setActiveVideo(lastVideoIndex);
        } else {
            console.log("Already at first video!");
        }
    }

    const handleNext = () => {
        const currentSection = course?.sections[activeSection];
        const totalVideos = currentSection?.videos?.length || 0;

        // If not the last video of the section → just go forward
        if (activeVideo < totalVideos - 1) {
            setActiveVideo(activeVideo + 1);
        }
        // If last video of the section and not the very last section → go to next section’s first video
        else if (activeSection < course?.sections?.length - 1) {
            setActiveSection(activeSection + 1);
            setActiveVideo(0);
        } else {
            console.log("No more videos available!");
        }
    }

    return (
        <div className="mt-5" >

            <div className="w-[95%] md:w-[80%] mx-auto flex gap-20 justify-between " >

                {/* video section  */}
                <div className=" flex-1 " >
                    {/* video div  */}
                    <div>
                        <CoursePlayer videoUrl={course?.sections[activeSection]?.videos[activeVideo]?.videoUrl} />
                        <h2 className="text-3xl mt-5" >  {course?.sections[activeSection]?.videos[activeVideo]?.title} </h2>

                        {/* video buttons  */}
                        <div className="flex justify-between mt-4" >
                            <div className={`px-6 py-2 bg-blue-500 rounded-full flex items-center gap-2  ${activeSection === 0 && activeVideo === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} onClick={handlePrev} >
                                <span><GrFormPreviousLink size={20} /></span>
                                Prev Video
                            </div>

                            <div className={`px-6 py-2 bg-blue-500 rounded-full flex items-center gap-2 ${activeSection === course?.sections?.length - 1 &&
                                activeVideo === course?.sections[activeSection]?.videos?.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                onClick={handleNext}>
                                Next Video
                                <span><GrFormNextLink size={20} /></span>
                            </div>
                        </div>

                        <div className="flex justify-between my-5" >
                            {
                                ['Overview', 'Resources', 'Comments', 'Reviews'].map((item: any, index: any) => (
                                    <div
                                        onClick={() => setActive(index)}
                                        className={` ${active == index ? 'text-[crimson]' : ''} cursor-pointer text-xl`} > {item} </div>
                                ))
                            }
                        </div>

                        {
                            active == 0 && (
                                <div>
                                    {course?.sections[activeSection]?.videos[activeVideo]?.description}
                                </div>
                            )
                        }

                        {
                            active == 1 && (
                                <div>
                                    {course?.sections[activeSection]?.videos[activeVideo]?.links?.map((link: any, index: any) => (
                                        <div >
                                            <h2>
                                                {link.title}:
                                                <a href={link.url} className="text-blue-400" > {link.url} </a>
                                            </h2>
                                        </div>
                                    ))}
                                </div>
                            )
                        }

                        {
                            active == 2 && (
                                <div className="py-10 border-b-[0.5px] border-slate-600" >

                                    <div className="flex gap-5" >
                                        <Image
                                            src={user?.avatar?.url ? user?.avatar?.url : '/assets/avatar.png'}
                                            alt="few"
                                            className="object-contain self-start "
                                            width={50}
                                            height={50}
                                        />

                                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment"
                                            className="border border-slate-300 p-2 rounded field-sizing-content min-h-[20vh] flex-1 outline-none " />
                                    </div>

                                    <div className="flex justify-end mt-4" >
                                        <button className="px-5 py-2 bg-blue-400 rounded-full cursor-pointer" > Submit </button>
                                    </div>

                                </div>
                            )
                        }

                        {
                            active == 3 && (
                                <div className="py-10 border-b-[0.5px] border-slate-600" >

                                    <div className="flex gap-5" >
                                        <Image
                                            src={user?.avatar?.url ? user?.avatar?.url : '/assets/avatar.png'}
                                            alt="few"
                                            className="object-contain self-start "
                                            width={50}
                                            height={50}
                                        />

                                        <div className="flex-1" >
                                            <h2>Give Rating *</h2>

                                            <div className="flex" >
                                                {[1, 2, 3, 4, 5].map((i) =>
                                                    rating >= i ? (
                                                        <AiFillStar
                                                            key={i}
                                                            className="mr-1 cursor-pointer"
                                                            color="rgb(246,186,0)"
                                                            size={25}
                                                            onClick={() => setRating(i)}
                                                        />
                                                    ) : (
                                                        <AiOutlineStar
                                                            key={i}
                                                            className="mr-1 cursor-pointer"
                                                            color="rgb(246,186,0)"
                                                            size={25}
                                                            onClick={() => setRating(i)}
                                                        />
                                                    )
                                                )}
                                            </div>

                                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment"
                                                className="border border-slate-300 p-2 rounded field-sizing-content min-h-[20vh] w-full outline-none mt-2" />

                                        </div>

                                    </div>

                                    <div className="flex justify-end" >
                                        <button className="px-5 py-2 bg-blue-400 rounded-full" > Submit </button>
                                    </div>

                                </div>
                            )
                        }

                    </div>
                </div>

                {/* sections  */}
                <div className="  min-w-[20vw]" >
                    <div>
                        {
                            course?.sections.map((section: any, index: any) => (
                                <CourseSection key={index}
                                    section={section}
                                    user={user}
                                    activeSection={index}
                                    setActiveSection={setActiveSection}
                                    activeVideo={activeVideo}
                                    setActiveVideo={setActiveVideo} />
                            ))
                        }
                    </div>
                </div>

            </div>

        </div>
    )

}