let {Product_Item} = require('../model/classObj.js');
let {addNewProductItem} = require('../model/db.js');
let {bodau} = require('../model/bodau.js');
let {getManyFieldnameUpload} = require('../model/upload.js');

let upload = getManyFieldnameUpload('anh01_upload','anh02_upload','anh03_upload','anh04_upload');
module.exports = (req, res) => {
  if( req.user && req.user.level < 3) {
    upload(req, res, err =>{
      if (err) return res.send('Loi upload Product img: ' + err);
      let {product_name,code_categories,oldtrademark,
            warranty,product_status,sort_contend,long_contend,
            normal_price,saleoff_price,datefrom,dateto,quantity,
            show,product_push,id_tenloaisp,id_tennhasx} = req.body;
      let product_name_seo = bodau(product_name);
      let anhchinh = req.files['anh01_upload'] ? req.files['anh01_upload'][0].filename : "null";
      let anhphu_01 = req.files['anh02_upload'] ? req.files['anh02_upload'][0].filename : "null";
      let anhphu_02 = req.files['anh03_upload'] ? req.files['anh03_upload'][0].filename : "null";
      let anhphu_03 = req.files['anh04_upload'] ? req.files['anh04_upload'][0].filename : "null";
      let id = 0;
      let display = 0;
      let newProduct_item = new Product_Item(id,product_name,product_name_seo,code_categories,oldtrademark,
                                              warranty,product_status,normal_price,saleoff_price,sort_contend,
                                              long_contend,quantity,datefrom,dateto,display,show,product_push,
                                              anhchinh,anhphu_01,anhphu_02,anhphu_03,id_tenloaisp,id_tennhasx);
      addNewProductItem(newProduct_item)
      .then(result => {
        res.redirect('/admin/products');
      })
      .catch(err  => console.log("Loi addNewProductItem: " + err));

    });
  } else {
    res.redirect('/admin/login');
  }
};
