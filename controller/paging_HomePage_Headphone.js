let {getListProductByCat} = require('../model/db.js');

const maxValue_HomePage = 8;

module.exports = (req,res) => {
	let {pageNumber} = req.params;
	getListProductByCat('tai-nghe', maxValue_HomePage, (pageNumber-1)*maxValue_HomePage)
	.then(result => {
		res.render('paging_homepage_headphone',{headphoneList: result.rows});
	})
	.catch(err => console.log('Err Paging_headphone: ' + err));
}
