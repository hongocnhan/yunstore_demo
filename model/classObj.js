let moment = require('moment');

class Customer{
  constructor(id_cus,username,datepicker_input,sex,diachi,dtdidong){
    this.id_cus = id_cus;
    this.username = username;
    this.datepicker_input = datepicker_input;
    this.sex = sex;
    this.diachi = diachi;
    this.dtdidong = dtdidong;
  }
}

class newCustomer{
  constructor(name,email,password,datepicker_dob,diachi,dtdidong){
    this.username = name;
    this.email = email;
    this.password = password;
    this.datepicker_dob = datepicker_dob;
    this.diachi = diachi;
    this.dtdidong = dtdidong;
  }
}

class user_Info{
  constructor(id, name, level, sex, dob, address, phonenum) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.sex = sex;
    this.dob = dob;
    this.address = address;
    this.phonenum = phonenum;
  }
}

class newUser_info{
  constructor(username,email,datepicker_dob,sex,diachi,dtdidong,user_level,passwd,point) {
    this.username = username;
    this.email = email;
    this.datepicker_dob = datepicker_dob;
    this.sex = sex;
    this.diachi = diachi;
    this.dtdidong = dtdidong;
    this.user_level = user_level;
    this.passwd = passwd;
    this.point = point;
  }
}

class Product_Item{
  constructor(id,product_name,product_name_seo,code_categories,oldtrademark,
              warranty,product_status,normal_price,saleoff_price,sort_contend,
              long_contend,quantity,datefrom,dateto,display,show,product_push,
              anhchinh,anhphu_01,anhphu_02,anhphu_03,id_tenloaisp,id_tennhasx) {
    this.id = id;
    this.product_name = product_name;
    this.product_name_seo = product_name_seo;
    this.code_categories = code_categories;
    this.oldtrademark = oldtrademark;
    this.warranty = warranty;
    this.product_status = product_status;
    this.normal_price = normal_price;
    this.saleoff_price = saleoff_price;
    this.sort_contend = sort_contend;
    this.long_contend = long_contend;
    this.quantity = quantity;
    this.datefrom = datefrom;
    this.dateto = dateto;
    this.display = display;
    this.show = show;
    this.product_push = product_push;
    this.anhchinh = anhchinh;
    this.anhphu_01 = anhphu_01;
    this.anhphu_02 = anhphu_02;
    this.anhphu_03 = anhphu_03;
    this.id_tenloaisp = id_tenloaisp;
    this.id_tennhasx = id_tennhasx;
  }
}

class newOrder{
  constructor(order_code,email,username,address,phonenumber,total,
              shipping_price,company_name,company_address,tax_number,cus_note) {
    this.madonhang = order_code;
    this.tenkhachhang = username;
    this.emailkhachhang = email;
    this.mobile = phonenumber;
    this.diachi = address;
    this.yeucaukhac = cus_note;
    this.trangthaidonhang = 1;
    this.ngaybatdau = moment().format('YYYY-MM-DD');
    this.ngayketthuc = 'NULL';
    this.tienhang = total;
    this.tienship = shipping_price;
    this.tongtien = shipping_price + total;
    this.lydohuy = "";
    this.hd_congty = company_name;
    this.hd_tax_code = tax_number;
    this.hd_diachi = company_address;
    this.trangthaithanhtoan = 1;
  }
}

class bannerAds{
  constructor(id, tieude, noidung, linkanh, lienket) {
    this.id = id;
    this.tieude = tieude;
    this.noidung = noidung;
    this.linkanh = linkanh;
    this.lienket = lienket;
  }
}



module.exports = {Customer, newCustomer, user_Info, newUser_info, Product_Item,
                  newOrder, bannerAds};
