let {updateCustomerPasswd} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if ( req.user && ( req.user.level == 1 )) {
      let {user_id_change,newpasswd} = req.body;
      updateCustomerPasswd(user_id_change,newpasswd)
      .then(result => {
        res.redirect('/admin/users');
      })
      .catch( err => console.log("Loi updateCustomerPasswd: " + err));
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_user_profile_changepasswd: " + e);
  }
};
