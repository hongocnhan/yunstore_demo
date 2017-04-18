let {getUserList} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
    if ( req.user && ( req.user.level == 1 )) {
      let usersList = await getUserList();
      res.render('ad_page_users', {
        usersList: usersList.rows,
        user: req.user });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_page_users: " + e);
  }
};
