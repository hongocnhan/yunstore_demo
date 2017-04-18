let {getBannerCenter,getTradeMark,
		getCat_Product} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
		let arrayBannerCenter = await getBannerCenter();
		let arrayTradeMark = await getTradeMark();
		let arrayCat_Product = await getCat_Product();
		res.render('page_cart',{
			arrayBannerCenter,
			arrayTradeMark: arrayTradeMark.rows,
		 	arrayCat_Product: arrayCat_Product.rows,
			user: req.user
		});
	} catch (e) {
		res.send('Lỗi page_cart: ' + e);
	}
};
