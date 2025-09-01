'use client'

import { useGetLayoutByTypeQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



export default function FAQ() {

    const { data, isSuccess, isLoading, refetch }: any = useGetLayoutByTypeQuery('faqs', { refetchOnMountOrArgChange: true })

    const [faqs, setFaqs]: any = useState([])

    const [openIndex, setOpenIndex]: any = useState(null)

    useEffect(() => {

        if (data) {
            setFaqs(data.layout.faqs)
        }

    }, [data, isSuccess])


    const handleOpen = (index: any) => {
        setOpenIndex(openIndex == index ? null : index)
    };

    const handleQuestionChange = (id: any, value: any) => {
        setFaqs((prevFaqs: any) =>
            prevFaqs.map((faq: any) => (faq._id == id ? { ...faq, question: value } : faq))
        )
    };

    const handleAnswerChange = (id: any, value: any) => {
        setFaqs((prevFaqs: any) =>
            prevFaqs.map((faq: any) => (faq._id == id ? { ...faq, answer: value } : faq))
        )
    };

    const handleAddFaq = () => {
        setFaqs([...faqs, {
            _id: Date.now().toString(),
            question: '',
            answer: ''
        }])
    };

    const handleDeleteFaq = (id: any) => {

        if (faqs.length > 1) {
            setFaqs((prevFaqs: any) =>
                prevFaqs.filter((faq: any) => faq._id !== id)
            )
        }

    }

    if (isLoading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>

            <div>

                {
                    faqs.map((faq: any, index: any) => (
                        <div className='py-10 border-b-[1px] border-slate-400  ' >

                            <div className='flex items-center gap-10 justify-between select-none cursor-pointer' onClick={() => handleOpen(index)} >
                                <textarea
                                    className='w-full border-none outline-none resize-none field-sizing-content  '
                                    value={faq.question}
                                    onChange={(e) => handleQuestionChange(faq._id, e.target.value)}
                                    placeholder='Enter Your Question'
                                />
                                <span> <FaPlus /> </span>
                            </div>

                            {
                                openIndex == index && (
                                    <>
                                        <div className='mt-6 select-none' >
                                            <textarea
                                                className='w-full border-none outline-none resize-none field-sizing-content '
                                                value={faq.answer}
                                                onChange={(e) => handleAnswerChange(faq._id, e.target.value)}
                                                placeholder='Enter Your Answer'
                                            />
                                        </div>
                                        <div className='mt-4 text-red-500'  >
                                            <MdDelete size={20} className='cursor-pointer' onClick={() => handleDeleteFaq(faq._id)} />
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    ))
                }

                <div className='mt-10' >
                    <FaPlus size={20} className=' cursor-pointer ' onClick={handleAddFaq} />
                </div>

            </div>


        </div>
    )
}

