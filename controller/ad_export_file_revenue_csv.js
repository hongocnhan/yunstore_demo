let {getOrderListByDateRange, getProductOrderByOrderID} = require('../model/db.js');
let Q = require('q');
require('q-foreach')(Q);
let fs = require('fs');
let csv = require('fast-csv');

module.exports = async (req, res) => {
  try {
    if ( req.user && (req.user.level < 3))
    {
      let {start_date,end_date} = req.body;
      let array_to_export = [];
      let header_table = {
        madonhang: "Mã đơn hàng",
        emailkhachhang: "Email khách hàng",
        trangthaidonhang: "Trạng thái đơn hàng",
        trangthaithanhtoan: "Trạng thái thanh toán",
        tensanpham: "Tên sản phẩm",
        soluong: "Số lượng",
        dongia: "Đơn giá",
        tong: "Thành tiền"
      };
      array_to_export.push(header_table);
      let list_order_by_range = await getOrderListByDateRange(start_date,end_date);
      if (list_order_by_range.rowCount != 0) {
        Q.forEach(list_order_by_range.rows, (e) => {
          let defer = Q.defer();
          defer.resolve(
            getProductOrderByOrderID(e.madonhang)
            .then( result => {

              let madonhang = e.madonhang;
              let emailkhachhang = e.emailkhachhang;
              let trangthaidonhang = e.trangthaidonhang;
              let trangthaithanhtoan = e.trangthaithanhtoan;

              let creat_row = (array_result) => {
                return new Promise((resolve, reject) => {
                  for (let i = 0; i < array_result.rowCount; i++) {
                    let tensanpham = array_result.rows[i].tensanpham;
                    let soluong = array_result.rows[i].soluong;
                    let dongia = array_result.rows[i].dongia;
                    let tong = array_result.rows[i].tong;
                    let one_row = {
                      madonhang: madonhang,
                      emailkhachhang: emailkhachhang,
                      trangthaidonhang: trangthaidonhang,
                      trangthaithanhtoan: trangthaithanhtoan,
                      tensanpham: tensanpham,
                      soluong: soluong,
                      dongia: dongia,
                      tong: tong
                    };
                    array_to_export.push(one_row);
                  }
                  resolve(array_to_export);
                });
              };

              creat_row(result)
              .then()
              .catch(err => console.log("Loi creat_row: " + err));
            })
            .catch( err => console.log("Loi getOrderDetailByOrderID: " + err))
          );
          return defer.promise;
        }).then( result_3 => {

          csv
            .writeToPath('./public/revenue-epxort.csv',array_to_export,
            { headers: false})
            .on('finish', () => console.log('done!'));
          res.send('ok');
        });

      } else {
        csv
          .writeToPath('./public/revenue-epxort.csv',array_to_export,
          { headers: false})
          .on('finish', () => console.log('done!'));
        res.send('ok');
      }
    } else {
      res.redirect('/admin/login');
    }
  } catch (e) {
      console.log("Loi ad_export_file_revenue_csv: " + e);
  }
};
