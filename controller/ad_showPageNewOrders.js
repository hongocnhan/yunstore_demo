let {getOrderListByCODE} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      // CODE 1. Đơn hàng mới; 2. Đang giao hàng; 3. Đã giao hàng; 4. Đơn hàng hủy
      let arrayNewOrder = await getOrderListByCODE(1);
      res.render('ad_page_new_orders', {
        arrayNewOrder: arrayNewOrder.rows,
        user: req.user
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_showPageNewOrders: " + e);
  }
};
