let {getProductByID,addNewOrder,addNewOrderDetail,registry_Customer,
      getTradeMark,getCat_Product} = require('../model/db.js');
let {newOrder,newCustomer} = require('../model/classObj.js');
let {getOrder_Code} = require('../model/function_support.js');
let {send_gmail} = require('../model/sendgmail_nodemailer.js');
let moment = require('moment');
let Q = require('q');
require('q-foreach')(Q);

module.exports = (req, res) => {
  try {
      if ( req.user ) {
        let {checkbox_create_bill, username, address, phonenumber,
              company_name, company_address, tax_number, cus_note} = req.body;
        let {item_cart} = req.body;

        if (item_cart) {

          let order_code = getOrder_Code();
          let shipping_price = 0;
          let total = 0;
          let new_order;
          let text_html = `
              <h2>Xin cảm ơn quý khách đã mua sản phẩm tại YunStore</h2>
                <h3>Thông tin giao hàng.</h3>
                <h4>1. Địa chỉ giao hàng: ${address}</h4>
                <h4>2. Số điện thoại liên lạc: ${phonenumber}</h4>
                <h4>3. Mã đơn hàng: ${order_code}</h4>
                <h3>4. Thông tin đơn hàng</h3>
                <table style="border: none">
                  <thead style="font-weight: bold;">
                    <tr>
                      <td width="55%">Tên</td>
                      <td width="15%">Số lượng</td>
                      <td width="15%">Đơn giá</td>
                      <td width="15%">Thành tiền</td>
                    </tr>
                  </thead>
                  <tbody>
          `;
          let array_cart_item = [];
          Q.forEach(item_cart, (e) => {
            let defer = Q.defer();
            defer.resolve(
              getProductByID(e.id)
              .then(result =>{
                let id = e.id;
                let tensanpham = result.rows[0].tensanpham;
                let gia = 0;
                if (Date.parse(result.rows[0].km_tungay) <= Date.now() &&
                    Date.parse(result.rows[0].km_denngay) >= Date.now()){
                    gia = result.rows[0].gia_km;
                } else {
                    gia = result.rows[0].gia_thuong;
                }
                let soluong = e.quantity;
                let total_price = gia * soluong;
                let item = {
                  id: id,
                  name: tensanpham,
                  gia: gia,
                  soluong: soluong,
                  total_price: total_price
                };
                total += total_price
                array_cart_item.push(item);
              })
              .catch(err => console.log("Loi: " + err))
            );
            return defer.promise;
          }).then( async result => {
            if (checkbox_create_bill) {
              // Thông tin hóa đơn giống thông tin giao hàng
              new_order = new newOrder(order_code,req.user.email,username,address,phonenumber,total,
                                            shipping_price,username,address,tax_number,cus_note);
              await addNewOrder(new_order);
              Q.forEach(array_cart_item, (e) => {
                let defer_ = Q.defer();
                defer_.resolve(
                  addNewOrderDetail(order_code, e.name, e.soluong, e.gia, e.total_price)
                  .then(
                    result => {
                      text_html += `
                      <tr>
                        <td style="font-weight: bold;">${e.name}</td>
                        <td>${e.soluong}</td>
                        <td>${e.gia}</td>
                        <td>${e.total_price}</td>
                      </tr>
                      `;
                    })
                    .catch(err => console.log("Loi addNewOrderDetail: " + err))
                );
                return defer_.promise;
              }).then( result => {
                text_html += `
                          <tr style="font-weight:bold; font-size: 20px;">
                            <td></td>
                            <td></td>
                            <td>Tổng tiền</td>
                            <td>${total}</td>
                          </tr>
                        </tbody>
                      </table>
                `;
                send_gmail(req.user.email,text_html)
                .then( result => {

                  res.render('thanksyou', { user: req.user});
                })
                .catch(err => console.log("Loi send_gmail: " + err));
              });
            } else {
              // Thông tin hóa đơn khác thông tin giao hàng
              new_order = new newOrder(order_code,req.user.email,username,address,phonenumber,total,
                                            shipping_price,company_name,company_address,tax_number,cus_note);
              await addNewOrder(new_order);
              Q.forEach(array_cart_item, (e) => {
                let defer_ = Q.defer();
                defer_.resolve(
                  addNewOrderDetail(order_code, e.name, e.soluong, e.gia, e.total_price)
                  .then(
                    result => {
                      text_html += `
                      <tr>
                        <td style="font-weight: bold;">${e.name}</td>
                        <td>${e.soluong}</td>
                        <td>${e.gia}</td>
                        <td>${e.total_price}</td>
                      </tr>
                      `;
                    })
                    .catch(err => console.log("Loi addNewOrderDetail: " + err))
                );
                return defer_.promise;
              }).then( result => {
                text_html += `
                          <tr style="font-weight:bold; font-size: 20px;">
                            <td></td>
                            <td></td>
                            <td>Tổng tiền</td>
                            <td>${total}</td>
                          </tr>
                        </tbody>
                      </table>
                `;
                send_gmail(req.user.email,text_html)
                .then( result => {
                  res.render('thanksyou', { user: req.user});
                })
                .catch(err => console.log("Loi send_gmail: " + err));
              });
            }
            // end if else checkbox_create_bill
          });
          // end .then of Q.
        } else {
          res.redirect('/cart');
        }

      } else {

        let {checkbox_create_acc, checkbox_create_bill, email, username,address,
              phonenumber, company_name, company_address, tax_number, cus_note} = req.body;
        let {item_cart} = req.body;

        if (item_cart) {

          let order_code = getOrder_Code();
          let shipping_price = 0;
          let total = 0;
          let new_order;
          let text_html = `
              <h2>Xin cảm ơn quý khách đã mua sản phẩm tại YunStore</h2>
                <h3>Thông tin giao hàng.</h3>
                <h4>1. Địa chỉ giao hàng: ${address}</h4>
                <h4>2. Số điện thoại liên lạc: ${phonenumber}</h4>
                <h4>3. Mã đơn hàng: ${order_code}</h4>
                <h3>4. Thông tin đơn hàng</h3>
                <table style="border: none">
                  <thead style="font-weight: bold;">
                    <tr>
                      <td width="55%">Tên</td>
                      <td width="15%">Số lượng</td>
                      <td width="15%">Đơn giá</td>
                      <td width="15%">Thành tiền</td>
                    </tr>
                  </thead>
                  <tbody>
          `;
          let array_cart_item = [];
          Q.forEach(item_cart, (e) => {
            let defer = Q.defer();
            defer.resolve(
              getProductByID(e.id)
              .then(result =>{
                let id = e.id;
                let tensanpham = result.rows[0].tensanpham;
                let gia = 0;
                if (Date.parse(result.rows[0].km_tungay) <= Date.now() &&
                    Date.parse(result.rows[0].km_denngay) >= Date.now()){
                    gia = result.rows[0].gia_km;
                } else {
                    gia = result.rows[0].gia_thuong;
                }
                let soluong = e.quantity;
                let total_price = gia * soluong;
                let item = {
                  id: id,
                  name: tensanpham,
                  gia: gia,
                  soluong: soluong,
                  total_price: total_price
                };
                total += total_price
                array_cart_item.push(item);
              })
              .catch(err => console.log("Loi: " + err))
            );
            return defer.promise;
          }).then( async result => {
            // Tạo tài khoản choi người mua hàng
            if (checkbox_create_acc){
              let {passwd} = req.body;
              let new_cus = new newCustomer(username,email, passwd,moment().format('YYYY-MM-DD'),address,phonenumber);
              await registry_Customer(new_cus);
            }
            if (checkbox_create_bill) {
              // Thông tin hóa đơn giống thông tin giao hàng
              new_order = new newOrder(order_code,email,username,address,phonenumber,total,
                                            shipping_price,username,address,tax_number,cus_note);
              await addNewOrder(new_order);
              Q.forEach(array_cart_item, (e) => {
                let defer_ = Q.defer();
                defer_.resolve(
                  addNewOrderDetail(order_code, e.name, e.soluong, e.gia, e.total_price)
                  .then(
                    result => {
                      text_html += `
                      <tr>
                        <td style="font-weight: bold;">${e.name}</td>
                        <td>${e.soluong}</td>
                        <td>${e.gia}</td>
                        <td>${e.total_price}</td>
                      </tr>
                      `;
                    })
                    .catch(err => console.log("Loi addNewOrderDetail: " + err))
                );
                return defer_.promise;
              }).then( result => {
                text_html += `
                          <tr style="font-weight:bold; font-size: 20px;">
                            <td></td>
                            <td></td>
                            <td>Tổng tiền</td>
                            <td>${total}</td>
                          </tr>
                        </tbody>
                      </table>
                `;
                send_gmail(email,text_html)
                .then( result => {
                  res.render('thanksyou', { user: req.user});
                })
                .catch(err => console.log("Loi send_gmail: " + err));
              });
            } else {
              // Thông tin hóa đơn khác thông tin giao hàng
              new_order = new newOrder(order_code,email,username,address,phonenumber,total,
                                            shipping_price,company_name,company_address,tax_number,cus_note);
              await addNewOrder(new_order);
              Q.forEach(array_cart_item, (e) => {
                let defer_ = Q.defer();
                defer_.resolve(
                  addNewOrderDetail(order_code, e.name, e.soluong, e.gia, e.total_price)
                  .then(
                    result => {
                      text_html += `
                      <tr>
                        <td style="font-weight: bold;">${e.name}</td>
                        <td>${e.soluong}</td>
                        <td>${e.gia}</td>
                        <td>${e.total_price}</td>
                      </tr>
                      `;
                    })
                    .catch(err => console.log("Loi addNewOrderDetail: " + err))
                );
                return defer_.promise;
              }).then( result => {
                text_html += `
                          <tr style="font-weight:bold; font-size: 20px;">
                            <td></td>
                            <td></td>
                            <td>Tổng tiền</td>
                            <td>${total}</td>
                          </tr>
                        </tbody>
                      </table>
                `;
                send_gmail(email,text_html)
                .then( result => {
                  res.render('thanksyou', { user: req.user});
                })
                .catch(err => console.log("Loi send_gmail: " + err));
              });
            }
            // end if else checkbox_create_bill
          });
          // end .then of Q.
        } else {
          res.redirect('/cart');
        }
      }
      // end if else req.user
  } catch (e) {
    console.log("Loi checkout_complete: " + e);
  }
};
