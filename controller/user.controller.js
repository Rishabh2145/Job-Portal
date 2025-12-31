const user = require('../models/userSchema')
const details = async (req, res) => {
    const doc = new user({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        mobile: req.body.mobile,
        institute: req.body.institute,
        instituteGrade: req.body.instituteGrade,
        school: req.body.school,
        schoolGrade: req.body.schoolGrade,
        address: req.body.address,
        userRef: req.body.userRef
    })

    doc.save().then(() => {
        res.status(201).json({
            message: "User details saved successfully",
            data: doc
        })
    }).catch((err) => {
        res.status(500).json({ error: err })
    })

}

const updateDetails = (req, res) => {
    const userId = req.query.id;
    user.findByIdAndUpdate(userId, req.body).then(() => {
        res.send("User Updated Successfully")
    })
}

const getUser = async (req, res) => {
    res.status(202).json(req.user)
}

module.exports = { details, updateDetails, getUser };