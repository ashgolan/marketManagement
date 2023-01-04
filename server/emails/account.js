import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// export const sendMail = (mail, name, amount) => {
//   sgMail
//     .send({
//       to: mail,
//       from: "alaashaalan.test@gmail.com",
//       subject: `hello ${name}`,
//       text: "reminder",
//       html: `<strong>היתרה העדכנית בחנות אלריחאן היא :  ${amount}</strong>`,
//     })
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "alaa.t.shaalan@gmail.com", // Change to your recipient
  from: "alaa.t.shaalan@gmail.com", // Change to your verified sender
  subject: "new",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
