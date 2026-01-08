const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
dotenv.config()

const transporter = nodemailer.createTransport(
    {
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    }
)

const sendMail = async ({to, subject, templateName, templateData}) => {
    try{
        const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`)
        const source = fs.readFileSync(templatePath, 'utf-8')
        const compiledTemplate = handlebars.compile(source)
        const html = compiledTemplate(templateData)

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            html,
        })

    } catch(err){
        console.error(err)
    }
}


module.exports = {transporter, sendMail}