import ErrorHandler from "@/utils/ErrorHandler";
import { NextRequest, NextResponse, } from "next/server";
import jwt from 'jsonwebtoken';
import { User } from "@/models/user.model";
import connectDB from "@/db/dbConfig";



export async function POST(request: NextRequest) {

    await connectDB()

    try {
        // Handle GET request logic here
        const body = await request.json();

        const { activationToken, activationCode } = body;


        const decode: any = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET!);

        if (decode.activationCode !== activationCode || !decode) {
            return NextResponse.json(
                {
                    error: "Invalid activation token",
                    success: false
                },
                { status: 400 });
        }

        const existingUser = await User.findOne({ email: decode.email });

        if (existingUser) {
            return NextResponse.json(
                {
                    error: "User already exists",
                    success: false
                },
                { status: 400 });
        }

        const user = await User.create({
            name: decode.name,
            email: decode.email,
            password: decode.password,
            activationCode: activationCode
        });

        await user.save();

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });


    } catch (error: any) {
        // const res = ErrorHandler(error.messgage, 500);
        return NextResponse.json({
            success: false,
            error: error.message || "Internal Server Error"
        })
    }

}