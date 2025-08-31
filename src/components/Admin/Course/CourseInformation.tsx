import React, { useState } from 'react'
import styles from './styles'

function CourseInformation({ active, setActive, courseInfo, setCourseInfo }: any) {

  const [dragging, setDragging] = useState(false)

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0]

    console.log(file)

    if (file) {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        if (reader.readyState == 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result })
        }
      };

      reader.readAsDataURL(file)
    }
  }


  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
  }

  
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setActive(active + 1 )
  }

  return (
    <div>

      <div>
        <form onSubmit={handleSubmit} className='grid space-y-5'  >

          <div className='flex flex-col gap-2' >
            <label htmlFor="title">Course Name</label>
            <input required value={courseInfo.title} onChange={(e) => setCourseInfo({ ...courseInfo, title: e.target.value })}
              type="text" id='title' placeholder='Full Stack Development' className={styles.input} />
          </div>

          <div className='flex flex-col gap-2' >
            <label htmlFor="description">Course Description</label>
            <textarea required value={courseInfo.description} onChange={(e) => setCourseInfo({ ...courseInfo, description: e.target.value })}
              id='description' placeholder='Full Stack Development' rows={7} className={styles.input} />
          </div>

          <div className='flex justify-between gap-10 ' >
            <div className='flex flex-col gap-2 w-full ' >
              <label  htmlFor="price">Course Price</label>
              <input required value={courseInfo.price} onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                type="number" id='price' placeholder='199' className={styles.input} />
            </div>

            <div className='flex flex-col gap-2 w-full ' >
              <label htmlFor="estimatedPrice">Estimated Price (Optional)</label>
              <input value={courseInfo.estimatedPrice} onChange={(e) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                type="number" id='estimatedPrice' placeholder='99' className={styles.input} />
            </div>
          </div>

          <div className='flex flex-col gap-2' >
            <label htmlFor="tags">Course Tags</label>
            <input required value={courseInfo.tags} onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
              id='tags' placeholder='MERN,React,Next,Full Stack' className={styles.input} />
          </div>

          <div className='flex justify-between gap-10 ' >
            <div className='flex flex-col gap-2 w-full ' >
              <label htmlFor="level">Course Level</label>
              <input required value={courseInfo.level} onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                type="text" id='level' placeholder='Beginner' className={styles.input} />
            </div>

            <div className='flex flex-col gap-2 w-full ' >
              <label htmlFor="demoUrl">Demo Url</label>
              <input value={courseInfo.demoUrl} onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                type="text" id='demoUrl' placeholder='https://localhost:3000' className={styles.input} />
            </div>
          </div>

          <div className='w-full min-h-[30vh]  '  >
            <input type="file" accept='image/*' className='hidden' id='file' onChange={handleFileChange} />
            <label 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              htmlFor="file" className='h-full w-full flex items-center justify-center border rounded-sm border-zinc-300 p-2'>
              {
                courseInfo.thumbnail ? (
                  <img src={courseInfo.thumbnail?.url ? courseInfo.thumbnail?.url : courseInfo.thumbnail } alt="eew" className='h-full w-full object-cover' />
                ) : (
                  <span>Drag and drop your thumbnail or click here to browse</span>
                )
              }
            </label>
          </div>

          <div className='flex justify-end' >
            <input type="submit" value="Next" className='bg-[#37a39a] p-2 px-20 w-fit rounded-sm text-white cursor-pointer ' />
          </div>

        </form>
      </div>

    </div>
  )
}

export default CourseInformation