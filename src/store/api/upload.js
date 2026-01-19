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
            },
            invalidatesTags: ['UPDATE_USER']
        }),
        resume: builders.mutation({
            query: (file) => {
                const resume = new FormData()
                resume.append("resume", file) 

                return {
                    url: "/upload/resume",
                    method: "POST",
                    body: resume,
                }
            },
            invalidatesTags: ['UPDATE_USER']
        }),

        applyJob : builders.mutation({
            query: ({jobId, ques}) => ({
                url: '/job/apply',
                method: 'POST',
                body: {
                    jobId,
                    ques
                }
            }),
            invalidatesTags: ['UPDATE_USER']
        })
    })
})

export const { useAvatarMutation , useApplyJobMutation, useResumeMutation } = uploadApi