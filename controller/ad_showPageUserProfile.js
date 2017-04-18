let {getUserByID} = require('../model/db.js')

module.exports = async (req, res) => {
  try {
    if ( req.user && ( req.user.level == 1 )) {
      let {id} = req.params;
      let user_info = await getUserByID(id);
      res.render('ad_page_user_profile', {
        user_info: user_info.rows[0],
        user: req.user
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_page_user_profile: " + e);
  }
};
