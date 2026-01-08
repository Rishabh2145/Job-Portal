const mongoose = require('mongoose')

const Forgot = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    token : {
        type: String,
        required: true
    },
    expiry: Date
})

module.exports = mongoose.model("Forgot", Forgot)