import { baseApi } from "./baseApi";

const jobadd = baseApi.injectEndpoints({
    endpoints: (builders) => ({
        addjob: builders.mutation({
            query: (formData) => {
                // const form = new FormData()
                // form.append('jobs', companyImage)
                // form.append('title', title)
                // form.append('company', company)
                // form.append('category', category)
                // form.append('jobType', jobType)
                // form.append('salary', salary)
                // form.append('location', location)
                // form.append('description', description)
                // form.append('degree', degree)
                // form.append('experience', experience)
                // form.append('responsibility', responsibility)
                // form.append('skill', skill)
                // form.append('addedBy', addedBy)
                return {
                    url: '/dashboard/job',
                    method: "POST",
                    body: formData
                }
            }
        }),
        getJob: builders.query({
            query: () => '/dashboard/jobData'
        }),
        jobDetail: builders.mutation({
            query: ({ id }) => ({
                url: '/job',
                method: 'POST',
                body: {
                    id
                }
            })
        }),
        getBookmark: builders.query({
            query: () => '/job/bookmarks',
            providesTags: ['JOB_UPDATE']
        }),
        bookmark: builders.mutation({
            query: ({ jobId }) => ({
                url: '/job/bookmark',
                method: 'POST',
                body: {
                    jobId
                }
            }),
            invalidatesTags: ['JOB_UPDATE']
        })

    })
})

export const { useAddjobMutation, useGetJobQuery, useJobDetailMutation, useGetBookmarkQuery, useBookmarkMutation } = jobadd