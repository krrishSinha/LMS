import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import { createToken } from "@/utils/createToken";
import ErrorHandler from "@/utils/ErrorHandler";
import sendEmail from "@/utils/sendMail";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await connectDB()

    try {
        const body = await request.json();

        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const user = {
            name,
            email,
            password,
            activationCode,
        }

        const activationToken = await createToken({user});

        try {

            await sendEmail(email, activationCode);

            return NextResponse.json({
                success: true,
                message: "Activation email sent successfully. Please check your inbox.",
                activationToken
            });

        } catch (error: any) {
            // const res = ErrorHandler(error.messgage, 500);
            return NextResponse.json({
                success: false,
                error: "Failed to send activation email. Please try again later."
            });
        }




    } catch (error: any) {
        // const res = ErrorHandler(error.messgage, 500);
        return NextResponse.json({
            error: error.message || "Internal Server Error",
            success: false
        })
    }
}