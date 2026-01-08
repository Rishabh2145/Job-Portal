const mongoose = require('mongoose');


const verify = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiry: {
        type: Date
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Verification", verify)