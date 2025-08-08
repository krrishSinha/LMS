
// utils/sendEmail.ts
import nodemailer from 'nodemailer';



const sendEmail = async (email: string, activationCode: any) => {

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Send email
    await transporter.sendMail({
        from: `"LMS App" <${process.env.SMTP_MAIL}>`,
        to: email,
        subject: 'Account Activation',
        text: 'Please activate your account using the link provided.',
        html: ` <html>
                  <body>
                       <p>Hi,</p>
                       <p>please Enter this code on the activation page within 5 minutes:</p>
                       <p>${activationCode}</p>
                  </body>
                </html>`,
    });


};

export default sendEmail;
