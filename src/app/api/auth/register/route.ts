import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import { createToken } from "@/utils/createToken";
import sendEmail from "@/utils/sendMail";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await connectDB()
    try {
        // Handle GET request logic here
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

        const activationToken = await createToken(email, activationCode)

        try {

            await sendEmail(email, activationCode);
            console.log("Activation email sent successfully");

            return NextResponse.json({
                success: true,
                message: "Activation email sent successfully. Please check your inbox.",
                activationToken
            });

        } catch (error) {
            console.log("Error creating activation token:", error);
            process.exit(1);
        }




    } catch (error) {

    }
}