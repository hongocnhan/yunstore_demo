let {getBannerCenter,getTradeMark,getCat_Product,
    getListProductByPush_forSlice,getCountProductByPush,
    getCountProductByCat} = require('../model/db.js');

// Global variable
const maxValue_HomePage = 8;

module.exports = async (req, res) => {
  try {
		let arrayBannerCenter = await getBannerCenter();
		let arrayTradeMark = await getTradeMark();
		let arrayCat_Product = await getCat_Product();
		let arrayHot_Product = await getListProductByPush_forSlice();
		let countHot_product = await getCountProductByPush();
		let countKeyboard_Product = await getCountProductByCat('ban-phim');
		let countMouse_Product = await getCountProductByCat('chuot');
		let countHeadphone_Product = await getCountProductByCat('tai-nghe');
		let totalPage_Keyboard = Math.floor(countKeyboard_Product.rows[0].count/maxValue_HomePage) + 1;
		let totalPage_Mouse = Math.floor(countMouse_Product.rows[0].count/maxValue_HomePage) + 1;
		let totalPage_Headphone = Math.floor(countHeadphone_Product.rows[0].count/maxValue_HomePage) + 1;
		res.render('index', {
      arrayBannerCenter,arrayHot_Product,countHot_product,
      totalPage_Keyboard,totalPage_Mouse,totalPage_Headphone,
			arrayTradeMark: arrayTradeMark.rows,
		  arrayCat_Product: arrayCat_Product.rows,
      user: req.user
    })
	} catch (e) {
		res.send('Loi showIndex: ' + e);
	}
};
