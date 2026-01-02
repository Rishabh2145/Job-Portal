import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        user: builder.query({
            query: () => '/user/profile'
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
            })
        })
    })
})

export const { useUserQuery } = userApi
export const { useEditUserMutation } = editUser