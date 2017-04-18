const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'yuntestapp@gmail.com',
      pass: 'your_pass_email'
  }
});

let send_gmail = async (email_address,msg) => {

  let mailOptions = {
      from: '"YunStore Gaming Gear - HCM" <yuntestapp@gmail.com>',
      to: `${email_address}`,
      subject: 'Email từ YunStore Gameing Gear',
      text: 'Mail Auto',
      html: `${msg}`
  };

  let send_mail = () => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return reject(console.log(err));
        }
        resolve(console.log("messages %s send: %s", info.messageId,info.response));
      });
    });
  }
  await send_mail();
}

module.exports = {send_gmail};
