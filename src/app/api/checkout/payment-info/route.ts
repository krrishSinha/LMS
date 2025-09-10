
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
        return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["payment_intent", "customer"],
    });

    return NextResponse.json(session);
}