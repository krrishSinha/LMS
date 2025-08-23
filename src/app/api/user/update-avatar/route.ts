import redis from "@/db/redis";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { destroyImageFromCloudinary, uploadToCloudinary } from "@/utils/Cloudinary";
import connectDB from "@/db/dbConfig";


export async function POST(request: NextRequest) {

    await connectDB()

    try {

        const userId: any = request.headers.get('userId');

        const { avatar } = await request.json()

        const user = await User.findById(userId)

        // if user have already avatar then destroy previous public_id
        if (user.avatar?.public_id) {

            await destroyImageFromCloudinary(user.avatar.public_id)

            const myCloud: any = await uploadToCloudinary(avatar, 'avatars')

            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }

        } else {

            const myCloud: any = await uploadToCloudinary(avatar, 'avatars')

            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }

        }

        await user.save()
        await redis.set(JSON.stringify(userId), JSON.stringify(user))

        return NextResponse.json({
            success: true,
            message: 'Avatar Updated...',
            user
        })

    } catch (error: any) {
        console.log('error in updating avatar');
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}