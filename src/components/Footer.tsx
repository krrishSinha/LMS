import Link from "next/link";



export default function Footer(){

    return (
        <div className="border-t-2 " >
            <div className="w-[90%] sm:w-[90%] md:w-[85%] mx-auto pt-10 pb-3 " >

                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 " >

                    <div className="grid space-y-2" >
                        <h2 className=" font-[600]" >About</h2>
                        <Link href={'#'} className="text-sm w-fit dark:dark:text-gray-300" >Out Story</Link>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300">Privacy Policy</Link>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300">FAQ</Link>
                    </div>

                    <div className="grid space-y-2" >
                        <h2 className=" font-[600]" >Quick Links</h2>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300" >Courses</Link>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300">My Account</Link>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300">Course Dashboard</Link>
                    </div>

                    <div className="grid space-y-2" >
                        <h2 className=" font-[600]" >Social Links</h2>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300 " > Youtube  </Link>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300">Instagram</Link>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300">Github</Link>
                    </div>

                    <div className="grid space-y-2" >
                        <h2 className=" font-[600]" >Contact Info</h2>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300" >Call Us: 1-885-665-2022 </Link>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300"> Address: +7011 Vermont Ave, Los Angeles, CA 90044 </Link>
                        <Link href={'#'} className="text-sm w-fit dark:text-gray-300">Mail Us: hello@elearning.com</Link>
                    </div>

                </div>

                <div className="text-center mt-10 text-sm" >  
                    Copyright &copy; 2025 ELearning | All Rights Reserved
                </div>
                


            </div>
        </div>
    )

}