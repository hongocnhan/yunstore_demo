let {Product_Item} = require('../model/classObj.js');
let {getManyFieldnameUpload} = require('../model/upload.js');
let {bodau} = require('../model/bodau.js');
let {findProductName,updateProductByID} = require('../model/db.js');
let {randomValueBase64} = require('../model/crypto_passwd.js');

let upload = getManyFieldnameUpload('anh01_upload','anh02_upload','anh03_upload','anh04_upload');
module.exports = (req, res) => {
  try {
    if (req.user && req.user.level < 3) {
      upload( req, res, err => {
        if (err) return res.send('Loi upload Product img: ' + err);
        let {id_product,product_name,product_name_old,code_categories,oldtrademark,
              warranty,product_status,sort_contend,long_contend,
              normal_price,saleoff_price,datefrom,dateto,quantity,
              anh_01_old, anh_02_old, anh_03_old, anh_04_old,
              show,product_push,id_tenloaisp,id_tennhasx} = req.body;
        let product_name_seo = bodau(product_name);
        let display = 0;
        if (product_name == product_name_old) {
          // Nếu tên không đổi
          let anhchinh = req.files['anh01_upload'] ? req.files['anh01_upload'][0].filename : anh_01_old;
          let anhphu_01 = req.files['anh02_upload'] ? req.files['anh02_upload'][0].filename : anh_02_old;
          let anhphu_02 = req.files['anh03_upload'] ? req.files['anh03_upload'][0].filename : anh_03_old;
          let anhphu_03 = req.files['anh04_upload'] ? req.files['anh04_upload'][0].filename : anh_04_old;

          let product_item = new Product_Item(id_product,product_name,product_name_seo,code_categories,oldtrademark,
                                                  warranty,product_status,normal_price,saleoff_price,sort_contend,
                                                  long_contend,quantity,datefrom,dateto,display,show,product_push,
                                                  anhchinh,anhphu_01,anhphu_02,anhphu_03,id_tenloaisp,id_tennhasx);
          updateProductByID(product_item)
          .then(result => {
            res.redirect(`/admin/products_detail/${id_product}`)
          })
          .catch(err => console.log("Loi updateProductByID: " + err));
        } else {
          findProductName(product_name_seo)
          .then(result => {
            if (result.rowCount) {
              // Nếu tên mới trùng tên đã tồn tại
              let random_code = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
              console.log(random_code);
              let productname_append = product_name + "_" + random_code;
              product_name_seo = bodau(productname_append);

              let anhchinh = req.files['anh01_upload'] ? req.files['anh01_upload'][0].filename : anh_01_old;
              let anhphu_01 = req.files['anh02_upload'] ? req.files['anh02_upload'][0].filename : anh_02_old;
              let anhphu_02 = req.files['anh03_upload'] ? req.files['anh03_upload'][0].filename : anh_03_old;
              let anhphu_03 = req.files['anh04_upload'] ? req.files['anh04_upload'][0].filename : anh_04_old;

              let product_item = new Product_Item(id_product,productname_append,product_name_seo,code_categories,oldtrademark,
                                                      warranty,product_status,normal_price,saleoff_price,sort_contend,
                                                      long_contend,quantity,datefrom,dateto,display,show,product_push,
                                                      anhchinh,anhphu_01,anhphu_02,anhphu_03,id_tenloaisp,id_tennhasx);
              updateProductByID(product_item)
              .then(result => {
                res.redirect(`/admin/products_detail/${id_product}`)
              })
              .catch(err => console.log("Loi updateProductByID: " + err));
            } else {
              // Nếu tên mới không trùng
              let anhchinh = req.files['anh01_upload'] ? req.files['anh01_upload'][0].filename : anh_01_old;
              let anhphu_01 = req.files['anh02_upload'] ? req.files['anh02_upload'][0].filename : anh_02_old;
              let anhphu_02 = req.files['anh03_upload'] ? req.files['anh03_upload'][0].filename : anh_03_old;
              let anhphu_03 = req.files['anh04_upload'] ? req.files['anh04_upload'][0].filename : anh_04_old;

              let product_item = new Product_Item(id_product,product_name,product_name_seo,code_categories,oldtrademark,
                                                      warranty,product_status,normal_price,saleoff_price,sort_contend,
                                                      long_contend,quantity,datefrom,dateto,display,show,product_push,
                                                      anhchinh,anhphu_01,anhphu_02,anhphu_03,id_tenloaisp,id_tennhasx);
              updateProductByID(product_item)
              .then(result => {
                res.redirect(`/admin/products_detail/${id_product}`)
              })
              .catch(err => console.log("Loi updateProductByID: " + err));
            }
          })
          .catch(err => console.log("Loi findProductName: " + err));
        }
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
    console.log("Loi update sp: " + e);
  }
};
