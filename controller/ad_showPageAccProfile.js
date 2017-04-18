
module.exports = async (req, res) => {
  try {
    if ( req.user && ( req.user.level < 3 )) {
      res.render('ad_page_acc_profile', {
        user: req.user
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_showPageAccProfile: " + e);
  }
};
