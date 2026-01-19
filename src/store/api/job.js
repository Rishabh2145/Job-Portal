import { baseApi } from "./baseApi";

const jobadd = baseApi.injectEndpoints({
    endpoints: (builders) => ({
        addjob: builders.mutation({
            query: (formData) => ({
                url: '/dashboard/job',
                method: "POST",
                body: formData

            })
        }),
        getJob: builders.query({
            query: () => '/dashboard/jobData'
        }),
        getAppliedJob: builders.query({
            query: () => '/job/applied',
        }),
        getApplicant: builders.query({
            query: () => '/job/applicant',
            providesTags: ['APPLIED_JOB']
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
        }),
        filter: builders.query({
            query: (params) => ({
                url: '/dashboard/filter',
                params
            })
        }),
        updateStatus: builders.mutation({
            query: ({ id, jobId, status }) => ({
                url: '/job/status',
                method: 'POST',
                body: {
                    id,
                    jobId,
                    status
                }
            }),
            invalidatesTags: ['APPLIED_JOB']
        })

    })
})

export const { useAddjobMutation, useGetJobQuery, useGetApplicantQuery, useJobDetailMutation, useGetBookmarkQuery, useBookmarkMutation, useGetAppliedJobQuery, useFilterQuery, useLazyFilterQuery, useUpdateStatusMutation } = jobadd