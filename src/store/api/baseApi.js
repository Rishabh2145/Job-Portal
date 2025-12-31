import { removeInfo } from '@/app/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithAuth = async (agr, api, extraOptions) => {
    const result = await baseQuery(agr, api, extraOptions)
    console.log(result)
    if (result.error) {
        removeInfo()
        window.location.href = '/login'
    }
    return result
}

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    endpoints: () => ({})
})