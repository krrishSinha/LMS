'use client'

import { useEditLayoutMutation, useGetLayoutByTypeQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



export default function FAQ() {

    const { data, isSuccess, isLoading, refetch }: any = useGetLayoutByTypeQuery('faqs', { refetchOnMountOrArgChange: true })
    const [editLayout, { data: editLayoutData, isSuccess: editLayoutIsSuccess, isLoading: editLayoutIsLoading, error }] = useEditLayoutMutation({})

    const toastId = useRef<string | null>(null);

    const [faqs, setFaqs]: any = useState([])

    const [openIndex, setOpenIndex]: any = useState(null)

    useEffect(() => {

        if (data) {
            setFaqs(data.layout.faqs)
        }

        if (editLayoutIsLoading) {
            if (!toastId.current) {
                toastId.current = toast.loading("please wait...");
            }
        }

        if (editLayoutIsSuccess) {
            if (toastId.current) {
                toast.dismiss(toastId.current);
                toastId.current = null;
            }
            toast.success("FAQS Updated ✅");
            refetch()
        }

    }, [data, isSuccess, editLayoutData, editLayoutIsSuccess, editLayoutIsLoading])

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
    };

    const areFaqsUnchanged: any = (originalFaqs: any, newFaqs: any) => {
        return JSON.stringify(originalFaqs) == JSON.stringify(newFaqs)
    };

    const isAnyFaqsEmpty = (faqs: any) => {
        return faqs.some((faq: any) => faq.question == '' || faq.answer == '')
    };

    const handleEdit = async () => {
        if (!areFaqsUnchanged(data.layout.faqs, faqs) && !isAnyFaqsEmpty(faqs)) {
            await editLayout({
                type: 'faqs',
                faqData: faqs
            })
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
                                    required
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
                                                required
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

            <div className={`px-10 py-1
                             ${areFaqsUnchanged(data.layout.faqs, faqs) || isAnyFaqsEmpty(faqs)
                    ? "!cursor-pointer  bg-slate-600 opacity-50"
                    : "bg-[crimson] font-bold cursor-pointer"
                }
                        !rounded absolute bottom-2 md:bottom-12 right-12`}
                onClick={areFaqsUnchanged(data.layout.faqs, faqs) || isAnyFaqsEmpty(faqs)
                    ? () => null
                    : handleEdit
                }
            >
                Save
            </div>


        </div>
    )
}

