"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useGetCourseQuery } from "@/redux/features/course/courseApi"
import { useEffect, useState } from "react"
import Ratings from "../Ratings"
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import ReviewCard from "../ReviewCard"
import CoursePlayer from "../CoursePlayer"
import { useSelector } from "react-redux"
import Link from "next/link"
import CourseSection from "./CourseSection"
import { useCreateCheckoutMutation } from "@/redux/features/enrollment/enrollmentApi";

export default function CourseDetails({ id }: any) {

    const { data, isLoading } = useGetCourseQuery(id);
    const [createCheckout, { data: checkoutData, isLoading: checkoutIsLoading, error: checkoutError }] = useCreateCheckoutMutation({});

    const { user } = useSelector((state: any) => state.auth);

    const [course, setCourse]: any = useState([]);

    const dicountPercentenge = ((course?.estimatedPrice - course.price) / course?.estimatedPrice) * 100;

    const discountPercentengePrice = dicountPercentenge.toFixed(0);

    const isPurchased = user && user?.enrolledCourses?.find((item: any) => item == course._id);

    useEffect(() => {
        if (data) {
            setCourse(data?.course)
        };
    }, [data]);


    const handlePayment = async (e: any) => {
        // if (user) {
        //     setOpen(true);
        //     console.log('buy now')
        // } else {
        //     setRoute("Login");
        //     // openAuthModal(true);
        // }    

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

    if (isLoading) {
        return <div>loading...</div>
    }


    return (

        <div className="mt-5" >

            <div   className="w-[95%] md:w-[80%] mx-auto"  >

                <div className="flex justify-between gap-5" >

                    <div className=" flex-1" >
                        <h1 className="text-4xl font-bold" > {course.title} </h1>

                        <div className="flex items-center justify-between mt-1 " >
                            <div className="flex items-center gap-2" >
                                <Ratings rating={course.ratings} />
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
                            <Ratings rating={course.ratings} />
                            <div className="text-xl" > {course?.ratings?.toFixed(1)} Ratings • {course?.reviews?.length} Reviews </div>
                        </div>

                        <div className="mt-4" >
                            {course?.reviews?.length > 0 && [...course.reviews].reverse().map((review: any, index: any) => (
                                <ReviewCard review={review} key={index} />
                            ))}
                        </div>

                    </div>

                    {/* DEMO Video div  */}
                    <div className=" relative">
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
                                            className="px-6 py-2 bg-[crimson] rounded-full w-fit font-bold cursor-pointer "
                                        >
                                            Enter to Course
                                        </Link>
                                    ) : (
                                        <div className="px-6 py-2 bg-[crimson] rounded-full w-fit font-bold cursor-pointer " onClick={handlePayment} >
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