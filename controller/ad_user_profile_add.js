let {findEmailUser,addNewUser} = require('../model/db.js');
let {newUser_info} = require('../model/classObj.js');

module.exports = async (req,res) => {
  try {
    if ( req.user && (req.user.level == 1))  {
      let {username,email,datepicker_dob,sex,diachi,dtdidong,user_level,passwd,point} = req.body;
      let re_checkemail = await findEmailUser(email);
      if (re_checkemail.rowCount) {
        res.redirect('/admin/users')
      } else {
        let new_user = new newUser_info(username,email,datepicker_dob,sex,diachi,dtdidong,user_level,passwd,point);
        addNewUser(new_user)
        .then( result => {
          res.redirect('/admin/users');
        })
        .catch( err => console.log("Loi addNewUser: " + err));
      }
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_user_profile_add: " + e);
  }
};
