let {send_gmail} = require('../model/sendgmail_nodemailer.js');
let {findEmailUser,updateCustomerPasswd} = require('../model/db.js');
let {randomValueBase64} = require('../model/crypto_passwd.js');

module.exports = async (req, res) => {
  try {
    let {email} = req.body;
    let kq = await findEmailUser(email);
    if (kq.rowCount) {
      let random_key = await randomValueBase64(7); // random 7 ký tự
      let text_html = `
        <h3>YunStore cám ơn bạn là thành viên của YunStore Gaming Gear</h3>
        <p>Chào bạn, ${email}</p>
        <ul>
          <li>Đây là email tự động, bạn không cần phải phản hồi lại email này.</li>
          <li>Bạn đã yêu cầu reset password tài khoản ${email} trên YunStore. Password mới của bạn là: ${random_key}</li>
          <li>Bạn có thể đăng nhập và đổi lại mật khẩu mới bất cứ khi nào bạn muốn.</li>
        </ul>
        <h4>Chúc bạn có một ngày làm việc hiệu quả.</h4>
        <h4><strong>YunStore Gaming Gear - HCM</strong></h4>
      `;
      await updateCustomerPasswd(kq.rows[0].id,random_key);
      await send_gmail(email,text_html);
      res.redirect('/');
    } else {
      res.redirect('/forgotpasswd');
    }
  } catch (e) {
      console.log("Loi send_mail_reset: " + e);
  }
}
