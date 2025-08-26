'use client'
import React, { useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import CourseOptions from './CourseOptions'

function CreateCourse() {
  const [active, setActive] = useState(0)
  
  const [courseInfo, setCourseInfo] = useState({
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

  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);


  const [courseData, setCourseData] = useState({});


  return (
    <div className=''>

      <div className='grid grid-cols-4 gap-20  mt-5' >

        <div className='col-span-3' >
          {
            active == 0 && <CourseInformation active={active} setActive={setActive} courseInfo={courseInfo} setCourseInfo={setCourseInfo}  />
          }

          {
            active == 1 && <CourseData active={active} setActive={setActive} benefits={benefits} setBenefits={setBenefits} prerequisites={prerequisites} setPrerequisites={setPrerequisites} />     
          }

          {
            active == 2 && <CourseContent />
          }

          {
            active == 3 && <CoursePreview />
          }
        </div>

        <CourseOptions active={active} setActive={setActive} />
      </div>

    </div>
  )
}

export default CreateCourse