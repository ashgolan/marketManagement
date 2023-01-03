import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.apiKey);
// const apiKey =
//   "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";
// sgMail.setApiKey(apiKey);

export const sendMail = (mail, name, amount) => {
  sgMail
    .send({
      to: mail,
      from: "alaashaalan.test@gmail.com",
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
