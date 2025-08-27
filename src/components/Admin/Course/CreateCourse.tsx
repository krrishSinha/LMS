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
      title: section.sectionTitle,
      videos: section.videos.map((video: any) => ({
        title: video.title,
        description: video.description,
        videoUrl: video.url,
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

  const handleCourseCreate = ()=>{
    const data = courseData
    console.log(data)
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
            active == 3 && <CoursePreview active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseCreate}  />
          }
        </div>

        <CourseOptions active={active} setActive={setActive} />
      </div>

    </div>
  )
}

export default CreateCourse