import connectDB from "@/db/dbConfig";
import { Course, Enrollment, Notification, User } from "@/models";
import sendEmail, { sendNewEnrollmentMail } from "@/utils/sendMail";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    await connectDB()

    try {
        const userId = request.headers.get('userId')
        const userEmail: any = request.headers.get('userEmail')

        const { courseId, paymentInfo } = await request.json()

        // check if user already enrolled in course
        const user: any = await User.findById(userId).populate('enrolledCourses').select('-password')

        const isUserAlreadyEnrolled = user.enrolledCourses.find((course: any) => {
            return course._id == courseId
        })

        if (isUserAlreadyEnrolled) {
            return NextResponse.json({
                success: false,
                message: 'User Already enrolled in this course'
            })
        };

        // check course available or not
        const course: any = await Course.findById(courseId)

        if (!course) {
            return NextResponse.json({
                success: false,
                message: 'Course not found'
            })
        }

        // save new enrollment in Enrollemnt Model 
        const newEnrollment = await Enrollment.create({
            userId,
            courseId,
            purchasedAt: Date.now(),
            payment_info: paymentInfo
        })

        // send Conformation mail to User 
        const mailResult = await sendNewEnrollmentMail(userEmail, course?.title)

        // update the New Enrollment in User model
        const UpdatedUser = await User.findByIdAndUpdate(userId,
            {
                $push: { enrolledCourses: courseId }
            },
            { new: true }).select('-password')

        // Create entry in Notification Model
         await Notification.create({
            title: 'New Enrollemnt',
            message: `You have a new Enrollemnt from ${UpdatedUser.name}`,
            userId
        })

        return NextResponse.json({
            success: true,
            user: UpdatedUser,
            course,
            newEnrollment,
        })

    } catch (error: any) {
        console.log('error in purchasee course');
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}