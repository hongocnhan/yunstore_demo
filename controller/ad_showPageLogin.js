
module.exports = async (req,res) => {
  try {
    if( req.user && (req.user.level < 3) ) {
      // if user is admin or sale
      res.redirect('/admin/home');
    } else if (req.user && (req.user.level >= 3)){
              // if user is customer
              res.redirect('/');
            } else {
              // if don't have account
              res.render('ad_page_login');
            }
  } catch (e) {
    console.log("Loi ad_page_login: " + e);
  }
};
