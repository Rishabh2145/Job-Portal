
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup : builder.mutation({
            query: ({role, fullName, username, email, password}) => ({
                url : '/signup',
                method : "POST",
                body: {
                    role,
                    fullName,
                    username,
                    email,
                    password
                }
            })
        })
    })
})


export const signApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        signin : builder.mutation({
            query : ({email, password}) => ({
                url : '/signin',
                method : "POST",
                body : {
                    email,
                    password
                }
            })
        }),
        verify : builder.mutation({
            query: ({email, token}) => ({
                url: '/auth/verify',
                method: 'POST',
                body: {
                    email,
                    token
                }
            })
        }),
        checkVerification: builder.mutation({
            query: ({email}) => ({
                url: '/auth/check',
                method: "POST",
                body: {
                    email
                }
            })
        }),
        reset: builder.mutation({
            query: ({email, token, password})=>({
                url: '/auth/reset',
                method: "POST",
                body:{
                    email,
                    token,
                    password
                }
            })
        }),
        forgot: builder.mutation({
            query: ({email}) => ({
                url: '/auth/forgot',
                method: "POST",
                body: {
                    email
                }
            })
        })
    })
})

export const { useSignupMutation } = authApi
export const { useSigninMutation, useVerifyMutation, useCheckVerificationMutation, useResetMutation, useForgotMutation } = signApi