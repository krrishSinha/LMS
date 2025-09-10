import { NextRequest, NextResponse } from "next/server"
import { Course, Enrollment, Notification, User } from "@/models";
import connectDB from "@/db/dbConfig";



export async function POST(request: NextRequest) {

    await connectDB()

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    const { payment_info }: any = await request.json()

    try {

        const user = await User.findById(userId)

        const alreadyEnrolled = user?.enrolledCourses.some(
            (course: any) => course._id.toString() === courseId
        );

        if (alreadyEnrolled) {
            return NextResponse.json(
                { success: false, message: 'You Have Already Purchased this Course!' },
                { status: 400 }
            );
        };

        const course = await Course.findById(courseId);

        if (!course) {
            return NextResponse.json(
                { success: false, message: 'Course not found!' },
                { status: 400 }
            );
        };

        user?.enrolledCourses.push(course?._id);

        const data: any = {
            courseId: course._id,
            userId: user._id,
            payment_info,
        };

        await user?.save();

        await Notification.create({
            userId: user?._id,
            title: "New Order",
            message: `You have a new order from ${course?.name}`,
        });

        course.purchased = course.purchased + 1;

        await course.save();

        const newEnrollment = await Enrollment.create(data);

        //     // const mailData = {
        //     //     order: {
        //     //         _id: course._id.toString().slice(0, 6),
        //     //         name: course.name,
        //     //         price: course.price,
        //     //         date: new Date().toLocaleDateString("en-US", {
        //     //             year: "numeric",
        //     //             month: "long",
        //     //             day: "numeric",
        //     //         }),
        //     //     },
        //     // };

        //     // const html = await ejs.renderFile(
        //     //     path.join(__dirname, "../mails/order-confirmation.ejs"),
        //     //     { order: mailData }
        //     // );

        //     // try {
        //     //     if (user) {
        //     //         await sendMail({
        //     //             email: user.email,
        //     //             subject: "Order Confirmation",
        //     //             template: "order-confirmation.ejs",
        //     //             data: mailData,
        //     //         });
        //     //     }
        //     // } catch (error: any) {
        //     //      return NextResponse.json(
        //     //         { success: false, message: '!' },
        //     //         { status: 400 }
        //     //     );
        //     // }


        return NextResponse.json(
            {
                success: true,
                newEnrollment
            },
            { status: 200 }
        )


    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                message: error
            },
            { status: 400 }
        )
    }

}
