let {getBannerCenter,getTradeMark,getCat_Product,
		getCountProductByCatandTrade} = require('../model/db.js');

let maxValue_TradePage = 12;

module.exports = async (req,res) => {
	let {categories_seo,trademark_seo} = req.params;
	try {
		let arrayBannerCenter = await getBannerCenter();
		let arrayTradeMark = await getTradeMark();
		let arrayCat_Product = await getCat_Product();
		let countProduct = await getCountProductByCatandTrade(categories_seo,trademark_seo);
		let totalPage = Math.floor(countProduct.rows[0].count/maxValue_TradePage) + 1;
		res.render('page_product_trademark',{
			arrayBannerCenter,totalPage,
			categories_seo,trademark_seo,
			arrayTradeMark: arrayTradeMark.rows,
		 	arrayCat_Product: arrayCat_Product.rows,
			user: req.user
		});
	} catch (e) {
		res.send('Lỗi Trang page_cat_trademark: ' + e);
	}
};
