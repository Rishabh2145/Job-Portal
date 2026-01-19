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

export const { useUserQuery, useSubscribeMutation } = userApi
export const { useEditUserMutation } = editUser