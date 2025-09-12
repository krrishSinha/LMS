import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CoursePlayer({ videoUrl, title }: any) {

    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    })

    useEffect(() => {

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/video/generate-videoUrl`, {
            videoId: videoUrl,
        }).then((res) => {
            setVideoData(res.data)
        })

    }, [videoUrl])


    return (
        <div className='relative w-full pb-[56.25%]' >

            {
                videoData.otp && videoData.playbackInfo !== '' && (
                    <iframe src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=pu13VWUeVzR2QZkT`}
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen={true} allow="encrypted-media" ></iframe>
                )
            }

        </div >
    )
}
