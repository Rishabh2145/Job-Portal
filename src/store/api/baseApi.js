
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API,
        credentials: 'include',
        prepareHeaders: async (headers) => {
            headers.set('Content-Type', 'application/json')
            headers.set('authorization' , `Bearer ${localStorage.getItem('token')}`)
            return headers
        },
    }),
    tagTypes:["CONTACT_UPDATE", 'JOB_UPDATE', 'UPDATE_USER', 'APPLIED_JOB', 'UPDATE_ABOUT'],
    endpoints: () => ({})
})

export const frontendApi = createApi({
    reducerPath: "frontendApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ['UPDATE_USER'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/api/auth/login",
                method: "POST",
                body,
            })
        }),
    })
});

export const { useLoginMutation } = frontendApi;


