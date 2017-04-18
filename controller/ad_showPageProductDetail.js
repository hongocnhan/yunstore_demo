let {getProductByID,getCat_Product} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      let {productID} = req.params;
      let product_item = await getProductByID(productID);
      let arrayListTrade = await getCat_Product();
      if (product_item.rowCount) {
        res.render('ad_page_products_detail', {
          arrayListTrade: arrayListTrade.rows,
          product_item: product_item.rows[0],
          user: req.user
        });
      } else {
        res.redirect('/admin/products');
      }
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_showPageProductDetail: " + e);
  }
}
