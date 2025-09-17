import Image from "next/image";
import Ratings from "./Ratings";


export default function ReviewCard({ review }: any) {

    return (
        <div className="dark:bg-[#151D22] shadow rounded px-3 py-2 border border-[#00000028] dark:border-[#ffffff1d] h-max w-full" >

            <div className="flex justify-between" >
                <div className="flex  items-center gap-2" >
                    <Image
                        src={review.avatar}
                        alt="avatar"
                        width={40}
                        height={40}
                        objectFit="contain"
                        className="rounded-full"
                    />
                    <div>
                        <h2 className="text-sm" > {review.name} </h2>
                        <p className="text-xs text-[#ffffffab]"> {review.profession} </p>
                    </div>
                </div>

                <div>
                    <Ratings rating={review.rating ? review.rating : 5} />
                </div>
            </div>

            <div className="mt-4" >
                {review.comment}
            </div>

        </div>
    )
}