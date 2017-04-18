let {getBannerCenter} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      let arrayBannerList = await getBannerCenter();
      res.render('ad_page_banner_ads', {
        arrayBannerList,
        user: req.user
      })
    } else {
      res.redirect('/admin/login')
    }
  } catch (e) {
    console.log("Loi ad_showPageBannerAds: " + e);
  }
};
