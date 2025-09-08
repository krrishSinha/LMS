import Image from "next/image";
import ReviewCard from "../ReviewCard";

export const reviews = [
    {
        name: "Gene Bates",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge university",
        comment:
            "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out E-learning!",
    },
    {
        name: "Verna Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Full stack developer | Quarter ltd.",
        comment:
            "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
    },
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "computer systems engineering student | Zimbabwe",
        comment:
            "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!"
    },
    {
        name: "Mina Davidson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:
            "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience",
    },
    {
        name: "Rosemary Smith",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        profession: "Full stack web developer | Algeria",
        comment:
            "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. for that any person had beginner-level can complete an integrated project when he watches the videos. Thank you very much. Im very excited for the next videos Keep doing this amazing work",
    },
    {
        name: "Laura Mckenzie",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "Full stack web developer | Canada",
        comment:
            "Join E-learning! E-learning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend E-learning to anyone looking to improve their programming skills and build practical projects. E-learning is a great resource that will help you take your skills to the next level.",
    },
];


export default function Reviews() {

    return (
        <div>

            <div className="w-[90%] sm:w-[90%] md:w-[85%] mx-auto py-10" >

                <div className="xl:flex items-center gap-20 " >
                    <div className=" flex justify-center ">
                        <Image
                            src={'/assets/business-img.png'}
                            alt="business-image"
                            className=""
                            objectFit="cover"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="flex-1" >
                        <h1 className="text-center text-2xl sm:text-4xl leading-10 sm:leading-14 font-bold font-josefin mb-4" >
                            Our Students Are
                            {" "}
                            <span
                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Our Strength
                            </span>{" "}
                            <br />
                            See What They Say About Us
                        </h1>

                        <p className=" text-center md:text-left" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro fugit vitae natus itaque mollitia atque quis voluptatem odit molestias quisquam repudiandae commodi pariatur ipsa molestiae necessitatibus nisi reprehenderit, amet voluptas.</p>
                    </div>
                </div>


                {/* reviews  */}
                <div className="lg:columns-2 gap-10 space-y-5 mt-12 sm:mt-10" >
                    {
                        reviews.map((review: any, index:any) => (
                          <ReviewCard key={index} review={review} />
                        ))
                    }
                </div>

            </div>

        </div>
    )

}