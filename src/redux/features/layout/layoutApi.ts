import { apiSlice } from "../api/apiSlice";


export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        //endpoints 
        getHeroLayout: builder.query({
            query: (type) => ({
                url: `/layout/get-layout-by-type/${type}`,
                method: 'GET',
                credentials: 'include'
            })
        }),

        editLayout: builder.mutation({
            query: ({ type, faqData, bannerData, categoriesData }) => ({
                url: '/layout/edit-layout',
                method: 'PUT',
                body: { type, faqData, bannerData, categoriesData },
                credentials: 'include'
            })
        })

    })
});


export const { useGetHeroLayoutQuery, useEditLayoutMutation } = layoutApi