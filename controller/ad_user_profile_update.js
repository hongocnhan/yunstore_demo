let {user_Info} = require('../model/classObj.js')
let {updateUserInfoByID} = require('../model/db.js');

module.exports = (req,res) => {
  if ( req.user && ( req.user.level == 1 )) {
    let {id_cus,username,datepicker_dob,sex,diachi,dtdidong,user_level} = req.body;
    let user_info = new user_Info(id_cus, username, user_level, sex, datepicker_dob, diachi, dtdidong);
    updateUserInfoByID(user_info)
    .then( result => {
      res.redirect(`/admin/user_profile/${id_cus}`);
    })
    .catch( err => console.log("Loi updateUserInfoByID: " + err));
  } else {
    res.redirect('/admin/login');
  }
};
