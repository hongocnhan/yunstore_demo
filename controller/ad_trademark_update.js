let {bodau} = require('../model/bodau.js');
let {getTrademarkListByCatID,updateTrademarkByID,
      updateTradeByID,updateProductTableByTradeID} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    let qc_pass = true;
    if (req.user && (req.user.level < 3)) {
      let {name_trademark_update,curr_trademark_id,curr_categories_id,curr_categories_seo} = req.body;
      let name_trademark_update_seo = bodau(name_trademark_update);
      let trade_list = await getTrademarkListByCatID(curr_categories_id);
      trade_list.rows.forEach(function(e) {
        if(e.tennhasx_seo == name_trademark_update_seo){
          qc_pass = false;
          return false;
        }
      })
      if (qc_pass == true) {
          await updateTradeByID(curr_trademark_id,name_trademark_update,name_trademark_update_seo)
          await updateProductTableByTradeID(curr_trademark_id,name_trademark_update_seo)
          res.redirect(`/admin/trademark/${curr_categories_seo}/${curr_categories_id}`);
      } else {
        res.redirect(`/admin/trademark/${curr_categories_seo}/${curr_categories_id}`);
      }
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_trademark_update: " + e);
  }
};
