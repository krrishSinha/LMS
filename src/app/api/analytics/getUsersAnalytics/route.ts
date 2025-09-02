import connectDB from "@/db/dbConfig";
import { User } from "@/models";
import { generateLast12MonthsData } from "@/utils/analytics.generator";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    await connectDB()

    try {

        const usersAnalytics = await generateLast12MonthsData(User)

        return NextResponse.json(
            {
                success: true,
                data: usersAnalytics
            },
            { status: 200 }
        )


    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message: error
            },
            { status: 500 }
        )
    }

}