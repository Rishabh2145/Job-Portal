const mongoose = require('mongoose')
const isValid = require('../validator');

const forgotSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        validate: {
            validator: (v) => isValid.emailValidate(v),
            message: "Please enter a valid email address"
        }
    },
    user : {
        ref : 'User',
        type : mongoose.Schema.Types.ObjectId
    }
},
    { timestamps : true }
)

export const forgot = mongoose.model('Forgot', forgotSchema)