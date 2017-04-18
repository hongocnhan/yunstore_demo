let {encrypt_pass} = require('./crypto_passwd.js');
const pg = require('pg');

// // Run localhost
// const config = {
//   user: 'postgres', //env var: PGUSER
//   database: 'Yunstore', //env var: PGDATABASE
//   password: '123', //env var: PGPASSWORD
//   host: 'localhost', // Server hosting the postgres database
//   port: 5432, //env var: PGPORT
//   max: 10, // max number of clients in the pool; gia tri -1 và vô hạn
//   idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
// };
//
// let pool = new pg.Pool(config);
//
// let query = (sql,data) => {
//   return new Promise((resolve, reject) => {
//     pool.connect((err, client, done) => {
//       if(err) return reject(err);
//       done();
//       client.query(sql,data, (err, result) => {
//         if(err) return reject(err);
//         resolve(result);
//       });
//     });
//   })
// }


// Run Heroku
var URI = 'postgres://xxxwzxjwgpwruc:2ac7094e3f9fbaa842dab24c0e94f27914009943d3a08c9f527566409fd737ef@ec2-54-221-244-196.compute-1.amazonaws.com:5432/damv7uueb6dp5d';

let query = (sql,data) => {
  return new Promise((resolve, reject) => {
    pg.connect(URI,(err, client, done) => {
      if(err) return reject(err);
      done();
      client.query(sql,data, (err, result) => {
        if(err) return reject(err);
        resolve(result);
      });
    });
  })
}

function getBannerCenter(){
  let sql = `SELECT * FROM "BannerCenter" ORDER BY id ASC`;
  return query(sql,[]);
}

function getTradeMark(){
  let sql = `SELECT * FROM "Hangsanxuat" ORDER BY id ASC;`;
  return query(sql,[]);
}

function getCat_Product(){
  let sql = `SELECT * FROM "Loaisp" ORDER BY id ASC;`;
  return query(sql,[]);
}

function getListProductByPush_forSlice(){
  let sql = `SELECT * FROM "Sanpham" WHERE sp_push = '1' AND hienthi = '1' ORDER BY id DESC`;
  return query(sql,[]);
}

function getListProductByCat(cat_product,maxValue,pos_start){
  let sql = `SELECT * FROM "Sanpham" WHERE tenloaisp_seo = $1 AND hienthi = '1' ORDER BY id DESC LIMIT $2 OFFSET $3`;
  return query(sql,[cat_product,maxValue,pos_start]);
}

function getCountProductByPush(){
  let sql = `SELECT COUNT(*) FROM "Sanpham" WHERE sp_push = '1' AND hienthi = '1'`;
  return query(sql,[]);
}

function getCountProductByCat(cat_product){
  let sql = `SELECT COUNT(*) FROM "Sanpham" WHERE tenloaisp_seo = $1 AND hienthi = '1'`;
  return query(sql,[cat_product]);
}

function getCountProductByCatandTrade(categories_seo,trademark_seo){
  let sql = `SELECT COUNT(*) FROM "Sanpham" WHERE tenloaisp_seo = $1 AND tennhasx_seo = $2 AND hienthi = '1'`;
  return query(sql,[categories_seo,trademark_seo]);
}

function getListProductByCatandTrade(categories_seo,trademark_seo,maxValue,pos_start){
  let sql = `SELECT *
            FROM "Sanpham"
            WHERE tenloaisp_seo = $1 AND tennhasx_seo = $2 AND hienthi = '1'
            ORDER BY id DESC
            LIMIT $3 OFFSET $4`;
  return query(sql,[categories_seo,trademark_seo,maxValue,pos_start]);
}

function getProductByProductname_seo(productname_seo){
  let sql = `SELECT * FROM "Sanpham" WHERE tensanpham_seo = $1 AND hienthi = '1';`;
  return query(sql,[productname_seo]);
}

function findEmailUser(email){
  let sql = `SELECT * FROM "User" WHERE email = $1`;
  return query(sql,[email]);
}

