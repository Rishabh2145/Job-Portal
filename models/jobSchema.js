const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    companyImage: {
        type: String,
        required: [true, "Please Insert the Company Image"]
    },
    title: {
        type: String,
        required: [true, 'Title of the job is required']
    },
    company: {
        type: String,
        required: [true, 'Company Name is Required!']
    },
    category: {
        type: String,
        required: [true, "Category is Required!"]
    },
    jobType: {
        type: String,
        enum: {
            values: ['Part-Time', 'Full-Time', 'Remote', 'Internship', 'Hybrid'],
            message: '{VALUE} is not a valid Job Type'
        },
        required: [true, 'Job Type is Required!']
    },
    salary: {
        type: String,
        required: [true, 'Salary is Required!']
    },
    location: {
        type: String,
        required: [true, "Please Enter the location!"]
    },
    description: {
        type: String,
        required: [true, 'Description of the job is Required!']
    }
},
    { timestamps: true }
)

module.exports = JobModel = mongoose.model('JobDetail', jobSchema)