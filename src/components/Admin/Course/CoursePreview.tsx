import CoursePlayer from '@/components/CoursePlayer'
import Ratings from '@/components/Rating';
import React from 'react'
import { IoCheckmarkDoneOutline } from "react-icons/io5";


function CoursePreview({ active, setActive, courseData, handleCourseCreate }: any) {

  const discountedPercentage = (((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100).toFixed(0);

  const createCourse = () => {
    handleCourseCreate();
  };


  return (
    <div>

      <div className='' >
        <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title} />

        <div className='flex  gap-3 mt-10 relative' >
          <p className='text-xl font-bold ' > {courseData?.price == 0 ? 'FREE' : `${courseData.price}$`} </p>
          <p className='line-through text-sm  text-[crimson] opacity-80 '  > {courseData.estimatedPrice}$ </p>
          <p className='font-bold text-xl ' > {discountedPercentage}% OFF </p>
        </div>

        <div className='bg-[crimson] rounded-full mt-6 cursor-pointer  w-fit px-4 py-2 ' >
          BUY NOW {courseData?.price}$
        </div>

        <div className='flex items-center gap-5 mt-6' >
          <input type="text" placeholder='Discount Code' className='w-full border border-zinc-200 rounded p-2 text-zinc-200' />
          <div className='bg-[#3085FF] rounded-full cursor-pointer w-fit px-4 py-2 ' >
            APPLY
          </div>
        </div>

        <div className='grid space-y-1 mt-6 ' >
          <p>&bull; Source Code Included</p>
          <p>&bull; Full lifetime Access</p>
          <p>&bull; Certification of Completion</p>
          <p>&bull; Premium Support</p>
        </div>

        <div className='mt-6' >
          <h2 className='text-2xl font-bold'  > {courseData?.title} </h2>
          <div className='mt-1 flex items-center gap-2 ' >
            <Ratings rating={0} />
            <p> 0 Reviews </p>
          </div>
        </div>

        <div className='mt-6' >
          <h2 className='text-2xl font-bold'  > What you will learn from this Course?  </h2>
          <div className='mt-2 grid space-y-1' >
            {
              courseData?.benefits.map((benefit: any) => (
                <div className='flex items-center gap-2' > <span><IoCheckmarkDoneOutline /></span> {benefit?.title} </div>
              ))
            }
          </div>
        </div>

        <div className='mt-6' >
          <h2 className='text-2xl font-bold'  > What are the Prerequisites for starting this Course?  </h2>
          <div className='mt-2 grid space-y-1' >
            {
              courseData?.prerequisites.map((prerequisite: any) => (
                <div className='flex items-center gap-2' > <span><IoCheckmarkDoneOutline /></span> {prerequisite?.title} </div>
              ))
            }
          </div>
        </div>

        <div className='mt-6' >
          <h2 className='text-2xl font-bold'  > Course Details  </h2>
          <p className='mt-2' > {courseData?.description} </p>
        </div>

        <div className='flex justify-between mt-10' >
          <div className='bg-[#37a39a] p-2 px-16 w-fit rounded-sm cursor-pointer text-white' onClick={() => setActive(active - 1)}  > Previous </div>
          <div className='bg-[#37a39a] p-2 px-16 w-fit rounded-sm cursor-pointer text-white' onClick={createCourse}  > Create </div>
        </div>

      </div>

    </div>
  )
}

export default CoursePreview