function updateCustomterInfoByID(customer){
  let sql = `UPDATE "User"
	           SET name = $2, dob = $3, sex = $4, address =$5, phonenum = $6
	           WHERE id = $1`;
  return query(sql,[customer.id_cus,customer.username,customer.datepicker_input,customer.sex,customer.diachi,customer.dtdidong]);
}

function registry_Customer(user){
  let sql = `INSERT INTO public."User"(
	name, passwd, email, level, sex, dob, address, phonenum, point)
	VALUES ($1, $2, $3, '3', 'male', $4, $5, $6, '0')`;
  return query(sql,[user.username,encrypt_pass(user.password),user.email,user.datepicker_dob,user.diachi,user.dtdidong]);
}

function updateCustomerPasswd(id, passwd){
  let sql = `UPDATE "User" SET passwd = $2
	           WHERE id = $1`;
  return query(sql,[id,encrypt_pass(passwd)]);
}

function updateTrademarkByID(trademark_id,renewtrademark,renewtrademark_seo) {
  let sql = `UPDATE "Hangsanxuat" SET tennhasx = $2 AND tennhasx_seo = $3
	           WHERE id = $1`;
  return query(sql,[trademark_id,renewtrademark,renewtrademark_seo]);
}

function getTrademarkListByCat(categories) {
  let sql = `SELECT * FROM "Hangsanxuat" WHERE tenloaisp_seo = $1 ORDER BY id ASC;`;
  return query(sql,[categories]);
}

function addNewCategories(newcategories,newcategories_seo) {
  let sql = `INSERT INTO public."Loaisp"(tenloaisp,tenloaisp_seo)
	           VALUES ($1, $2)`;
  return query(sql,[newcategories,newcategories_seo]);
}

function updateCatTableByID(categories_id,renewcategories,renewcategories_seo) {
  let sql = `UPDATE public."Loaisp"
	           SET tenloaisp = $2, tenloaisp_seo = $3
             WHERE id = $1`;
  return query(sql,[categories_id,renewcategories,renewcategories_seo]);
}

function addNewTrademark(newtrademark,newtrademark_seo,newtrade_categories_name,newtrade_categories_id) {
  let sql = `INSERT INTO public."Hangsanxuat"(tennhasx,tennhasx_seo,tenloaisp_seo,id_loaisp)
	           VALUES ($1, $2, $3 ,$4)`;
  return query(sql,[newtrademark,newtrademark_seo,newtrade_categories_name,newtrade_categories_id]);
}

function updateTradeByID(renewtrademark_id,renewtrademark,renewtrademark_seo) {
  let sql = `UPDATE "Hangsanxuat"
             SET tennhasx = $2, tennhasx_seo = $3
	           WHERE id = $1`;
  return query(sql,[renewtrademark_id,renewtrademark,renewtrademark_seo]);
}

function updateTradeTableByCatID(categories_id,renewcategories_seo) {
  let sql = `UPDATE "Hangsanxuat" SET tenloaisp_seo = $2
	           WHERE id_loaisp = $1`;
  return query(sql,[categories_id,renewcategories_seo]);
}

function updateProductTableByCatID(categories_id,renewcategories_seo) {
  let sql = `UPDATE "Sanpham" SET tenloaisp_seo = $2
	           WHERE id_tenloaisp = $1`;
  return query(sql,[categories_id,renewcategories_seo]);
}

function updateProductTableByTradeID(renewtrademark_id,renewtrademark_seo) {
  let sql = `UPDATE "Sanpham" SET tennhasx_seo = $2
             WHERE id_tennhasx = $1`;
  return query(sql,[renewtrademark_id,renewtrademark_seo]);
}

function getUserList() {
  let sql = `SELECT * FROM "User" ORDER BY id ASC`;
  return query(sql,[]);
}

function getUserByID(userID) {
  let sql = `SELECT * FROM "User" WHERE id = $1`;
  return query(sql,[userID]);
}

