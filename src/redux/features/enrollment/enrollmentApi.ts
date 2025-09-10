import { apiSlice } from "../api/apiSlice";



export const enrollmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints 
        getAllEnrollments: builder.query({
            query: () => ({
                url: '/enrollment/get-all-enrollments',
                method: 'GET',
                credentials: 'include'
            })
        }),

        createCheckout: builder.mutation({
            query: ({ course, userInfo }) => ({
                url: `/checkout`,
                body: { course, userInfo },
                method: 'POST',
                credentials: 'include'
            })
        }),

        getPaymentInfo: builder.query({
            query: (session_id) => ({
                url: `/checkout/payment-info?session_id=${session_id}`,
                method: 'GET',
                credentials: 'include'
            })
        }),

        createEnrollment: builder.mutation({
            query: ({ userId, courseId, payment_info }) => ({
                url: `/enrollment/create-enrollment?userId=${userId}&courseId=${courseId}`,
                method: 'POST',
                body: { payment_info },
                credentials: 'include'
            })
        })


    })
});


export const { useGetAllEnrollmentsQuery, useCreateCheckoutMutation, useGetPaymentInfoQuery, useCreateEnrollmentMutation } = enrollmentApi