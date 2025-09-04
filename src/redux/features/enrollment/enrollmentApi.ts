import { apiSlice } from "../api/apiSlice";



export const enrollmentApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        // endpoints 
        getAllEnrollments: builder.query({
            query: ()=>({
                url: '/enrollment/get-all-enrollments',
                method: 'GET',
                credentials: 'include'
            })
        }),

    })
});


export const {useGetAllEnrollmentsQuery} = enrollmentApi