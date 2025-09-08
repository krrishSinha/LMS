import { useGetLayoutByTypeQuery } from "@/redux/features/layout/layoutApi"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { MdDelete } from "react-icons/md"




export default function FAQ() {

    const { data, isSuccess, isLoading, refetch }: any = useGetLayoutByTypeQuery('faqs', { refetchOnMountOrArgChange: true })
    const [faqs, setFaqs]: any = useState([])
    const [openIndex, setOpenIndex]: any = useState(null)

    useEffect(() => {

        if (data) {
            setFaqs(data.layout.faqs)
        }


    }, [data]);

    const handleOpen = (index: any) => {
        setOpenIndex(openIndex == index ? null : index)
    };

    if (isLoading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>
            <div className="w-[90%] sm:w-[90%] md:w-[85%] mx-auto my-16 " >
                <h1 className=" text-2xl md:text-4xl text-center font-bold mb-6" >Frequently Asked Questions</h1>

                {
                    faqs.map((faq: any, index: any) => (
                        <div key={index} className='py-10 border-b-[1px] border-slate-400 ' >

                            <div className=' flex items-center gap-10 justify-between select-none cursor-pointer' onClick={() => handleOpen(index)} >
                                <p className='w-full border-none outline-none resize-none field-sizing-content' >
                                    {faq.question}
                                </p>
                                <span> <FaPlus /> </span>
                            </div>
                            {
                                openIndex == index && (
                                    <>
                                        <div className='mt-6 select-none' >
                                            <p className='w-full border-none outline-none resize-none field-sizing-content '>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    ))
                }

            </div>
        </div>
    )
}