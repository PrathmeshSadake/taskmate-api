const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "prathmeshsadake@gmail.com", // Change to your verified sender
    subject: "Thanks for joining in!",
    text: `Welcome to the app ${name}. Let me know how you get along with the app`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendCancelEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "prathmeshsadake@gmail.com", // Change to your verified sender
    subject: "Sorry to see you go!",
    text: `We're sorry to see you go. If there's any problem with our app please let us know.`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
