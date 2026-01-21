import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        user: builder.query({
            query: () => '/user/profile',
            providesTags: ['UPDATE_USER']
        }),
        subscribe : builder.mutation({
            query: ({email}) => ({
                url: '/subscribe',
                method: 'POST',
                body: {
                    email
                }
            })
        }),
        review : builder.mutation({
            query : ({name, star, title, email, desc}) => ({
                url: '/dashboard/review',
                method: 'POST',
                body:{
                    name,
                    star,
                    title,
                    email,
                    desc
                }
            })
        }),
        getReview : builder.query({
            query: () => '/dashboard/show/review'
        })
    })
})

const editUser = baseApi.injectEndpoints({
    endpoints: (builders) => ({
        editUser: builders.mutation({
            query: ({id, fullName, email, contact, mobile, institute, instituteGrade, school, schoolGrade, address}) => ({
                url: '/dashboard/edit',
                method: 'POST',
                body: {
                    id,
                    fullName,
                    email,
                    contact,
                    mobile,
                    institute,
                    instituteGrade,
                    school,
                    schoolGrade,
                    address
                }
            }),
            invalidatesTags: ['UPDATE_USER']
        })
    })
})

export const { useUserQuery, useSubscribeMutation, useReviewMutation, useGetReviewQuery } = userApi
export const { useEditUserMutation } = editUser