import { apiSlice } from "../api/apiSlice";


export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints 
        getCoursesAnalytics: builder.query({
            query: () => ({
                url: '/analytics/getCoursesAnalytics',
                method: 'GET',
                credentials: 'include'
            })
        }),

        getUsersAnalytics: builder.query({
            query: () => ({
                url: '/analytics/getUsersAnalytics',
                method: 'GET',
                credentials: 'include'
            })
        }),

        getEnrollmentsAnalytics: builder.query({
            query: () => ({
                url: '/analytics/getEnrollmentsAnalytics',
                method: 'GET',
                credentials: 'include'
            })
        }),

    })
});


export const {useGetCoursesAnalyticsQuery, useGetUsersAnalyticsQuery, useGetEnrollmentsAnalyticsQuery} = analyticsApi