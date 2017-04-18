let {getTradeMark} = require('../model/db.js');

module.exports = (req,res) => {
	let {categories} = req.params;
	if (categories != "null") {
		getTradeMark()
		.then(result => {
			res.render('ad_ajax_trademarklist', {categories, array_Trademark: result.rows})
		})
		.catch(err => console.log('Loi admin ad_ajax_trademarklist: ' + err));
	} else {
		res.send(`
			<select id="oldtrademark" name="oldtrademark" class="form-control">
					<option value="" data-id="" >Chọn thương hiệu</option>
			</select>
			`);
	}
};
