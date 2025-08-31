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
            }),
            providesTags: ['getAllCourses']
        }),

        getAllCoursesWithData: builder.query({
            query: () => ({
                url: '/course/get-all-courses-data',
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['getAllCoursesWithData']
        }),

        updateCourse: builder.mutation({
            query: ({ courseId, data }) => ({
                url: `/course/edit-course`,
                method: 'POST',
                body: { data, courseId },
                credentials: 'include'
            }),
            invalidatesTags: ['getAllCoursesWithData']
        }),

        deleteCourse: builder.mutation({
            query: ({ courseId }) => ({
                url: '/course/delete-course',
                method: 'DELETE',
                body: { courseId },
                courseIdcredentials: 'include'
            }),
            invalidatesTags: ['getAllCourses']
        })
    })
});


export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useGetAllCoursesWithDataQuery, useUpdateCourseMutation } = courseApi