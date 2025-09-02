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

        if (type == 'banner') {

            let imageData = layout.banner.image;

            if (!bannerData.image.startsWith('http')) {

                // delete previous banner image from cloudinary
                await destroyImageFromCloudinary(layout.banner.image.public_id)

                // upload new banner image into cloudinary 
                const imageResult: any = await uploadToCloudinary(bannerData.image, 'Layout')

                imageData = {
                    public_id: imageResult.public_id,
                    url: imageResult.url
                }

            };

            const updatedBanner = await Layout.findByIdAndUpdate(
                layout._id,
                {
                    $set: {
                        banner: {
                            image: imageData,
                            title: bannerData.title,
                            description: bannerData.description
                        }
                    }
                },
                { new: true }
            )

            return NextResponse.json({
                success: true,
                message: `${type} is updated `,
                updatedBanner
            })

        };

        if (type == 'faqs') {

            const cleanFaqs = faqData.map((faq: any) => ({
                question: faq.question,
                answer: faq.answer
            }));

            const updatedFaqs = await Layout.findByIdAndUpdate(
                layout._id,
                {
                    $set: {
                        faqs: cleanFaqs
                    }
                },
                { new: true }
            );

            return NextResponse.json({
                success: true,
                message: `${type} is updated`,
                updatedFaqs
            })
        };

        if (type == 'categories') {

            const cleanCategories = categoriesData.map((category: any) => ({
                title: category.title,
            }));

            const updatedCategories = await Layout.findByIdAndUpdate(
                layout._id,
                {
                    $set: {
                        categories: cleanCategories
                    }
                },
                { new: true }
            )

            return NextResponse.json({
                success: true,
                message: `${type} is updated`,
                updatedCategories
            })
        }

    } catch (error: any) {
        // console.log(error);
        return NextResponse.json({
            success: false,
            message: error
        })
    }

}