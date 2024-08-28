
const nodemailer = require('nodemailer')


const  sendEmail = async (subject, message, sent_to, send_from, reply_to)=>{
// Creare email transport
    const transporter = nodemailer.createTransport({
        host: process.env.smtp-mail.outlook.com,
        port: 587,
        auth: {
            user: process.env.MONGODB_EMAIL_USER,
            pass: process.env.MONGODB_EMAIL_PASS
        },

        tls: {
            rejectUnauthorized: false
        }
    })

    //Optiions for sending emal
    const options = {
        from: send_from,
        to: sent_to,
        replyTo: reply_to,
        subject: subject,
        html: message
    }

    // check and send mail
transporter.sendMail(options, function(err, info){
    if(err){
        console.log(err)
    }else(
        console.log(err)
    )
});

}


module.exports = sendEmail;