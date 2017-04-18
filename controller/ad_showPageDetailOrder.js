
let {getOrderDetailByOrderID,getProductOrderByOrderID} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    if (req.user && (req.user.level == 1)) {
      let {orderID} = req.params;
      let order_item = await getOrderDetailByOrderID(orderID);
      let order_product_list = await getProductOrderByOrderID(order_item.rows[0].madonhang);
      res.render('ad_page_detail_order_admin_only', {
        order_product_list: order_product_list.rows,
        order_item: order_item.rows[0],
        user: req.user
      });
    } else if (req.user && (req.user.level == 2)) {
              // CODE 1. Đơn hàng mới; 2. Đang giao hàng; 3. Đã giao hàng; 4. Đơn hàng hủy
              let {orderID} = req.params;
              let order_item = await getOrderDetailByOrderID(orderID);
              let order_product_list = await getProductOrderByOrderID(order_item.rows[0].madonhang);
              res.render('ad_page_detail_order', {
                order_product_list: order_product_list.rows,
                order_item: order_item.rows[0],
                user: req.user
              });
            } else {
              res.redirect('/admin/login');
            }
  } catch (e) {
    console.log("Loi ad_showPageDetailOrder: " + e);
  }
};
