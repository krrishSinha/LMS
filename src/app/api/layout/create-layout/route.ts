import connectDB from "@/db/dbConfig";
import { Layout } from "@/models";
import { uploadToCloudinary } from "@/utils/Cloudinary";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

    await connectDB()

    try {

        const { type, faqData, bannerData, categoriesData } = await request.json()

        const isTypeExist = await Layout.findOne({ type })

        if (isTypeExist) {
            return NextResponse.json({
                success: false,
                message: `${type} is already exists.`
            })
        };

        if (type == 'banner') {
            const imageResult: any = await uploadToCloudinary(bannerData.image, 'Layout')

            const banner = await Layout.create({
                type,
                banner: {
                    image: {
                        public_id: imageResult?.public_id,
                        url: imageResult?.url
                    },
                    title: bannerData.title,
                    description: bannerData.description
                }
            })

            return NextResponse.json({
                success: true,
                message: `${type} is created`,
                banner
            })
        };

        if (type == 'faqs') {

            const faqs = await Layout.create({
                type,
                faqs: faqData
            })

            return NextResponse.json({
                success: true,
                message: `${type} is created`,
                faqs
            })
        };

        if (type == 'categories') {

            const categories = await Layout.create({
                type,
                categories: categoriesData
            })

            return NextResponse.json({
                success: true,
                message: `${type} is created`,
                categories
            })
        }

    } catch (error: any) {
        console.log('error in creating layout');
        return NextResponse.json({
            success: false,
            message: error
        })
    }

}