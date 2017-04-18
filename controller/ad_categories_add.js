let {bodau} = require('../model/bodau.js');
let {addNewCategories} = require('../model/db.js');

module.exports = (req, res) => {
  if (req.user && (req.user.level < 3)) {
    let {new_cat_name} = req.body;
    let new_cat_name_seo = bodau(new_cat_name);
    addNewCategories(new_cat_name,new_cat_name_seo)
    .then(result => {
      res.redirect('/admin/categories');
    })
    .catch( err => console.log("Loi addNewCategories: " + err));
  } else {
    res.redirect('/admin/login');
  }
};
