import { apiSlice } from "../api/apiSlice";



export const authApi = apiSlice.injectEndpoints({
    //   endpoints 
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: '/user/update-avatar',
                method: 'POST',
                body: avatar,
                credentials: 'include'
            }),
            invalidatesTags: ['LoadUser']
        }),
        editInfo: builder.mutation({
            query: ({ name }) => ({
                url: '/user/update-info',
                method: 'PUT',
                body: { name },
                credentials: 'include'
            }),
            invalidatesTags: ['LoadUser']
        }),
        changePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: '/user/update-password',
                method: 'POST',
                body: { oldPassword, newPassword },
                credentials: 'include'
            }),
            invalidatesTags: ['LoadUser']
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/user/get-all-users',
                method: 'GET',
                credentials: 'include'
            }),
        }),
    })
});

export const { useUpdateAvatarMutation, useEditInfoMutation, useChangePasswordMutation, useGetAllUsersQuery } = authApi