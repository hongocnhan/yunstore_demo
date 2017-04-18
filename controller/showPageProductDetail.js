let {getBannerCenter,getTradeMark,getCat_Product,
      getProductByProductname_seo, findProductName} = require('../model/db.js');

module.exports = async (req,res) => {
	let {productname_seo} = req.params;
	try {
    let check_pd = await findProductName(productname_seo);
    if (check_pd.rowCount  && (check_pd.rows[0].hienthi == true)) {
      let arrayBannerCenter = await getBannerCenter();
  		let arrayTradeMark = await getTradeMark();
  		let arrayCat_Product = await getCat_Product();
  		let Item_product = await getProductByProductname_seo(productname_seo);
  		res.render('page_product_detail',{
  			arrayBannerCenter,
  			Item_product: Item_product.rows[0],
  			arrayTradeMark: arrayTradeMark.rows,
  		 	arrayCat_Product: arrayCat_Product.rows,
        user: req.user
      });
    } else {
      res.redirect('/');
    }
	} catch (e) {
		res.send('Err page_product_detail: ' + e);
	}
};
