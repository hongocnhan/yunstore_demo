let {getOrder_List} = require('../model/db.js')

module.exports = async (req,res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      let arrayListOrder = await getOrder_List();
      res.render('ad_page_orders', {
        arrayListOrder: arrayListOrder.rows,
        user: req.user
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_page_orders: " + e);
  }
};
