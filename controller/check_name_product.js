let {bodau} = require('../model/bodau.js');
let {findProductName} = require('../model/db.js');

module.exports = async (req, res) => {
  try {
    let {product_name} = req.body;
    let product_name_seo = bodau(product_name);
    let kq = await findProductName(product_name_seo);
    if (kq.rowCount) {
      res.status(200).send("false");
    } else {
      res.status(200).send("true");
    }
  } catch (e) {
      console.log(" Loi check_name_product: " + e);
  }
};
