let {updateCustomerPasswd} = require('../model/db.js');
let {decrypt_pass} = require('../model/crypto_passwd.js');

module.exports = async (req, res) => {
  try {
    if ( req.user && ( req.user.level < 3 )) {
      let {oldpasswd,newpasswd} = req.body;
      if ( oldpasswd == decrypt_pass(req.user.passwd) ) {
        updateCustomerPasswd(req.user.id,newpasswd)
        .then(result => {
          req.logout();
          res.redirect('/admin/login');
        })
        .catch( err => console.log("Loi updateCustomerPasswd: " + err));
      } else {
        res.redirect('/admin/account_profile');
      }
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_acc_profile_changepasswd: " + e);
  }

};
