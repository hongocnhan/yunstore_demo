let {delProductTableByCatID, delTrademarkTableByCatID, delCategoriesTableByCatID} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if ( req.user && (req.user.level < 3))
    {
      let {id_categories_del} = req.body;
      await delProductTableByCatID(id_categories_del);
      await delTrademarkTableByCatID(id_categories_del);
      await delCategoriesTableByCatID(id_categories_del);
      res.redirect('/admin/categories');
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_categories_del_all: " + e);
  }
}
