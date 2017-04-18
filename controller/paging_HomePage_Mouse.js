let {getListProductByCat} = require('../model/db.js');

const maxValue_HomePage = 8;

module.exports = (req,res) => {
	let {pageNumber} = req.params;
	getListProductByCat('chuot', maxValue_HomePage, (pageNumber-1)*maxValue_HomePage)
	.then(result => {
		res.render('paging_homepage_mouse',{mouseList: result.rows});
	})
	.catch(err => console.log('Err Paging_mouse: ' + err));
}
