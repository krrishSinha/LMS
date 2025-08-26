import React from 'react'
import styles from './styles'
import { IoIosAddCircleOutline } from "react-icons/io";
import toast from 'react-hot-toast';


function CourseData({ active, setActive, benefits, setBenefits, prerequisites, setPrerequisites }: any) {

  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };


  const handlePrerequisitesChange = (index: any, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value
    setPrerequisites(updatedPrerequisites)
  }

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: '' }])
  }

  const prevButton = () => {
    setActive(active - 1);
  }

  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
      setActive(active + 1);
    } else{
        toast.error("Please fill the fields for go to next!")
    }
  };

  return (
    <div>

      <div className='grid space-y-5' >

        <div className='flex flex-col gap-2' >
          <label htmlFor=""> What are the Benefits for this course?  </label>
          {
            benefits.map((benefit: any, index: any) => (
              <input required value={benefit.title} onChange={(e: any) => handleBenefitChange(index, e.target.value)}
                key={index} type="text" className={styles.input} placeholder='You will be able to build a full stack LMS Platform...' />
            ))
          }
          <div>
            <IoIosAddCircleOutline size={25} className='cursor-pointer' onClick={handleAddBenefit} />
          </div>
        </div>

        <div className='flex flex-col gap-2' >
          <label htmlFor=""> What are the prerequisite for this course?  </label>
          {
            prerequisites.map((prerequisite: any, index: any) => (
              <input required value={prerequisite.title} onChange={(e: any) => handlePrerequisitesChange(index, e.target.value)}
                key={index} type="text" className={styles.input} placeholder='You need basic knowledge of MERN stack' />
            ))
          }
          <div>
            <IoIosAddCircleOutline size={25} className='cursor-pointer' onClick={handleAddPrerequisites} />
          </div>
        </div>

        <div className='flex justify-between' >
          <div className='bg-[#37a39a] p-2 px-16 w-fit rounded-sm cursor-pointer text-white' onClick={prevButton} > Previous </div>
          <div className='bg-[#37a39a] p-2 px-16 w-fit rounded-sm cursor-pointer text-white' onClick={handleOptions} > Next </div>
        </div>

      </div>

    </div>
  )
}

export default CourseData