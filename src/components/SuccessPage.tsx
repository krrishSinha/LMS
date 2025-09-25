"use client";

import { useCreateEnrollmentMutation, useGetPaymentInfoQuery } from "@/redux/features/enrollment/enrollmentApi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage({ sessionId }: { sessionId?: string }) {
  const [payment, setPayment] = useState<any>(null);

  // fetch payment info from your API
  const { data: paymentInfoData } = useGetPaymentInfoQuery(sessionId);

  // enrollment mutation
  const [createEnrollment] = useCreateEnrollmentMutation();

  useEffect(() => {
    if (sessionId && paymentInfoData) {
      const createEnrollmentHandler = async () => {
        const userId = paymentInfoData?.metadata?.userId;
        const courseId = paymentInfoData?.metadata?.courseId;

        await createEnrollment({ userId, courseId, payment_info: paymentInfoData });
      };

      setPayment(paymentInfoData);
      createEnrollmentHandler();
    }
  }, [sessionId, paymentInfoData, createEnrollment]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Payment Success ✅</h1>
      {payment ? (
        <div className="mt-4">
          <p><b>Payment ID:</b> {payment.id}</p>
          <p><b>Status:</b> {payment.payment_status}</p>
          <p><b>Amount Paid:</b> ${payment.amount_total / 100}</p>
          <p><b>Email:</b> {payment.customer_details.email}</p>
          <Link
            href={`/course-access/${paymentInfoData?.metadata?.courseId}`}
            className="text-blue-500 underline"
          >
            Enter Course
          </Link>
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}
