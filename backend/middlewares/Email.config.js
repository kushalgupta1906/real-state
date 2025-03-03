import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "kushalgupta1906@gmail.com",
      pass: "ucwt efgo sdqm zegi",
    },
  });
  //ucwt efgo sdqm zegi
  const SendEmail=async()=>{
    try {
        const info = await transporter.sendMail({
            from: '"Buy Sell Rent 👻" <kushalgupta1906@gmail.com>', // sender address
            to: "lakshyachaurasia766@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
    } catch (error) {
            console.log(error);   
    }
  }
  SendEmail();