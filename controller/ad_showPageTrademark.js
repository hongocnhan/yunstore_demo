let {getTrademarkListByCatID} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      let {categories_id, categories_seo} = req.params;
      let arrayTrade_Product = await getTrademarkListByCatID(categories_id);
      res.render('ad_page_trademark', {
        arrayTrade_Product: arrayTrade_Product.rows,
        categories_id, categories_seo,
        user: req.user });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_page_trademark: " + e);
  }
};
