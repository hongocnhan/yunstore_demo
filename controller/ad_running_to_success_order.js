let {FinishOrderByOrderID} = require('../model/db.js');
let moment = require('moment');

module.exports = async (req, res) => {
  try {
    if ( req.user && (req.user.level < 3)) {
      let {id_order_running_success} = req.body;
      let date_finish = moment().format('YYYY-MM-DD 00:00');
      //tham số thứ hai: 1. Đơn hàng mới; 2. Đang giao hàng; 3. Đã giao hàng; 4. Hủy giao hàng
      //Tham số thứ ba: 1. Chưa thanh toán; 2. Đã thanh toán; 3. Hoàn lại tiền
      await FinishOrderByOrderID(id_order_running_success,3,2,date_finish);
      res.redirect('/admin/running_orders');
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_running_to_success_order: " + e);
  }
}
