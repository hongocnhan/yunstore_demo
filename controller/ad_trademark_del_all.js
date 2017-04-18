let {delProductTableByTrademarkID, delTrademarkTableByTrademarkID} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if ( req.user && (req.user.level < 3))
    {
      let {curr_id_trademark, curr_categories_id, curr_categories_seo} = req.body;
      await delProductTableByTrademarkID(curr_id_trademark);
      await delTrademarkTableByTrademarkID(curr_id_trademark);
      res.redirect(`/admin/trademark/${curr_categories_seo}/${curr_categories_id}`);
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_trademark_del_all: " + e);
  }
}
