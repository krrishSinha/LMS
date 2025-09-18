'use client'

import CoursePlayer from "@/components/CoursePlayer";
import CourseSection from "@/components/Courses/CourseSection";
import { useAddReplyInReviewMutation, useAddReviewMutation, useGetCourseWithDataQuery } from "@/redux/features/course/courseApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { useAddCommentMutation, useAddReplyInCommentMutation } from "@/redux/features/video/videoApi";
import { format } from "timeago.js";
import { FaRegMessage } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

export default function CourseAccess() {
    const params = useParams()
    const id = params.id
    const { user } = useSelector((state: any) => state.auth);

    const { data, isLoading, error, refetch } = useGetCourseWithDataQuery(id)

    const [addComment, { data: addCommentData, error: addCommentError }]: any = useAddCommentMutation({})
    const [addReplyInComment, { data: addReplyData }]: any = useAddReplyInCommentMutation({})

    const [addReview, { data: addReviewData }]: any = useAddReviewMutation({})
    const [addReplyInReview, { data: addReplyInReviewData }]: any = useAddReplyInReviewMutation({})

    const [course, setCourse]: any = useState()
    const [active, setActive]: any = useState(0)
    const [activeSection, setActiveSection]: any = useState(0)
    const [activeVideo, setActiveVideo]: any = useState(0)

    const [comment, setComment]: any = useState('')
    const [reply, setReply]: any = useState('')
    const [replyActive, setReplyActive] = useState(false)

    const [review, setReview]: any = useState('')
    const [rating, setRating]: any = useState(1)
    const [reviewReplyActive, setReviewReplyActive] = useState(false);
    const [reviewReply, setReviewReply] = useState('')

    useEffect(() => {
        if (data) {
            setCourse(data?.course)
            console.log(data)
        }
    }, [data, id])

    useEffect(() => {
        if (addCommentData) {
            setCourse(addCommentData?.course)
        };

        if (addReplyData) {
            setCourse(addReplyData?.course)
        };

        if (addReviewData) {
            refetch()
        };

        if (addReplyInReview) {
            refetch()
        }

    }, [addCommentData, addReplyData, addReviewData, addReplyInReview])

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
    };


    const handleComment = async () => {
        const sectionId = course?.sections[activeSection]._id
        const videoId = course?.sections[activeSection]?.videos[activeVideo]._id
        await addComment({ comment, courseId: id, sectionId, videoId })
        setComment('')
    };

    const handleReply = async (commentId: any) => {
        const sectionId = course?.sections[activeSection]._id
        const videoId = course?.sections[activeSection]?.videos[activeVideo]._id
        await addReplyInComment({ reply, courseId: id, sectionId, videoId, commentId })
    };

    const handleReview = async () => {
        await addReview({ rating, review, courseId: id })
    };

    const handleReplyReview = async (reviewId: any) => {
        await addReplyInReview({ reviewReply, courseId: id, reviewId });
    }

    return (
        <div className="mt-30 mb-10" >

            <div className="w-[95%] md:w-[80%] mx-auto md:flex md:gap-20 md:justify-between" >

                {/* video section  */}
                <div className=" flex-1 mb-5" >
                    {/* video div  */}
                    <div>
                        <CoursePlayer videoUrl={course?.sections[activeSection]?.videos[activeVideo]?.videoUrl} />
                        <h2 className="text-3xl mt-5" >  {course?.sections[activeSection]?.videos[activeVideo]?.title} </h2>

                        {/* video buttons  */}
                        <div className="flex justify-between mt-4" >
                            <div className={`px-6 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2  ${activeSection === 0 && activeVideo === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} onClick={handlePrev} >
                                <span><GrFormPreviousLink size={20} /></span>
                                Prev Video
                            </div>

                            <div className={`px-6 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2 ${activeSection === course?.sections?.length - 1 &&
                                activeVideo === course?.sections[activeSection]?.videos?.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                onClick={handleNext}>
                                Next Video
                                <span><GrFormNextLink size={20} /></span>
                            </div>
                        </div>

                        <div className="flex justify-between my-5 gap-4" >
                            {
                                ['Overview', 'Resources', 'Comments', 'Reviews'].map((item: any, index: any) => (
                                    <div
                                        onClick={() => setActive(index)}
                                        className={` ${active == index ? 'text-[crimson]' : ''} cursor-pointer md:text-xl`} > {item} </div>
                                ))
                            }
                        </div>

                        {/* Video Description */}
                        {
                            active == 0 && (
                                <div>
                                    {course?.sections[activeSection]?.videos[activeVideo]?.description}
                                </div>
                            )
                        }

                        {/* Video Resouces  */}
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

                        {/* Video Comments  */}
                        {
                            active == 2 && (
                                <div className="py-5 md:py-10 " >

                                    <div className="flex gap-5 border-b-[0.5px] " >
                                        <Image
                                            src={user?.avatar?.url ? user?.avatar?.url : '/assets/avatar.png'}
                                            alt="few"
                                            className="object-contain self-start "
                                            width={30}
                                            height={30}
                                        />

                                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment"
                                            className="border border-slate-300 p-2 rounded field-sizing-content min-h-[20vh] flex-1 outline-none " />
                                    </div>

                                    <div className="flex justify-end mt-4" >
                                        <button className="px-5 py-2 bg-blue-400 text-white rounded-full cursor-pointer" onClick={handleComment} > Submit </button>
                                    </div>

                                    <div className="w-[100%] mt-5 h-[1px] bg-slate-600 " ></div>

                                    {/* all comments  */}
                                    <div className="mt-5 " >
                                        {
                                            course?.sections[activeSection]?.videos[activeVideo]?.comments?.map((comment: any, index: any) => (
                                                <div className="flex gap-3" >

                                                    <div>
                                                        <Image
                                                            src={comment?.user?.avatar ? comment?.user?.avatar.url : '/assets/avatar.png'}
                                                            alt="ef"
                                                            width={30}
                                                            height={30}
                                                            className="bg-contain"
                                                        />
                                                    </div>

                                                    <div className="  w-full" >
                                                        <div className="text-xl font-bold" > {comment.user?.name} </div>
                                                        <div className="dark:text-slate-300 text-gray-700 "  > {comment.comment} </div>
                                                        <small className="dark:text-slate-300 text-gray-700"> {format(comment.createdAt)}• </small>
                                                        <div onClick={() => setReplyActive(!replyActive)} className="cursor-pointer mt-1 flex items-center gap-2 " >
                                                            <span>
                                                                {!replyActive ? comment.replies.length !== 0 ? 'All Replies' : 'Add Reply' : 'Hide Replies'}
                                                            </span>
                                                            <span>
                                                                <FaRegMessage size={15} />
                                                            </span>
                                                            <span> {comment.replies?.length} </span>
                                                        </div>

                                                        {
                                                            replyActive &&
                                                            <div className="mt-2 w-full " >
                                                                {comment.replies?.map((reply: any, index: any) => (
                                                                    <div className="flex gap-2 py-2 " >
                                                                        <div>
                                                                            <Image
                                                                                src={reply?.user?.avatar ? reply?.user?.avatar.url : '/assets/avatar.png'}
                                                                                alt="ef"
                                                                                width={30}
                                                                                height={30}
                                                                                className="bg-contain"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <div className="flex items-center gap-2" >
                                                                                {reply.user?.name}
                                                                                <span> {reply.user?.role == 'admin' && <MdVerified size={15} className="text-blue-500" />} </span>
                                                                            </div>
                                                                            <div> {reply.reply} </div>
                                                                            <div> {format(reply.createdAt)}• </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <div className=" w-full flex justify-between gap-3 mt-2" >
                                                                    <input
                                                                        value={reply}
                                                                        onChange={(e) => setReply(e.target.value)}
                                                                        type="text"
                                                                        placeholder="Enter Your Reply..." className="flex-1 outline-none border-b-2 border-slate-200" />
                                                                    <button className="cursor-pointer" onClick={() => handleReply(comment._id)} > Submit </button>
                                                                </div>
                                                            </div>
                                                        }


                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            )
                        }

                        {/* Video Reviews  */}
                        {
                            active == 3 && (
                                <div className=" py-5 md:py-10" >
                                    {
                                        !course?.reviews?.some((review: any) => review.user?._id == user._id) && (
                                            <div className="pb-5 border-b-[0.5px] border-slate-600" >

                                                <div className="flex gap-5" >
                                                    <Image
                                                        src={user?.avatar?.url ? user?.avatar?.url : '/assets/avatar.png'}
                                                        alt="few"
                                                        className="object-contain self-start "
                                                        width={50}
                                                        height={50}
                                                    />

                                                    <div className="flex-1" >
                                                        <h2>Give Course Review *</h2>

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

                                                        <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Enter your Review"
                                                            className="border border-slate-300 p-2 rounded field-sizing-content min-h-[20vh] w-full outline-none mt-2" />

                                                    </div>

                                                </div>

                                                <div className="flex justify-end" >
                                                    <button className="px-5 py-2 bg-blue-400 text-white rounded-full" onClick={handleReview} > Submit </button>
                                                </div>

                                            </div>
                                        )
                                    }


                                    {/* all reviews  */}
                                    <div>
                                        {
                                            course?.reviews?.map((review: any) => (
                                                <div className="flex gap-3 py-4 " >

                                                    <div>
                                                        <Image
                                                            src={review?.user?.avatar ? review?.user?.avatar.url : '/assets/avatar.png'}
                                                            alt="ef"
                                                            width={30}
                                                            height={30}
                                                            className="bg-contain"
                                                        />
                                                    </div>

                                                    <div className="  w-full  " >
                                                        <div className="text-xl font-bold" > {review.user?.name} </div>

                                                        <div className="flex gap-1" >
                                                            {[1, 2, 3, 4, 5].map((i) =>
                                                                review.rating >= i ? (
                                                                    <AiFillStar
                                                                        key={i}
                                                                        className="mr-1"
                                                                        color="rgb(246,186,0)"
                                                                        size={25}
                                                                    />
                                                                ) : (
                                                                    <AiOutlineStar
                                                                        key={i}
                                                                        className="mr-1 "
                                                                        color="rgb(246,186,0)"
                                                                        size={25}
                                                                    />
                                                                )
                                                            )}
                                                        </div>

                                                        <div className="dark:text-slate-300 text-gray-700"  > {review.review} </div>
                                                        <small className="dark:text-slate-300 text-gray-700" > {format(review.createdAt)}•  </small>

                                                        {
                                                            !review.reply &&
                                                            <>
                                                                {/* add reply  */}
                                                                <div className="mt-1" onClick={() => setReviewReplyActive(!reviewReplyActive)} > Add Reply </div>

                                                                {
                                                                    reviewReplyActive &&
                                                                    <div className=" flex justify-between gap-3 mt-2" >
                                                                        <input className="flex-1 border-b border-b-slate-300 outline-none "
                                                                            value={reviewReply}
                                                                            onChange={(e) => setReviewReply(e.target.value)}
                                                                            type="text" placeholder="Enter your Reply..." />
                                                                        <button onClick={() => handleReplyReview(review._id)} >Submit</button>
                                                                    </div>
                                                                }
                                                            </>
                                                        }

                                                        {/* review reply  */}
                                                        {
                                                            review.reply &&
                                                            <div className="flex gap-2 mt-2" >

                                                                <div>
                                                                    <Image
                                                                        src={review?.replyBy?.avatar ? review?.replyBy?.avatar.url : '/assets/avatar.png'}
                                                                        alt="ef"
                                                                        width={30}
                                                                        height={30}
                                                                        className="bg-contain"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <div className="flex items-center gap-2" >
                                                                        {review.replyBy?.name}
                                                                        <span> {review.replyBy?.role == 'admin' && <MdVerified size={15} className="text-blue-500" />} </span>
                                                                    </div>
                                                                    <div> {review.reply} </div>
                                                                    <div> {format(review.createdAt)}• </div>
                                                                </div>

                                                            </div>
                                                        }

                                                    </div>

                                                </div>
                                            ))
                                        }
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

        </div >
    )

}