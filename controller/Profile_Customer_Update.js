let {Customer} = require('../model/classObj.js');
let {updateCustomterInfoByID} = require('../model/db.js');

module.exports = (req,res) => {
  let {id_cus,username,datepicker_input,sex,diachi,emailkhachhang,dtdidong} = req.body;
  let customer = new Customer(id_cus,username,datepicker_input,sex,diachi,dtdidong);
  updateCustomterInfoByID(customer)
  .then(result => res.redirect('/profile'))
  .catch(err => console.log('Loi update customter: ' + err));
};
