let {getListProductByCat} = require('../model/db.js');

let maxValue_CategoryPage = 12;

module.exports = (req,res) => {
  let {catProduct,pageNumber} = req.params;
	getListProductByCat(catProduct, maxValue_CategoryPage, (pageNumber-1)*maxValue_CategoryPage)
	.then(result => {
		res.render('paging_product_categories',{productList: result.rows});
	})
	.catch(err => console.log('Err Paging_product_categories: ' + err));
};
