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
        })
    })
})

export const { useSignupMutation } = authApi
export const { useSigninMutation } = signApi