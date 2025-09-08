'use client'

import CourseDetails from '@/components/Courses/CourseDetails'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { useState } from 'react'


export default  function page({ params }: any){

    const {id} =   params

    const [open, setOpen] = useState(false)
    const [activeIem, setActiveItem] = useState(0)
    const [route, setRoute] = useState('Login')

    return (
        <div>

            <div>
                <Header open={open} setOpen={setOpen} activeItem={activeIem} route={route} setRoute={setRoute} />

                <CourseDetails id={id}  />

                <Footer />

            </div>


        </div>
    )
}
