import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        contact: builder.mutation({
            query: ({ firstName, lastName, email, message }) => ({
                url: '/contact',
                method: "POST",
                body: {
                    firstName,
                    lastName,
                    email,
                    message
                }
            })
        })
    })
})

const getContactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContact: builder.query({
            query: () => '/message'
        })
    })
})

export const { useContactMutation } = contactApi
export const { useGetContactQuery } = getContactApi