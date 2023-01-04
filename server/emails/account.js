import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const sendMail = (mail, name, amount) => {
  sgMail
    .send({
      to: mail,
      from: "alaa.t.shaalan@gmail.com",
      subject: `hello ${name}`,
      text: "reminder",
      html: `<strong>היתרה העדכנית בחנות אלריחאן היא :  ${amount}</strong>`,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
