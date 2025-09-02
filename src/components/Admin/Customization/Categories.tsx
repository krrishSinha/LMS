'use client'

import { useEditLayoutMutation, useGetLayoutByTypeQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useRef, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import toast from 'react-hot-toast';



export default function Categories() {

    const { data, isLoading,  refetch }: any = useGetLayoutByTypeQuery('categories', { refetchOnMountOrArgChange: true });
    const [editLayout, { data: editLayoutData, isSuccess: editLayoutIsSuccess, isLoading: editLayoutIsLoading, error }] = useEditLayoutMutation({})
    const toastId = useRef<string | null>(null);


    const [categories, setCategories]: any = useState([])


    useEffect(() => {

        if (data) {
            setCategories(data?.layout?.categories)
        };

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

    }, [data, editLayoutData, editLayoutIsSuccess, editLayoutIsLoading])

    const handleCategoriesChange = (id: any, value: any) => {
        setCategories((prevCategories: any) =>
            prevCategories.map((category: any) => (category._id == id ? { ...category, title: value } : category))
        )
    };

    const newCategoriesHandler = () => {
        if (categories[categories.length - 1].title === "") {
            toast.error("Category title cannot be empty");
        } else {
            setCategories([...categories, {
                _id: Date.now().toString(),
                title: '',
            }])
        }
    };

    const handleDeleteCategory = (id: any) => {
        if (categories.length > 1) {
            setCategories((prevCategory: any) =>
                prevCategory.filter((category: any) => category._id !== id)
            )
        }
    };

    const areCategoriesUnchanged: any = (originalCategories: any, newCategories: any) => {
        return JSON.stringify(originalCategories) == JSON.stringify(newCategories)
    };

    const isAnyCategoryEmpty = (category: any) => {
        return categories.some((category: any) => category.title == '')
    };

    const handleEdit = async () => {
        if (!areCategoriesUnchanged(data.layout.categories, categories) && !isAnyCategoryEmpty(categories)) {
            await editLayout({
                type: 'categories',
                categoriesData: categories
            })
        }
    };

    if(isLoading){
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>

            <div className='text-center mt-10'  >

                <h2 className='text-3xl font-bold' >Categories</h2>

                <div className='mt-5 flex flex-col items-center ' >

                    {
                        categories.map((category: any) => (
                            <div className='py-4 px-2 flex items-center gap-10 ' >

                                <textarea name="" id=""
                                    value={category.title}
                                    onChange={(e) => handleCategoriesChange(category._id, e.target.value)}
                                    className=' resize-none field-sizing-content border-none outline-none '
                                    placeholder='Enter Category'
                                ></textarea>

                                <div>
                                    <MdDelete size={20} className='cursor-pointer' onClick={() => handleDeleteCategory(category._id)} />
                                </div>
                            </div>
                        ))
                    }

                    <div className='mt-5' >
                        <FaPlus size={20} className='cursor-pointer' onClick={newCategoriesHandler} />
                    </div>

                </div>

                <div className={`px-10 py-1
                             ${areCategoriesUnchanged(data.layout.categories, categories) || isAnyCategoryEmpty(categories)
                        ? "!cursor-pointer  bg-slate-600 opacity-50"
                        : "bg-[crimson] font-bold cursor-pointer"
                    }
                        !rounded absolute bottom-2 md:bottom-12 right-12`}
                    onClick={areCategoriesUnchanged(data.layout.categories, categories) || isAnyCategoryEmpty(categories)
                        ? () => null
                        : handleEdit
                    }
                >
                    Save
                </div>

            </div>

        </div>
    )
}

