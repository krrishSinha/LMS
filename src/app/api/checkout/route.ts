import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(request: NextRequest) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { course, userInfo } = await request.json();

    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: course.title },
                        unit_amount: Math.round(course.price * 100),
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId: userInfo._id,
                email: userInfo.email,
                courseId: course._id
            },
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
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