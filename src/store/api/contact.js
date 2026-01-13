import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        contact: builder.mutation({
            query: ({ firstName, lastName, email, message, messageTo }) => ({
                url: '/contact',
                method: "POST",
                body: {
                    firstName,
                    lastName,
                    email,
                    message,
                    messageTo
                }
            }),
            invalidatesTags: ['CONTACT_UPDATE']
        }),
        delContact: builder.mutation({
            query: ({ id }) => ({
                url: '/contact/delete',
                method: 'POST',
                body: {
                    id
                }
            }),
            invalidatesTags: ["CONTACT_UPDATE"]
        }),
        jobMessage: builder.query({
            query: () => '/job/message',
            providesTags: ['CONTACT_UPDATE']
        }),
    })
})

const getContactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContact: builder.query({
            query: () => '/message',
            providesTags: ['CONTACT_UPDATE']
        })

    })
})

export const { useContactMutation, useDelContactMutation, useJobMessageQuery } = contactApi
export const { useGetContactQuery } = getContactApi