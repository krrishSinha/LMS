import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {

    try {

        const { courseData } = await request.json();

        console.log(courseData)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: courseData.map((course: any) => ({
                price_data: {
                    currency: "usd",
                    product_data: { name: course.title },
                    unit_amount: Math.round(course.price * 100),
                },
                quantity: course.quantity,
            })),
            success_url: `http://localhost:3000`,
            cancel_url: `http://localhost:3000`,
        });

        return NextResponse.json(
            {
                success: true,
                id: session.id
            },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

}