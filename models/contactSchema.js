const mongoose = require('mongoose')
const isValid = require('../utils/validator')

const contactSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        validate : (v) => isValid.nameValidate(v)
    },
    lastName : {
        type : String,
        validate : (v) => isValid.nameValidate(v)
    },
    email : {
        type : String,
        required : true,
        validate : (v) => isValid.emailValidate(v)
    },
    message : {
        type : String,
        required : true,
        minLength : [5, "Message should be atleast 5 character"]
    },
    sentTo : {
        ref : 'User',
        type : mongoose.Schema.Types.ObjectId
    }
})


module.exports = mongoose.model('Contact', contactSchema)