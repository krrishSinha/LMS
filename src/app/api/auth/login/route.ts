import connectDB from "@/db/dbConfig";
import redis from "@/db/redis";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

    await connectDB()

    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            // const err = await ErrorHandler("Email and Password are required", 400);
            return NextResponse.json({
                success: false,
                message: 'Email and Password are required',
            });
        }

        // check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password",
                },
                { status: 401 } // 🔴 Unauthorized
            );
        }

        // check if password is correct
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password",
                },
                { status: 401 }
            );
        }

        // generate access token
        const accessToken: any = user.generateAccessToken();

        // generate refresh token
        const refreshToken: any = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save()

        // set user to redis 
        await redis.set(user._id, JSON.stringify(user))

        const acessTokenExpiry = 5 * 10 * 1000; // 5 minutes 
        const refreshTokenExpiry = 59 * 10000; //  59 minutes

        const accessTokenOptions: any = {
            httpOnly: true,
            // expires: new Date(Date.now() + acessTokenExpiry),
            // maxAge: acessTokenExpiry, // 5 minutes
            sameSite: "lax" as "lax",
        };

        const refreshTokenOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + refreshTokenExpiry),
            maxAge: refreshTokenExpiry, // 59 minutes
            sameSite: "lax" as "lax",
        };

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            user,
            accessToken
        });

        // response.cookies.set("accessToken", accessToken, accessTokenOptions);
        // response.cookies.set("refreshToken", refreshToken, refreshTokenOptions);

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 15 * 24 * 60 * 60, // 15 days in seconds
            path: "/",
        });
        // response.cookies.set("refreshToken", refreshToken);

        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: error.message || "Server error" },
            { status: 500 } // ✅ explicit status in catch
        );
    }

} 