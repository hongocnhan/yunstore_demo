let {getListProductByCatandTrade} = require('../model/db.js');

let maxValue_TradePage = 12;

module.exports =  (req,res) => {
	let {categories_seo,trademark_seo,pageNumber} = req.params;
	getListProductByCatandTrade(categories_seo, trademark_seo, maxValue_TradePage, (pageNumber-1)*maxValue_TradePage)
	.then(result => {
		res.render('paging_product_trademark',{productList: result.rows});
	})
	.catch(err => console.log('Err paging_product_trademark: ' + err));
}
