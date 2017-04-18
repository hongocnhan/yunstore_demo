let {CancelNewOrderByOrderID} = require('../model/db.js');
let moment = require('moment');

module.exports = async (req, res) => {
  try {
    if ( req.user && (req.user.level < 3)) {
      let {id_order_new_cancel, note} = req.body;
      let date_cancel = moment().format('YYYY-MM-DD 00:00');
      //1. Đơn hàng mới; 2. Đang giao hàng; 3. Đã giao hàng; 4. Hủy giao hàng
      await CancelNewOrderByOrderID(id_order_new_cancel,4,date_cancel,note);
      res.redirect('/admin/new_orders');
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_new_to_running_order: " + e);
  }
}
