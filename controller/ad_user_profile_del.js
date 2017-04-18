let {delUserByID} = require('../model/db.js');

module.exports = (req, res) => {
  if ( req.user && (req.user.level == 1)) {
    let {id_email_del} = req.body;
    delUserByID(id_email_del)
    .then(result => {
      res.redirect('/admin/users');
    })
    .catch( err => console.log("Loi delUserByID: " + err));
  } else {
    res.redirect('/admin/login');
  }
};
