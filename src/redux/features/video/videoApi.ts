import { apiSlice } from "../api/apiSlice";



export const videoApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        // endpoints 
        addComment: builder.mutation({
            query: ({comment, courseId, sectionId, videoId})=> ({
                url: `/video/add-comment`,
                method: 'PUT',
                body: {comment, courseId, sectionId, videoId},
                credentials: 'include'
            })
        }),

        addReplyInComment: builder.mutation({
            query: ({reply, courseId, sectionId, videoId, commentId})=> ({
                url: `/video/add-comment-reply`,
                method: 'PUT',
                body: {reply, courseId, sectionId, videoId, commentId},
                credentials: 'include'
            })
        }),
        
    })
});



export const {useAddCommentMutation, useAddReplyInCommentMutation} = videoApi