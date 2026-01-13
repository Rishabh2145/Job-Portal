import { baseApi } from "./baseApi";

const uploadApi = baseApi.injectEndpoints({
    endpoints: (builders) => ({
        avatar: builders.mutation({
            query: (file) => {
                const formData = new FormData()
                formData.append("avatar", file) 

                return {
                    url: "/upload/avatar",
                    method: "POST",
                    body: formData,
                }
            }
        })
    })
})

export const { useAvatarMutation } = uploadApi