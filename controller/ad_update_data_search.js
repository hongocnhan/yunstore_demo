let {getNameProductList} = require('../model/db.js');
let fs = require('fs');

module.exports = async (req, res) => {
  try {
    if (req.user && (req.user.level < 3))
    {
      let name_list = await getNameProductList();
      let tmp_array = [];

      let to_array = (list_obj) => {
        return new Promise((resolve,reject) => {
            if (list_obj.rowCount == 0) {
              return reject("Danh sach trong, khong co san pham nao!");
            } else {
              list_obj.rows.forEach(function(e) {
                tmp_array.push(e.tensanpham);
              });
              return resolve(tmp_array);
            }
        });
      };

      to_array(name_list)
      .then(result => {
          fs.writeFile('./public/data-sanpham.json',
                        JSON.stringify(result), 'utf-8',
                        err => {
                                if (err) throw err;
                                res.send(`<span style="font-size: 20px; color: green;" class="glyphicon glyphicon-ok-sign"></span>`);
                              });
      })
      .catch(err => console.log("Loi to_array: " + err));
    } else {
      res.send("_");
    }
  } catch (e) {
    console.log("Loi ad_update_data_search: " + e);
  }
};
