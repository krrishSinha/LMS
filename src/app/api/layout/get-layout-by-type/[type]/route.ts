import connectDB from "@/db/dbConfig";
import { Layout } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: any) {

    await connectDB()

    const { type } = await params;

    try {

        const layout = await Layout.findOne({ type });

        if (!layout) {
            return NextResponse.json({
                success: false,
                message: `${type} is not exists`
            })
        };

        return NextResponse.json({
            success: true,
            layout
        })

    } catch (error) {
        console.log('error in get layout by type');
        return NextResponse.json({
            success: false,
            message: error
        })
    }

}