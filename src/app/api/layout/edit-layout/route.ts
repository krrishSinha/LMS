import connectDB from "@/db/dbConfig";
import { Layout } from "@/models";
import { destroyImageFromCloudinary, uploadToCloudinary } from "@/utils/Cloudinary";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(request: NextRequest) {

    await connectDB()

    try {

        const { type, faqData, bannerData, categoriesData } = await request.json()

        const layout = await Layout.findOne({ type })

        if (!layout) {
            return NextResponse.json({
                success: false,
                message: `${type} is not exists.`
            })
        };

        if (type == 'Banner') {

            // delete previous banner image from cloudinary
            // const deletedImageResult  = await destroyImageFromCloudinary(layout.image.public_id)

            // upload new banner image into cloudinary 
            // const imageResult: any = await uploadToCloudinary(bannerData.image, 'Layout')

            layout.banner.image = {
                public_id: bannerData.image.public_id,
                url: bannerData.image.url
            }

            layout.banner.title = bannerData.title,
                layout.banner.description = bannerData.description

            await layout.save()

            return NextResponse.json({
                success: true,
                message: `${type} is updated `,
                layout
            })

        };

        if (type == 'faqs') {

            layout.faqs = faqData
            await layout.save()

            return NextResponse.json({
                success: true,
                message: `${type} is updated`,
                layout
            })
        };

        if (type == 'Categories') {

            layout.categories = categoriesData
            await layout.save()

            return NextResponse.json({
                success: true,
                message: `${type} is updated`,
                layout
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