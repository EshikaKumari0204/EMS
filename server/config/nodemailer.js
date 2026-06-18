import {createTransport} from "nodemailer"


const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
export const sendEmail=async({to,subject,body})=>{
  try {
    
 
  const res=await transporter.sendMail({
    from :process.env.SENDER_EMAIL,
    to,subject,html:body
  })
  return res;
   } catch (error) {
    console.log("sending email failed",error.message)
    throw error;
  }
}
