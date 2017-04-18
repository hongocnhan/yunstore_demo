let {SuccessStatusToOrtherStatusOrderByOrderID} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if ( req.user && (req.user.level < 3)) {
      let {id_order_success_to_running,note} = req.body;
      //tham số thứ hai: 1. Đơn hàng mới; 2. Đang giao hàng; 3. Đã giao hàng; 4. Hủy giao hàng
      //Tham số thứ ba: 1. Chưa thanh toán; 2. Đã thanh toán; 3. Hoàn lại tiền
      await SuccessStatusToOrtherStatusOrderByOrderID(id_order_success_to_running,2,1,note);
      res.redirect('/admin/success_orders');
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_success_to_running_order: " + e);
  }
}
