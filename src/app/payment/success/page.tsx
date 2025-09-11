"use client";
import { useCreateEnrollmentMutation, useGetPaymentInfoQuery } from "@/redux/features/enrollment/enrollmentApi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");
    const [payment, setPayment] = useState<any>(null);
    const { data: paymentInfoData } = useGetPaymentInfoQuery(session_id)
    const [createEnrollment, { data: enrollmentData, isLoading, error, isSuccess }] = useCreateEnrollmentMutation()


    useEffect(() => {

        const createEnrollmentHandler = async (userId: any, courseId: any, payment_info: any) => {
            const result = await createEnrollment({ userId, courseId, payment_info })
            console.log(result)
        }

        if (session_id && paymentInfoData) {
            setPayment(paymentInfoData);
            const userId = paymentInfoData?.metadata?.userId
            const courseId = paymentInfoData?.metadata?.courseId
            const payment_info = paymentInfoData
            createEnrollmentHandler(userId, courseId, payment_info)
        }

    }, [session_id, paymentInfoData]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Payment Success ✅</h1>
            {payment ? (
                <div className="mt-4">
                    <p><b>Payment ID:</b> {payment.id}</p>
                    <p><b>Status:</b> {payment.payment_status}</p>
                    <p><b>Amount Paid:</b> ${payment.amount_total / 100}</p>
                    <p><b>Email:</b> {payment.customer_details.email}</p>
                    <Link href={`/course-access/${paymentInfoData?.metadata?.courseId}`} >
                        Enter Course
                    </Link>
                </div>
            ) : (
                <p>Loading payment details...</p>
            )}
        </div>
    );
}
