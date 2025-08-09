import redis from "@/db/redis";
import { getAuthenticatedUser } from "@/helpers/getAuthenticatedUser";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {

        const userId: any = await getAuthenticatedUser(request)

        const { avatar } = await request.json()

        const user = await User.findById(userId)

        // if user have already avatar then destroy previous public_id
        if (user.avatar?.public_id) {

            // await cloudinary.v2.uploader.destroy(avatar,{
            //     folder: 'avatars',
            //     width: 150,
            // })

            // const myCloud = await  cloudinary.v2.uploader.upload(avatar, {
            //     folder: 'avatars',
            //     width: 150,
            // })

            // user.avatar = {
            //     public_id: myCloud.public_id,
            //     url: myCloud.secure_url
            // }

        } else {

            // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            //     folder: 'avatars',
            //     width: 150,
            // });

            // user.avatar = {
            //     public_id: myCloud.public_id,
            //     url: myCloud.secure_url
            // }

        }

        await user.save()
        await redis.set(userId, JSON.stringify(user))

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