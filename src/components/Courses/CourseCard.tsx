import Image from "next/image";
import Link from "next/link";
import Ratings from "../Ratings";
import { AiOutlineUnorderedList } from "react-icons/ai";



export default function CourseCard({ course, isProfile }: any) {

    return (
        <Link href={!isProfile ? `course/${course._id}` : `course-access/${course._id}`} >

            <div className="p-2  dark:bg-[#1A202A] rounded border border-slate-200 shadow dark:border-slate-800  " >
                <Image
                    // src={course?.thumbnail?.url}
                    src={course?.thumbnail?.url ? course?.thumbnail?.url : 'https://courses.tutorialswebsite.com/assets/front/img/category/reactjs-banner.jpeg'}
                    alt="course-image"
                    width={500}
                    height={300}
                    objectFit="contain"
                    className="rounded w-full"
                />

                <div className="grid space-y-1 mt-4" >
                    <h1 className="font-Poppins text-[16px] text-black dark:text-[#fff]">
                        {course?.title}
                    </h1>

                    <div className="flex items-center justify-between" >
                        <Ratings rating={5} />
                        <h5
                            className={`text-black dark:text-[#fff] ${isProfile && "hidden 800px:inline"
                                }`}
                        >
                            {course.purchased} Students
                        </h5>
                    </div>

                    <div className="flex items-center justify-between" >

                        <div className="flex">
                            <h3 className="text-black dark:text-[#fff]">
                                {course.price === 0 ? "Free" : course.price + "$"}
                            </h3>
                            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
                                {course.estimatedPrice}$
                            </h5>
                        </div>

                        <div className="flex items-center pb-3">
                            <AiOutlineUnorderedList size={20} />
                            <h5 className="pl-2 text-black dark:text-[#fff]">
                                {course.sections?.length} Modules
                            </h5>
                        </div>
                    </div>

                </div>

            </div>

        </Link>
    )

}