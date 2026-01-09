const JobModel = require('../models/jobSchema')

const addJob = async (req, res) => {
    const newJob = new JobModel({
        companyImage: req.body.companyImage,
        title: req.body.title,
        company: req.body.company,
        category: req.body.category,
        jobType: req.body.jobType,
        salary: req.body.salary,
        location: req.body.location,
        description: req.body.description
    })

    newJob.save().then(() => {
        res.status(200).json({
            message: "Job added Successfully!",
            newJob,
            success: true
        })
    }).catch((err) => {
        res.status(404).json({
            err
        })
    })
}

const getJob = async (req, res) => {
    try {
        const jobs = await JobModel.find({})
        res.status(200).json({ jobs })
    } catch (err) {
        res.status(404).json({
            message: err
        })
    }
}

const jobData = async (req, res) => {
    try{
        const {id} = req.body;
        
        const jobs = await JobModel.findById(id)
        return res.status(200).json({
            jobs
        })
    } catch(err){
        return res.status(400).json({
            message: 'Job Not Found!'
        })
    }
}

module.exports = { addJob, getJob , jobData}