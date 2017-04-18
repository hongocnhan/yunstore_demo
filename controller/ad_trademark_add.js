let {bodau} = require('../model/bodau.js');
let {getTrademarkListByCatID,addNewTrademark} = require('../model/db.js');

module.exports = async (req,res) => {
  try {
    let qc_pass = true;
    if(req.user && (req.user.level < 3)) {
      let {new_trademark_name,parent_name_cat_seo,parent_name_cat_id} = req.body;
      let new_trademark_name_seo = bodau(new_trademark_name);
      let trade_list = await getTrademarkListByCatID(parent_name_cat_id);
      trade_list.rows.forEach(function(e) {
        if(e.tennhasx_seo == new_trademark_name_seo){
          qc_pass = false;
          return false;
        }
      });
      if (qc_pass == true) {
        addNewTrademark(new_trademark_name,new_trademark_name_seo,parent_name_cat_seo,parent_name_cat_id)
        .then(result => {
          res.redirect(`/admin/trademark/${parent_name_cat_seo}/${parent_name_cat_id}`);
        })
        .catch(err => console.log("Loi addNewTrademark: " + err));
      } else {
        res.redirect(`/admin/trademark/${parent_name_cat_seo}/${parent_name_cat_id}`);
      }
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_trademark_add: " + e);
  }
};
