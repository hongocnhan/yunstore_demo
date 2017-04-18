let {getBannerCenter,getTradeMark,
    getCat_Product} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if(req.user){
      let arrayBannerCenter = await getBannerCenter();
      let arrayTradeMark = await getTradeMark();
      let arrayCat_Product = await getCat_Product();
      res.render('page_profile_changepasswd', {
          arrayBannerCenter,
          arrayTradeMark: arrayTradeMark.rows,
          arrayCat_Product: arrayCat_Product.rows,
          user: req.user
      });
    }else{
      res.redirect('/');
    }
  } catch (e) {
    res.send('Lỗi page_profile_changepasswd: ' + e);
  }
};
