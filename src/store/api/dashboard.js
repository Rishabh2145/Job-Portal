import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => '/dashboard/show/category'
        }),
        getCompany: builder.query({
            query: () => '/dashboard/show/company'
        }),
        getCadidate: builder.query({
            query: () => '/dashboard/show/candidate'
        })
    })
})

export const { useGetCategoryQuery, useGetCadidateQuery, useGetCompanyQuery } = dashboardApi