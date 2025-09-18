import { apiSlice } from "../api/apiSlice";



export const notificationAPi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints 
        getNotifications: builder.query({
            query: () => ({
                url: '/notifications/get-all-notifications',
                method: 'GET',
                credentials: 'include'
            }),
        }),

        updateNotificationStatus: builder.mutation({
            query: (id) => ({
                url: `/notifications/update-notification-status?id=${id}`,
                method: 'POST',
                credentials: 'include'
            })
        })
    })
});


export const {useGetNotificationsQuery, useUpdateNotificationStatusMutation} = notificationAPi