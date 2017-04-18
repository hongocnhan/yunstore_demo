let {ReardyToShip} = require('../model/db.js');
let moment = require('moment');

module.exports = async (req, res) => {
  try {
    if ( req.user && (req.user.level < 3)) {
      let {id_order_new_running} = req.body;
      let date_send = moment().format('YYYY-MM-DD 00:00');
      // 1. Đơn hàng mới; 2. Đang giao hàng; 3. Đã giao hàng; 4. Hủy giao hàng
      await ReardyToShip(id_order_new_running,2,date_send);
      res.redirect('/admin/new_orders');
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_new_to_running_order: " + e);
  }
}
