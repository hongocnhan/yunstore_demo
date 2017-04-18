let {getBannerCenter,getTradeMark,getCat_Product} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
    if (req.user) {
      res.redirect('/');
    } else {
      let arrayBannerCenter = await getBannerCenter();
      let arrayTradeMark = await getTradeMark();
      let arrayCat_Product = await getCat_Product();
      res.render('page_forgot_password', {
        arrayBannerCenter,
        arrayTradeMark: arrayTradeMark.rows,
        arrayCat_Product: arrayCat_Product.rows,
        user: req.user
      });
    }
  } catch (e) {
    console.log("Loi page_forgot_password: " + e);
  }
};
