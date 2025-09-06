import React from 'react'
import UsersAnalytics from '../Analytics/UsersAnalytics'
import EnrollmentsAnalytics from '../Analytics/EnrollmentsAnalytics'
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa6";
import Invoice from './Invoices/Invoice';



export default function Dashboard() {
    return (
        <div className='' >

            <div className='flex gap-10 items-center ' >
                <UsersAnalytics isDashboard={true} />

                <div className='flex flex-col gap-10' >
                    <div className='flex items-center justify-between bg-[#121A3A] py-5 px-4 min-w-[300px] rounded ' >
                        <div className='grid space-y-2' >
                            <GoGraph size={20} className='text-[cyan] ' />
                            <p className='font-bold' >120</p>
                            <p className='text-lg text-[cyan]' >Sales Obtained</p>
                        </div>
                        <div className='grid space-y-2 justify-center' >
                            <div className="w-10 h-10 rounded-full border-4 border-blue-500"></div>
                            <div>+120%</div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between bg-[#121A3A] py-5 px-4 min-w-[300px] rounded ' >
                        <div className='grid space-y-2' >
                            <FaUsers size={20} className='text-[cyan] ' />
                            <p className='font-bold' >450</p>
                            <p className='text-lg text-[cyan]' >New Users</p>
                        </div>
                        <div className='grid space-y-2 justify-center' >
                            <div className="w-10 h-10 rounded-full border-4 border-blue-500"></div>
                            <div>+150%</div>
                        </div>
                    </div>
                </div>
            </div>


            <EnrollmentsAnalytics isDashboard={true} />

            <div>
                <h2 className="text-xl font-semibold mb-10 text-center">
                    Recent Transactions
                </h2>
                <Invoice isDashboard={true} />
            </div>

        </div>
    )
}
