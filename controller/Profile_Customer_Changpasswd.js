let {decrypt_pass} = require('../model/crypto_passwd.js');
let {updateCustomerPasswd} = require('../model/db.js');

module.exports = (req,res) => {
  if(req.user) {
    let {oldpasswd,newpasswd} = req.body;
    if( oldpasswd == decrypt_pass(req.user.passwd)) {
      updateCustomerPasswd(req.user.id,newpasswd)
      .then(result => {
        req.logout();
        res.redirect('/login');
      })
      .catch(err => console.log("Loi updateCustomerPasswd: " + err));
    } else {
      res.redirect('/profile');
    }
  } else {
    res.redirect('/');
  }
};
