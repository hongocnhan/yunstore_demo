let {bodau} = require('../model/bodau.js');
let {getCat_Product,updateCatTableByID,updateTradeTableByCatID,updateProductTableByCatID} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
    let qc_pass = true;
    if(req.user && (req.user.level < 3)) {
      let {name_cat_update, curr_categories_id} = req.body;
      let name_cat_update_seo = bodau(name_cat_update);
      let cat_list = await getCat_Product();
      cat_list.rows.forEach(function(e) {
        if (e.tenloaisp_seo == name_cat_update_seo) {
          qc_pass = false;
          return false;
        }
      })
      if (qc_pass == true) {
          await updateCatTableByID(curr_categories_id,name_cat_update,name_cat_update_seo);
          await updateTradeTableByCatID(curr_categories_id,name_cat_update_seo);
          await updateProductTableByCatID(curr_categories_id,name_cat_update_seo)
          res.redirect('/admin/categories');
      } else {
        res.redirect('/admin/categories');
      }
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log('Loi ad_categories_update: ' + e);
  }
};
