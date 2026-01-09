import { baseApi } from "./baseApi";

const jobadd = baseApi.injectEndpoints({
    endpoints: (builders) => ({
        addjob: builders.mutation({
            query: ({ companyImage, title, company, category, jobType, salary, location, description }) => ({
                url: '/dashboard/job',
                method: "POST",
                body: {
                    companyImage,
                    title,
                    company,
                    category,
                    jobType,
                    salary,
                    location,
                    description
                }
            })
        }),
        getJob : builders.query({
            query : () => '/dashboard/jobData'
        }),
        jobDetail : builders.mutation({
            query: ({id}) => ({
                url: '/job',
                method: 'POST',
                body:{
                    id
                }
            })
        })
    })
})

export const { useAddjobMutation, useGetJobQuery, useJobDetailMutation } = jobadd