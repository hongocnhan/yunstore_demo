let {getOrderListByDateRange,getOrder_List} = require('../model/db.js');
let moment = require('moment');

module.exports = async (req,res) => {
  try {
    if (req.user && (req.user.level < 3)) {

      let startOfWeek = moment().startOf('week').format('YYYY-MM-DD 00:00').toString();
      let endOfWeek   = moment().endOf('week').format('YYYY-MM-DD 00:00').toString();
      let startOfLastWeek = moment(startOfWeek).subtract(7,'d').format("YYYY-MM-DD 00:00").toString();
      let endOfLastWeek = moment(endOfWeek).subtract(7,'d').format("YYYY-MM-DD 00:00").toString();
      let startOfMonth = moment().startOf('month').format('YYYY-MM-DD 00:00').toString();
      let endOfMonth = moment().endOf('month').format('YYYY-MM-DD 00:00').toString();

      let starOfYear = moment().startOf('year').format('YYYY-MM-DD 00:00').toString();
      let secondOfYear = moment(starOfYear).add(1,'months').format('YYYY-MM-DD 00:00').toString();

      let arrayAllListOrder = await getOrder_List();
      let arrayListOrderInCurrWeek = await getOrderListByDateRange(startOfWeek,endOfWeek);
      let arrayListOrderInLastWeek = await getOrderListByDateRange(startOfLastWeek,endOfLastWeek);
      let arrayListOrderInCurrMonth = await getOrderListByDateRange(startOfMonth,endOfMonth);

      res.render('ad_page_revenue', {
        arrayListOrderInCurrWeek: arrayListOrderInCurrWeek.rows,
        arrayListOrderInLastWeek: arrayListOrderInLastWeek.rows,
        arrayAllListOrder: arrayAllListOrder.rows,
        arrayListOrderInCurrMonth: arrayListOrderInCurrMonth.rows,

        startOfWeek, startOfLastWeek, starOfYear, secondOfYear,
        user: req.user
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi ad_page_revenue: " + e);
  }
};
