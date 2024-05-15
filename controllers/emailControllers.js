
import {sendEmail} from "../helpers/sendEmail.js";
import controllerDecorator from "../helpers/controllerDecorator.js";


const sendHelpEmail = async (req, res) => {
  const { name } = req.user;
  const { email, comment } = req.body;

  const emailToUser = {
    to: email,
    subject: "Need help",
    html: `<p>Dear ${name},<br>
    We thank you for your email.<br>
    <br>      
    Best regards,<br>
    Task Pro Support Team
   </p>`,
  };
  await sendEmail(emailToUser);

  const emailToSupport = {
    to: "taskpro.project@gmail.com",
    subject: "Support notification",
    html: `<p>Dear Team,<br>   The customer ${name} has sent you a help email.<br>
    Comment from the user: ${comment}<br> Email for reply: ${email}.
   </p>`,
  };
  await sendEmail(emailToSupport);


  res.json({ message: "Email sent successfully" });

};

export default {

  sendHelpEmail: controllerDecorator(sendHelpEmail),
};
