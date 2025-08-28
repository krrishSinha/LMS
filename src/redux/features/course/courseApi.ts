import { apiSlice } from "../api/apiSlice";



export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints 
        createCourse: builder.mutation({
            query: (data) => ({
                url: '/course/add-course',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),

        getAllCourses: builder.query({
            query: () => ({
                url: '/course/get-all-courses',
                method: 'GET',
                credentials: 'include'
            })
        })
    })
});


export const { useCreateCourseMutation, useGetAllCoursesQuery } = courseApi