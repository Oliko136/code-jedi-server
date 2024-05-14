
import {sendEmail} from "../helpers/sendEmail.js";
import controllerDecorator from "../helpers/controllerDecorator.js";


const sendHelpEmail = async (req, res) => {
  const { name } = req.user;
  const { email, comment } = req.body;

  const emailToUser = {
    to: email,
    subject: "Need help",
    html: `<p>Dear ${name},\n
   We thank you for your email.\n
      
   Best regards,\n
   Task Pro Support Team
  </p>`,
  };
  await sendEmail(emailToUser);

  const emailToSupport = {
    to: "aleks.markov@hotmail.com",
    subject: "Support notification",
    html: `<p>Dear Team,\n   The customer ${name} send you helpemail.\n
 Coment from the user: ${comment}\n Email for answer: ${email}.
  </p>`,
  };
  await sendEmail(emailToSupport);


  res.json({ message: "Email sent successfully" });

};

export default {

  sendHelpEmail: controllerDecorator(sendHelpEmail),
};
