let {getProductOrderByOrderID} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if ( req.user ) {
      let {id_order} = req.body;
      if (id_order) {
        let order_detail = await getProductOrderByOrderID(id_order);
        res.render('ajax_order_detail', {
          order_detail: order_detail.rows,
        });
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  } catch (e) {
    console.log("Loi shopping_orders_history: " + e);
  }
};
