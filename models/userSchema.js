const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isValid = require('../utils/validator');

const signUp = new mongoose.Schema({
    role: {
        type: String,
        enum: ['Admin', 'Candidate', 'Employee'],
    },
    fullName: {
        type: String,
        required: true,
        validate: {
            validator: (v) => isValid.nameValidate(v),
            message: "Name should contain only alphabets"
        }
    },
    username: {
        type: String,
        minLength: [5, "Username must contain at least 5 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => isValid.emailValidate(v),
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        minLength: [8, "Password must contain at least 8 characters"],
        validate: {
            validator: (v) => isValid.passwordValidate(v),
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        }
    },
    contact: {
        type: Number,
        validate: {
            validator: (v) => isValid.mobileValidate(v),
            message: "Please enter a valid 10-digit Indian mobile number starting with 6-9"
        }
    },
    mobile: {
        type: Number,
        validate: {
            validator: (v) => isValid.mobileValidate(v),
            message: "Please enter a valid 10-digit Indian mobile number starting with 6-9"
        }
    },
    institute: {
        type: String,
    },
    instituteGrade: {
        type: Number,
        max: [100, "Institute grade cannot exceed 100"],
        min: [0, "Institute grade cannot be less than 0"]
    },
    school: {
        type: String,
    },
    schoolGrade: {
        type: Number,
        max: [100, "School grade cannot exceed 100"],
        min: [0, "School grade cannot be less than 0"]
    },
    address: {
        type: String,
        // select: false
    }
},
    { timestamps: true }
)

signUp.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    } catch (error) {
        console.error("Error hashing password:", error);
    }
});


signUp.index({ username: 1, email: 1, contact: 1 }, { unique: true });



module.exports = mongoose.model('User', signUp)

