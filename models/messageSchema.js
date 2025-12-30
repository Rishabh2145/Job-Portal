const mongoose = require('mongoose')
const isValid = require('../utils/validator');

const messageSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate : {
            validator : (v) => isValid.nameValidate(v),
            message : "First name should contain only alphabets"    
        }
    },
    lastName: {
        type: String,
        required: true,
        validate : {
            validator : (v) => isValid.nameValidate(v),
            message : "Last name should contain only alphabets"    
        }
    },
    email: {
        type: String,
        required: true,
        validate : {
            validator : (v) => isValid.emailValidate(v),
            message : "Please enter a valid email address"    
        }
    },
    msg: {
        type: String,
        required: true,
        minLength: [10, "Message must contain at least 10 characters"]
    },
    messageTo : {
        ref : 'User',
        type : mongoose.Schema.Types.ObjectId
    }
},
    { timestamps: true }
)

export const message = mongoose.model('Message', messageSchema)