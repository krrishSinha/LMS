"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useGetCourseQuery } from "@/redux/features/course/courseApi"
import React, { useEffect, useState } from "react"
import Ratings from "../Ratings"
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import CoursePlayer from "../CoursePlayer"
import { useSelector } from "react-redux"
import Link from "next/link"
import CourseSection from "./CourseSection"
import { useCreateCheckoutMutation } from "@/redux/features/enrollment/enrollmentApi";
import Image from "next/image";
import FullScreenLoader from "../Loader";
import { useParams, usePathname } from "next/navigation";

export default function CourseDetails({ id, open, setOpen, route, setRoute }: any) {
    const pathname = usePathname();
    const courseId = pathname.split("/").pop();
    // const courseId = 'fuwefehf'

    const { data, isLoading } = useGetCourseQuery(id);
    const [createCheckout, { data: checkoutData, isLoading: checkoutIsLoading, error: checkoutError }] = useCreateCheckoutMutation({});

    const { user } = useSelector((state: any) => state.auth);
    // console.log(user.enrolledCourses)

    const [course, setCourse]: any = useState([]);

    const dicountPercentenge = ((course?.estimatedPrice - course.price) / course?.estimatedPrice) * 100;

    const discountPercentengePrice = dicountPercentenge.toFixed(0);

    const isPurchased = user && user?.enrolledCourses?.some((item: any) => item._id == courseId);
    console.log(isPurchased)

    useEffect(() => {
        if (data) {
            setCourse(data?.course)
        };
    }, [data]);


    const handlePayment = async (e: any) => {
        if (!user) {
            setOpen(true);
        } else {
            const stripe: any = await loadStripe('pk_test_51S58Q0AV1iXycdESG4yZmvvJa8HUt4RooYpHpORQfycP9BbdGpzzkJvRcpRnPVpTKEIttyf44ZQPAd5rsqb2ChOR00yagl9Kob');

            const userInfo = {
                _id: user._id,
                email: user.email
            }

            const session: any = await createCheckout({ course, userInfo })

            const result: any = await stripe.redirectToCheckout({ sessionId: session.data.id });

            if (result.error) {
                console.log(result.error)
            }

        }
    }

    if (isLoading) {
        return <FullScreenLoader />
    }

    const avgRating = course?.reviews?.length > 0 ? course.reviews.reduce((acc: any, r: any) =>
        acc + r.rating, 0) / course.reviews.length : 0;


    return (

        <div className="mt-30" >

            <div className="w-[95%] md:w-[80%] mx-auto"  >

                <div className="flex flex-col-reverse  md:flex md:flex-row md:justify-between gap-5" >

                    <div className=" md:w-[70%]  " >
                        <h1 className="text-4xl font-bold" > {course.title} </h1>

                        <div className="flex items-center justify-between mt-1 " >
                            <div className="flex items-center gap-2" >
                                <Ratings rating={avgRating} />
                                {course?.reviews?.length} Reviews
                                <div> {course?.purchased} Students  </div>
                            </div>
                        </div>

                        <div className="mt-4" >
                            <h2 className="text-2xl font-bold" >What you will learn from this course?</h2>
                            {course?.benefits?.map((benifit: any, index: any) => (
                                <div key={index} className="flex items-center gap-2 mt-1     " >
                                    <span> <IoCheckmarkDoneOutline size={20} /> </span>
                                    {benifit.title}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <h2 className="text-2xl font-bold">What are the prerequisites for starting this course?</h2>
                            {course?.prerequisites?.map((prerequisite: any, index: any) => (
                                <div key={index} className="flex items-center gap-2 mt-1" >
                                    <span> <IoCheckmarkDoneOutline size={20} /> </span>
                                    {prerequisite.title}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4" >
                            <h2 className="text-2xl font-bold"  >Course Overview</h2>

                            {/* sections  */}
                            <div className="mt-2" >
                                {course?.sections?.map((section: any, index: any) => (
                                    <CourseSection key={index} section={section} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-4" >
                            <h2 className="text-2xl font-bold">Course Details</h2>
                            <p className="" > {course.description} </p>
                        </div>

                        <div className="flex items-center gap-2 mt-4" >
                            <Ratings rating={avgRating} />
                            <div className="text-xl" > {avgRating.toFixed(1)} Ratings • {course?.reviews?.length} Reviews </div>
                        </div>

                        <div className="my-4 " >
                            {course?.reviews?.length > 0 && [...course.reviews].reverse().map((review: any, index: any) => (
                                <div className="dark:bg-[#151D22] shadow rounded px-3 py-2 border border-[#00000028] dark:border-[#ffffff1d] h-max w-full" key={index} >

                                    <div className="flex justify-between" >
                                        <div className="flex  items-center gap-2" >
                                            <Image
                                                src={review.user?.avatar ? review.user?.avatar.url : '/assets/avatar.png'}
                                                alt="avatar"
                                                width={40}
                                                height={40}
                                                objectFit="contain"
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h2 className="text-sm" > {review.user?.name} </h2>
                                                <p className="text-xs "> {review.profession ? review.profession : 'Student'} </p>
                                            </div>
                                        </div>

                                        <div>
                                            <Ratings rating={review.rating ? review.rating : 5} />
                                        </div>
                                    </div>

                                    <div className="mt-4" >
                                        {review.comment ? review.comment : review.review}
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                    {/* DEMO Video div  */}
                    <div className=" relative flex-1 ">
                        <div className="w-full " >
                            <CoursePlayer videoUrl={course?.demoUrl} />

                            <div className="flex items-center gap-3" >
                                <h2 className="text-xl font-bold"> {course?.price === 0 ? "Free" : course.price + "$"} </h2>

                                <h5 className="mb-5 text-sm line-through opacity-80 ">
                                    {course?.estimatedPrice}$
                                </h5>

                                <h4 className="ml-2 text-md font-bold text-green-600">
                                    {discountPercentengePrice}% Off
                                </h4>
                            </div>

                            <div className="mt-4" >
                                {
                                    isPurchased ? (
                                        <Link href={`/course-access/${course._id}`}
                                            className="px-6 py-2 bg-[crimson] text-white  rounded-full w-fit font-bold cursor-pointer "
                                        >
                                            Enter to Course
                                        </Link>
                                    ) : (
                                        <div className="px-6 py-2 bg-[crimson] text-white rounded-full w-fit font-bold cursor-pointer " onClick={handlePayment} >
                                            Buy Now {course?.price}$
                                        </div>
                                    )
                                }
                            </div>

                            <div className="grid space-y-1 mt-4 " >
                                <p>  • Source code included </p>
                                <p>  • Full lifetime access </p>
                                <p>  • Certificate of completion </p>
                                <p >  • Premium Support </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

}