function updateUserInfoByID(user_info) {
  let sql = `UPDATE "User"
             SET name = $2, level = $3, sex = $4, dob = $5, address =$6, phonenum = $7
	           WHERE id = $1`;
  return query(sql,[user_info.id, user_info.name, user_info.level, user_info.sex, user_info.dob, user_info.address, user_info.phonenum]);
}

function addNewUser(newUser_info) {
  let sql = `INSERT INTO public."User"(
	           name, passwd, email, level, sex, dob, address, phonenum, point)
	           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  return query(sql,[newUser_info.username,newUser_info.passwd,newUser_info.email,
                    newUser_info.user_level,newUser_info.sex,newUser_info.datepicker_dob,
                    newUser_info.diachi,newUser_info.dtdidong,newUser_info.point]);
}

function delUserByID(userID) {
  let sql = `DELETE FROM "User"
	           WHERE id = $1`;
  return query(sql,[userID]);
}

function getProductList() {
  let sql = `SELECT * FROM "Sanpham" ORDER BY id ASC`;
  return query(sql,[]);
}

function getProductByID(productID){
  let sql = `SELECT * FROM "Sanpham" WHERE id = $1`;
  return query(sql,[productID]);
}

function findProductName(product_name_seo) {
  let sql = `SELECT * FROM "Sanpham" WHERE tensanpham_seo = $1`;
  return query(sql,[product_name_seo]);
}

function addNewProductItem(newProduct_item) {
  let sql = `INSERT INTO "Sanpham"(
	           tensanpham, tensanpham_seo, tenloaisp_seo, tennhasx_seo, baohanh, tinhtrang, gia_thuong, gia_km,
             noidung_ngan, noidung_dai, soluong, km_tungay, km_denngay, luotxem, hienthi, sp_push, anh_01,
             anh_02, anh_03, anh_04, id_tenloaisp, id_tennhasx)
	           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`;
  return query(sql,[newProduct_item.product_name,newProduct_item.product_name_seo,newProduct_item.code_categories,newProduct_item.oldtrademark,
                    newProduct_item.warranty,newProduct_item.product_status,newProduct_item.normal_price,newProduct_item.saleoff_price,
                    newProduct_item.sort_contend,newProduct_item.long_contend,newProduct_item.quantity,newProduct_item.datefrom,newProduct_item.dateto,
                    '0',newProduct_item.show,newProduct_item.product_push,newProduct_item.anhchinh,newProduct_item.anhphu_01,newProduct_item.anhphu_02,
                    newProduct_item.anhphu_03,newProduct_item.id_tenloaisp,newProduct_item.id_tennhasx])
}

function addNewOrder(newOrder) {
  let sql = `INSERT INTO "Donhang"(
	           madonhang, tenkhachhang, emailkhachhang, mobile, diachi, yeucaukhac,
             trangthaidonhang, ngaybatdau, ngayketthuc, tienhang, tienship, tongtien,
             lydohuy, hd_congty, hd_tax_code, hd_diachi, trangthaithanhtoan, ngayguihang)
	           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NULL, $9, $10, $11, $12, $13, $14, $15, $16, NULL)`;
  return query(sql,[newOrder.madonhang, newOrder.tenkhachhang, newOrder.emailkhachhang, newOrder.mobile, newOrder.diachi, newOrder.yeucaukhac,
                    newOrder.trangthaidonhang, newOrder.ngaybatdau, newOrder.tienhang, newOrder.tienship, newOrder.tongtien,
                    newOrder.lydohuy, newOrder.hd_congty, newOrder.hd_tax_code, newOrder.hd_diachi, newOrder.trangthaithanhtoan]);
}

function addNewOrderDetail(order_code, product_name, product_quantity, product_price, product_total) {
  let sql = `INSERT INTO "Chitietdonhang"(
	            madonhang, tensanpham, soluong, dongia, tong)
	            VALUES ($1, $2, $3, $4, $5)`;
  return query(sql,[order_code, product_name, product_quantity, product_price, product_total]);
}

function getOrder_List() {
  let sql = `SELECT * FROM "Donhang" ORDER BY id ASC`;
  return query(sql,[]);
}

function getOrderListByCODE(code_status) {
  let sql = `SELECT * FROM "Donhang"
              WHERE trangthaidonhang = $1 ORDER BY id ASC`;
  return query(sql,[code_status]);
}

function getOrderDetailByOrderID(orderID) {
  let sql = `SELECT * FROM "Donhang"
              WHERE madonhang = $1`;
  return query(sql,[orderID]);
}

function getProductOrderByOrderID(orderID) {
  let sql = `SELECT * FROM "Chitietdonhang"
              WHERE madonhang = $1`;
  return query(sql,[orderID]);
}

function ReardyToShip(orderID,numberStatus,day_send) {
  let sql = `UPDATE "Donhang"
             SET trangthaidonhang = $2, ngayguihang = $3
	           WHERE madonhang = $1`;
  return query(sql,[orderID,numberStatus,day_send]);
}

function CancelNewOrderByOrderID(orderID,numberStatus,day_cancel,note) {
  let sql = `UPDATE "Donhang"
             SET trangthaidonhang = $2, ngayketthuc = $3, lydohuy = $4
	           WHERE madonhang = $1`;
  return query(sql,[orderID,numberStatus,day_cancel,note]);
}

function FinishOrderByOrderID(orderID,numberStatus,paymentStatus,day_cancel) {
  let sql = `UPDATE "Donhang"
             SET trangthaidonhang = $2, trangthaithanhtoan = $3, ngayketthuc = $4
	           WHERE madonhang = $1`;
  return query(sql,[orderID,numberStatus,paymentStatus,day_cancel]);
}

function CancelOrderRunningByOrderID(orderID,numberStatus,paymentStatus,day_cancel,note) {
  let sql = `UPDATE "Donhang"
             SET trangthaidonhang = $2, trangthaithanhtoan = $3, ngayketthuc = $4, lydohuy = $5
	           WHERE madonhang = $1`;
  return query(sql,[orderID,numberStatus,paymentStatus,day_cancel,note]);
}

function CancelStatusToOrtherStatusOrderByOrderID(orderID,numberStatus,paymentStatus,note) {
  let sql = `UPDATE "Donhang"
             SET trangthaidonhang = $2, trangthaithanhtoan = $3, lydohuy = $4
	           WHERE madonhang = $1`;
  return query(sql,[orderID,numberStatus,paymentStatus,note]);
}

function SuccessStatusToOrtherStatusOrderByOrderID(orderID,numberStatus,paymentStatus,note) {
  let sql = `UPDATE "Donhang"
             SET trangthaidonhang = $2, trangthaithanhtoan = $3, lydohuy = $4
	           WHERE madonhang = $1`;
  return query(sql,[orderID,numberStatus,paymentStatus,note]);
}

function getOrderListByDateRange(start_date,end_date) {
  let sql = `SELECT * FROM "Donhang"
              WHERE  ngaybatdau >= $1 AND ngaybatdau <= $2 ORDER BY ngaybatdau ASC`;
  return query(sql,[start_date,end_date]);
}

function updateBannerAds(item) {
  let sql = `UPDATE "BannerCenter"
              SET tieude = $2, noidung = $3, linkanh = $4, lienket = $5
              WHERE id = $1 `;
  return query(sql,[item.id,item.tieude,item.noidung,item.linkanh,item.lienket]);
}

function delProductByID(id_product) {
  let sql = `DELETE FROM "Sanpham"
              WHERE id = $1`;
  return query(sql,[id_product]);
}

function updateProductByID(product_item) {
  let sql = `UPDATE "Sanpham"
	           SET tensanpham = $2, tensanpham_seo = $3, tenloaisp_seo = $4, tennhasx_seo = $5,
                  baohanh = $6, tinhtrang = $7, gia_thuong = $8, gia_km = $9, noidung_ngan = $10,
                  noidung_dai = $11, soluong = $12, km_tungay = $13, km_denngay = $14, hienthi = $15,
                  sp_push = $16, anh_01 = $17, anh_02 = $18, anh_03 = $19, anh_04 = $20, id_tenloaisp = $21, id_tennhasx = $22
	           WHERE id = $1`;
  return query(sql,[product_item.id, product_item.product_name, product_item.product_name_seo, product_item.code_categories, product_item.oldtrademark,
                    product_item.warranty, product_item.product_status, product_item.normal_price, product_item.saleoff_price, product_item.sort_contend,
                    product_item.long_contend, product_item.quantity, product_item.datefrom, product_item.dateto, product_item.show,
                    product_item.product_push, product_item.anhchinh, product_item.anhphu_01, product_item.anhphu_02, product_item.anhphu_03,
                    product_item.id_tenloaisp, product_item.id_tennhasx]);
}

function getTrademarkListByCatID(categories_id) {
  let sql = `SELECT * FROM "Hangsanxuat" WHERE id_loaisp = $1 ORDER BY id ASC;`;
  return query(sql,[categories_id]);
}

function getNameProductList() {
  let sql = `SELECT tensanpham FROM "Sanpham" ORDER BY tensanpham ASC`;
  return query(sql,[]);
}

function delProductTableByTrademarkID(id_trademark) {
  let sql = `DELETE FROM "Sanpham"
	           WHERE id_tennhasx = $1`;
  return query(sql,[id_trademark]);
}

function delTrademarkTableByTrademarkID(id_trademark) {
  let sql = `DELETE FROM "Hangsanxuat"
	           WHERE id = $1`;
  return query(sql,[id_trademark]);
}

function delProductTableByCatID(id_categories) {
  let sql = `DELETE FROM "Sanpham"
	           WHERE id_tenloaisp = $1`;
  return query(sql,[id_categories]);
}

function delTrademarkTableByCatID(id_categories) {
  let sql = `DELETE FROM "Hangsanxuat"
	           WHERE id_loaisp = $1`;
  return query(sql,[id_categories]);
}

function delCategoriesTableByCatID(id_categories){
  let sql = `DELETE FROM "Loaisp"
	           WHERE id = $1`;
  return query(sql,[id_categories]);
}

function getOrderListByUser(email_user) {
  let sql = `SELECT * FROM "Donhang"
              WHERE emailkhachhang = $1 ORDER BY id DESC`;
  return query(sql,[email_user])
}

module.exports = {getTradeMark, getCat_Product, getListProductByPush_forSlice,
                  getListProductByCat, getCountProductByPush, getCountProductByCat, getCountProductByCatandTrade,
                  getListProductByCatandTrade, getProductByProductname_seo, findEmailUser, updateCustomterInfoByID,
                  registry_Customer, updateCustomerPasswd, updateTrademarkByID, getTrademarkListByCat,
                  addNewCategories, updateCatTableByID, addNewTrademark, updateTradeByID, updateTradeTableByCatID,
                  updateProductTableByCatID, updateProductTableByTradeID, getUserList, getUserByID, updateUserInfoByID,
                  addNewUser, delUserByID, getProductList, getProductByID, findProductName, addNewProductItem,
                  addNewOrder, addNewOrderDetail, getOrder_List, getOrderListByCODE, getOrderDetailByOrderID, getProductOrderByOrderID,
                  ReardyToShip, CancelNewOrderByOrderID, FinishOrderByOrderID, CancelOrderRunningByOrderID, CancelStatusToOrtherStatusOrderByOrderID,
                  SuccessStatusToOrtherStatusOrderByOrderID, getOrderListByDateRange, getBannerCenter, updateBannerAds, delProductByID,
                  updateProductByID, getTrademarkListByCatID, getNameProductList, delProductTableByTrademarkID, delTrademarkTableByTrademarkID,
                  delProductTableByCatID, delTrademarkTableByCatID, delCategoriesTableByCatID, getOrderListByUser};
