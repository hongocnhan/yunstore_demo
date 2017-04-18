let {getProductList,getCat_Product} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      let arrayListTrade = await getCat_Product();
      let product_list = await getProductList();
      res.render('ad_page_products', {
        arrayListTrade: arrayListTrade.rows,
        product_list: product_list.rows,
        user: req.user
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_page_products: " + e);
  }
};
