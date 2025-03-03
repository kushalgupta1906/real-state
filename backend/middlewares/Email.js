import { transporter } from "./Email.config.js";
export const sendVerificationCode=async(email,verificationCode)=>{
    try {
                const response = await transporter.sendMail({
                    from: '"Buy Sell Rent 👻" <kushalgupta1906@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Verify your Email ✔", // Subject line
                    text:"Verify your Email ",// plain text body
                    html: verificationCode, // html body
                  });
                  console.log('email send successfully');
        } catch (error) {
        console.log('email error');
        }
}