let {newCustomer} = require('../model/classObj.js');
let {findEmailUser,registry_Customer} = require('../model/db.js');


module.exports = (req,res) => {
  let {name,email,password,datepicker_dob,diachi,dtdidong} = req.body;
  let new_Customer = new newCustomer(name,email,password,datepicker_dob,diachi,dtdidong);
  findEmailUser(email)
  .then(result => {
    if(result.rowCount){
      res.redirect('/registry');
    }else{
      registry_Customer(new_Customer)
      .then(result => res.redirect('/login'))
      .catch( err => console.log("Loi them Customer: " + err));
    }
  })
  .catch(err => console.log("Loi find email for new Customer: " + err));
};
