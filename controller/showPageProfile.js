let {getBannerCenter,getTradeMark, getCat_Product,findEmailUser, getOrderListByUser} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    let arrayBannerCenter = await getBannerCenter();
		let arrayTradeMark = await getTradeMark();
		let arrayCat_Product = await getCat_Product();
    let arrayOrder_history =await getOrderListByUser(req.user.email);
    findEmailUser(req.user.email)
    .then(result => {
  		res.render('page_profile', {
        arrayBannerCenter,
  			arrayTradeMark: arrayTradeMark.rows,
  		 	arrayCat_Product: arrayCat_Product.rows,
        arrayOrder_history: arrayOrder_history.rows,
        customer_info: result.rows[0],
        user: req.user
      });
  	})
  	.catch(err => console.log("Loi page_profile: " + err));
  } catch (e) {
    res.send('Lỗi page_profile: ' + e);
  }
};
