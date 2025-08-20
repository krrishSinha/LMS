import { userRegistration } from "../auth/authSlice";
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

    })
});

export const {useRegisterMutation, useActivationMutation} = authApi