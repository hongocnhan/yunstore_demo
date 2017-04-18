let {getTradeMark,getCat_Product} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    let arrayTradeMark = await getTradeMark();
		let arrayCat_Product = await getCat_Product();
    if (req.user) {
			res.render('page_finish_checkout_acc', {
        arrayTradeMark: arrayTradeMark.rows,
  		 	arrayCat_Product: arrayCat_Product.rows,
				user: req.user
      });
    } else {
      res.render('page_registry_checkout', {
        arrayTradeMark: arrayTradeMark.rows,
  		 	arrayCat_Product: arrayCat_Product.rows,
        user: req.user
      });
    }
  } catch (e) {
      console.log('Loi showPageCheckout: ' + e);
  }
};
