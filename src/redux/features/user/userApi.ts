import { apiSlice } from "../api/apiSlice";



export const authApi = apiSlice.injectEndpoints({
    //   endpoints 
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar)=>({
                url: '/user/update-avatar',
                method: 'POST',
                body: avatar,
                credentials: 'include'
            }),
            invalidatesTags: ['LoadUser']
        })
    })
});

export const {useUpdateAvatarMutation } = authApi