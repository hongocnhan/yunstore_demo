let {getBannerCenter,getTradeMark,
		getCat_Product} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    let arrayTradeMark = await getTradeMark();
		let arrayCat_Product = await getCat_Product();
    if ( !req.user ) {
      let {email_checkout_no} = req.body;
      res.render('page_finish_checkout_noacc', {
        arrayTradeMark: arrayTradeMark.rows,
  		 	arrayCat_Product: arrayCat_Product.rows,
        email_checkout_no,
        user: req.user
      })
    } else {
      res.redirect('/checkout');
    }
  } catch (e) {
    console.log("Loi showPageCheckoutNo: " + e);
  }

}
