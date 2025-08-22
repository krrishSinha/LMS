import { userLoggedIn, userRegistration } from "../auth/authSlice";
import { apiSlice } from "./apiSlice";



export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        //endpoints 
        register: builder.mutation({
            query: (data)=>({
                url: '/auth/register',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({token: result.data.activationToken})
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        activation: builder.mutation({
            query: ({activationToken, activationCode })=>({
                url: '/auth/activate-user',
                method: 'POST',
                body: {activationToken,activationCode}
            })
        }),

        login: builder.mutation({
            query: ({email, password})=>({
                url: '/auth/login',
                method: 'POST',
                body: {email,password},
                credentials: 'include'
            })
        }),

        socialLogin: builder.mutation({
            query: ({email,name,avatar})=>({
                url: '/auth/social-auth',
                method: 'POST',
                body: {email,name,avatar},
                credentials: 'include'
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({accessToken:result.data?.accessToken, user: result.data?.user}))            
                } catch (error) {
                    console.log(error);
                }
            }
        }),

    })
});

export const {useRegisterMutation, useActivationMutation, useLoginMutation, useSocialLoginMutation} = authApi