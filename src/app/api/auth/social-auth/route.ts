import connectDB from "@/db/dbConfig";
import redis from "@/db/redis";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    await connectDB()
    try {
        const { email, name, avatar } = await request.json()
        console.log(email, name)

        const user = await User.findOne({ email })

        // check if user already exists
        if (user) {
            const accessToken = await user.generateAccessToken()
            await redis.set(user._id, JSON.stringify(user))
            const response = NextResponse.json(
                {
                    success: true,
                    message: "Login Successfully...",
                    user,
                    accessToken
                },
                { status: 201 }
            )
            response.cookies.set("accessToken", accessToken);
            return response
        }

        const newUser = await User.create({
            email,
            name,
            avatar,
            isVerified: true
        });

        await newUser.save()
        await redis.set(newUser._id, JSON.stringify(newUser))

        const accessToken = await newUser.generateAccessToken()

        const response = NextResponse.json(
            {
                success: true,
                message: "Congrats, Login Successfully",
                newUser,
                accessToken
            },
            { status: 201 }
        );

        response.cookies.set("accessToken", accessToken);
        return response

    } catch (error: any) {
        console.log('error in social auth');
        return NextResponse.json(
            {
                success: true,
                message: error.message
            },
            { status: 400 }
        )

    }

}