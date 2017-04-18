let {getCat_Product} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      let arrayCat_Product = await getCat_Product();
      res.render('ad_page_categories', {
        arrayCat_Product: arrayCat_Product.rows,
        user: req.user });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_page_categories: " + e);
  }
};
