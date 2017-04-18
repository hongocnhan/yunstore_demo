let {findEmailUser} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
    if(req.user && (req.user.level == 1)) {
      let {newemail} = req.params;
      let kq = await findEmailUser(newemail);
      if (kq.rowCount) {
        res.send("1");
      } else {
        res.send("0");
      }
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_ajax_checknewemail: " + e);
  }
};
