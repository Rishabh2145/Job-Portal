const model = require('../models/contactSchema')

const contact = async (req , res) => {
    const msg = new model({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        message : req.body.message
    })
    msg.save().then(()=>{
        res.status(200).json({
            message : "Message is Send to the User !",
            data : msg
        })
    }).catch((err) => {
        res.status(500).json({
            error : err
        })
    })
}

const getMessages = async (req , res) => {
    try {
        const messages = await model.find();
        res.status(200).json({
            message : "Messages Retrieved Successfully",
            data : messages
        })
    } catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

const deleteMessage = async (req, res) => {
    try {
        const messageId = req.body.id;
        await model.findByIdAndDelete(messageId);
        res.status(200).json({
            message: "Message Deleted Successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = {contact, getMessages}