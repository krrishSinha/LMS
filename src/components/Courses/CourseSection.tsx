import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";



export default function CourseSection({ section }: any) {

    const [open, setOpen] = useState(null);

    const handleOpen = (id: any) => {
        setOpen(open == id ? null : id)
    }


    return (
        <div className="py-2  w-[80%] select-none" >

            <div>
                {/* Section  */}
                <div className="flex justify-between cursor-pointer " onClick={() => handleOpen(section._id)} >
                    <div>
                        <h2 className="text-xl font-semibold" > {section?.title} </h2>
                        <p className="" > {section?.videos?.length} Lessons &bull; 38 Minutes </p>
                    </div>
                    <div><FaChevronDown size={20} /></div>
                    {/* <div> <FaChevronUp size={20} /> </div> */}
                </div>

                {/* videos  */}
                {
                    open == section?._id && (
                        <div>
                            {section?.videos?.map((video: any) => (
                                <div className="flex justify-between p-3 " >
                                    <div className="flex items-center gap-2" >
                                        <MdOutlineOndemandVideo size={20} className="text-[teal]" />
                                        <h2> {video?.title} </h2>
                                    </div>

                                    <div>
                                        {/* <h2> {section?.videos?.videoLength} </h2> */}
                                        <h2> 20 Minutes </h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )
                }


            </div>

        </div>
    )


}