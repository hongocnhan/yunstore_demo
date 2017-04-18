let {getOrder_List, getProductList, getCat_Product, getOrderListByDateRange} = require('../model/db.js');
let moment = require('moment');

module.exports = async (req,res) => {
  try {
    if (req.user && (req.user.level < 3)) {
      let arrayAllListOrder = await getOrder_List();
      let product_list = await getProductList();
      let categories_list = await getCat_Product();
      let startOfWeek = moment().startOf('week').format('YYYY-MM-DD 00:00').toString();
      let endOfWeek   = moment().endOf('week').format('YYYY-MM-DD 00:00').toString();
      let startOfLastWeek = moment(startOfWeek).subtract(7,'d').format("YYYY-MM-DD 00:00").toString();
      let endOfLastWeek = moment(endOfWeek).subtract(7,'d').format("YYYY-MM-DD 00:00").toString();

      let arrayListOrderInCurrWeek = await getOrderListByDateRange(startOfWeek,endOfWeek);
      let arrayListOrderInLastWeek = await getOrderListByDateRange(startOfLastWeek,endOfLastWeek);

      res.render('ad_page_home', {
        arrayAllListOrder: arrayAllListOrder.rows,
        product_list: product_list.rows,
        arrayListOrderInCurrWeek: arrayListOrderInCurrWeek.rows,
        arrayListOrderInLastWeek: arrayListOrderInLastWeek.rows,
        categories_list, startOfWeek, startOfLastWeek,
        user: req.user
      });
    } else {
      req.logout();
      res.redirect('/admin/login');
    }
  } catch (e) {
      console.log("Loi ad_showPageHome: " + e);
  }
};
