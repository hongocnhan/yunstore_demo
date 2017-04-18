
module.exports = (req, res) => {
  let {order_,order_list} = req.body;
  console.log('vao ajax');
  console.log(order_item);
  let html_print = `
        <div class="col-lg-12" class="text-center">
          <h2>PHIẾU XUẤT KHO KIÊM PHIẾU BẢO HÀNH</h2>
        </div>
        <div class="col-lg-12">
          <h4><strong>1. THÔNG TIN NHÀ BÁN HÀNG</strong></h4>
          <h4><strong>Công ty: </strong>YunStore Gaming Gear HCM</h4>
          <h4><strong>Địa chỉ: </strong>123 Lê Duẩn, phường Bến Thành, quận 1, HCM</h4>
          <h4><strong>Điện thoại: </strong>(08) 123456789</h4>
          <h4><strong>2. THÔNG TIN KHÁCH HÀNG</strong></h4>
          <h4><strong>Tên khách hàng: </strong>${order_item.tenkhachhang}</h4>
          <h4><strong>Địa chỉ: </strong>${order_item.diachi}</h4>
          <h4><strong>Số điện thoại: </strong>${order_item.mobile}</h4>
          <h4><strong>Đơn hàng: </strong>${order_item.madonhang}</h4>
        </div>
        <div class="col-lg-12">
          <hr>
        </div>
        <div class="col-lg-12">
          <h3>Chi tiết đơn hàng</h3>
          <div class="table-responsive">
            <table class="table table-striped" style="border: 1px solid #dbdcdd;" >
              <thead style="font-weight: bold; font-size: 18px;">
                <tr class="text-center">
                  <td>Tên sản phẩm</td>
                  <td>Số lượng</td>
                  <td>Giá</td>
                  <td>Thành tiền</td>
                </tr>
              </thead>
              <tbody>
                <%
                order_product_list.forEach( (e) => {
                  %>
                    <tr style="font-size: 16px;">
                      <td><strong><%= e.tensanpham %></strong></td>
                      <td class="text-center" ><%= e.soluong %></td>
                      <td class="text-center" ><%= numberWithCommas(e.dongia) %></td>
                      <td class="text-center" ><%= numberWithCommas(e.tong) %></td>
                    </tr>
                  <%
                })
                %>
                <tr class="text-center" style="font-size: 20px;">
                  <td></td>
                  <td></td>
                  <td>Phí gửi hàng:</td>
                  <td><%= numberWithCommas(order_item.tienship) %></td>
                </tr>
                <tr class="text-center" style="font-size: 28px;">
                  <td></td>
                  <td></td>
                  <td>Tổng:</td>
                  <td><%= numberWithCommas(order_item.tongtien) %></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-lg-12">
          <h4><strong>Xuất kho ngày: </strong></h4>
        </div>
  `;
  res.send(html_print);
}
