let {getOrderListByCODE} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      // CODE 1. Đơn hàng mới; 2. Đang giao hàng; 3. Đã giao hàng; 4. Đơn hàng hủy
      let arraySuccessOrder = await getOrderListByCODE(3);
      res.render('ad_page_success_orders', {
        arraySuccessOrder: arraySuccessOrder.rows,
        user: req.user
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_showPageSuccessOrders: " + e);
  }
};
