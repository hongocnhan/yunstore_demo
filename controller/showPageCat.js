let {getBannerCenter,getTradeMark,getCat_Product,
		getCountProductByCat} = require('../model/db.js');

let maxValue_CategoryPage = 12;

module.exports = async (req,res) => {
	let {catProduct} = req.params;
	try {
		let arrayBannerCenter = await getBannerCenter();
		let arrayTradeMark = await getTradeMark();
		let arrayCat_Product = await getCat_Product();
		let countProduct = await getCountProductByCat(catProduct);
		let totalPage = Math.floor(countProduct.rows[0].count/maxValue_CategoryPage) + 1;
		res.render('page_product_categories',{
			arrayBannerCenter,totalPage,catProduct,
			arrayTradeMark: arrayTradeMark.rows,
		 	arrayCat_Product: arrayCat_Product.rows,
			user: req.user
		});
	} catch (e) {
		res.send('Loi Page_Categories: ' + e);
	}
};
