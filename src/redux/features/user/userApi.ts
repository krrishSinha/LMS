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
            providesTags: ['getAllUsers'],
        }),
        updateUserRole: builder.mutation({
            query: ({ email, role }) => ({
                url: '/user/update-user-role',
                method: 'PUT',
                body: { email, role },
                credentials: 'include'
            }),
            invalidatesTags: ['getAllUsers']
        }),
        deleteUser: builder.mutation({
            query: ({email}) => ({
                url: '/user/delete-user',
                method: 'DELETE',
                body: { email },
                credentials: 'include'
            }),
            invalidatesTags: ['getAllUsers']
        }),
    })
});

export const { useUpdateAvatarMutation, useEditInfoMutation, useChangePasswordMutation, useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } = authApi