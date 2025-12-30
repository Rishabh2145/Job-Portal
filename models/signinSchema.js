const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const signIn = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        users:
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    },
    { timestamps: true }
)

signIn.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const signModel = mongoose.model('SignIn', signIn)