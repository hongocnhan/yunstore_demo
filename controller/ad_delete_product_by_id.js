let {delProductByID} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      let {id_product_del} = req.body;
      await delProductByID(id_product_del);
      res.redirect('/admin/products');
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    onsole.log("Loi ad_delete_product_by_id: " + e);
  }
};
