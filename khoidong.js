const express = require ('express');
const passport = require('passport');
const parser = require('body-parser').urlencoded({extended: true});
const app = express();

require('./model/passport__local')(passport);

let {findEmailUser,findProductName} = require('./model/db.js');
let {bodau} = require('./model/bodau.js');

app.set('view engine','ejs');
app.set('views', ['./views/frontend','./views/backend']);

app.use(express.static('public'));
app.use('/img_',express.static('public/images'));
app.use('/err',express.static('public/err'));
app.use(require('cookie-parser')());
app.use(parser);
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Global variable
const maxValue_CategoryPage = 12;


// FrontEnd
// Home page
app.get('/', require('./controller/showIndex.js'));
app.get('/paging_homepage_keyboard/:pageNumber', require('./controller/paging_HomePage_Keyboard.js'));
app.get('/paging_homepage_mouse/:pageNumber', require('./controller/paging_HomePage_Mouse.js'));
app.get('/paging_homepage_headphone/:pageNumber', require('./controller/paging_HomePage_Headphone.js'));

//// Page categories
app.get('/categories/:catProduct', require('./controller/showPageCat.js'));
app.get('/paging_product_categories/:catProduct/:pageNumber', require('./controller/paging_Product_Categories.js'))

//// Page TradeMark
app.get('/trademark/:categories_seo/:trademark_seo', require('./controller/showPageTrademark.js'));
app.get('/paging_product_trademark/:categories_seo/:trademark_seo/:pageNumber', require('./controller/paging_Product_Trademark.js'));

// Product Detail
app.get('/product/:productname_seo', require('./controller/showPageProductDetail.js'));

// Shopping Cart
app.get('/cart', require('./controller/showPageCart.js'));
app.get('/checkout', require('./controller/showPageCheckout.js'));
app.post('/checkout_yes',
  passport.authenticate('local', { successRedirect: '/checkout', failureRedirect: '/checkout' })
);
app.post('/checkout_no', require('./controller/showPageCheckoutNo.js'));
app.post('/checkout_complete', require('./controller/checkout_complete.js'));

// Login Customer
app.get('/login', require('./controller/showPageLogin.js'));
app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
);

//Logout Customer
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Customer Profile
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  require('./controller/showPageProfile.js')
);
app.post('/profile_customer_update', require('./controller/Profile_Customer_Update.js'));
app.get('/change_password', require('./controller/showPageProfile_ChangePasswd.js'));
app.post('/change_password', require('./controller/Profile_Customer_Changpasswd.js'));
app.post('/shopping_orders_history', require('./controller/shopping_orders_history.js'));

// Registry Customer
app.get('/registry', require('./controller/showPageRegistry.js'));
app.post('/registry', require('./controller/Registry_Customter.js'));

// Lost Password Account
app.get('/forgotpasswd', require('./controller/showPageForgot_Password.js'));
app.post('/resetpassword', require('./controller/send_mail_reset.js'));


// BackEnd
// login page
app.get('/admin/login', require('./controller/ad_showPageLogin.js'));
app.post('/admin/login',
  passport.authenticate('local', { successRedirect: '/admin/home', failureRedirect: '/admin/login' })
);

// logout
app.get('/admin/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});

// Admin Home
app.get('/admin/home', require('./controller/ad_showPageHome.js'));

// Admin Banner
app.get('/admin/bannerads', require('./controller/ad_showPageBannerAds.js'));
app.post('/admin/update_banner', require('./controller/ad_update_banner.js'));

// Order page
app.get('/admin/orders', require('./controller/ad_showPageOrders.js'));
app.get('/admin/new_orders', require('./controller/ad_showPageNewOrders.js'));
app.get('/admin/running_orders', require('./controller/ad_showPageRunningOrders.js'));
app.get('/admin/success_orders', require('./controller/ad_showPageSuccessOrders.js'));
app.get('/admin/fail_orders', require('./controller/ad_showPageFailOrders.js'));
app.get('/admin/detail_order/:orderID', require('./controller/ad_showPageDetailOrder.js'));
app.post('/admin/new_to_running_orders', require('./controller/ad_new_to_running_order.js'));
app.post('/admin/new_to_cancel_orders', require('./controller/ad_new_to_cancel_order.js'));
app.post('/admin/running_to_success_orders', require('./controller/ad_running_to_success_order.js'));
app.post('/admin/running_to_cancel_orders', require('./controller/ad_running_to_cancel_order.js'));
app.post('/admin/success_to_running_orders', require('./controller/ad_success_to_running_order.js'));
app.post('/admin/success_to_cancel_orders', require('./controller/ad_success_to_cancel_order.js'));
app.post('/admin/cancel_to_new_orders', require('./controller/ad_cancel_to_new_order.js'));
app.post('/admin/cancel_to_running_orders', require('./controller/ad_cancel_to_running_order.js'));
app.post('/admin/cancel_to_success_orders', require('./controller/ad_cancel_to_success_order.js'));

// Product page
app.get('/admin/products', require('./controller/ad_showPageProducts.js'));
app.get('/admin/products_detail/:productID', require('./controller/ad_showPageProductDetail.js'));
app.post('/admin/products_detail_update', require('./controller/ad_product_update.js'));
app.post('/admin/check_name_product', require('./controller/check_name_product.js'));
app.post('/admin/products_add', require('./controller/ad_products_add.js'));
app.post('/admin/delete_product_by_id', require('./controller/ad_delete_product_by_id.js'));
app.get('/admin/ajax_trademark_list/:categories', require('./controller/ad_ajax_trademarklist.js'));

// Categories page
app.get('/admin/categories', require('./controller/ad_showPageCategories.js'));
app.post('/admin/categories_update', require('./controller/ad_categories_update.js'));
app.post('/admin/categories_add', require('./controller/ad_categories_add.js'));
app.post('/admin/categories_del_all', require('./controller/ad_categories_del_all.js'));

// Trademark page
app.get('/admin/trademark/:categories_seo/:categories_id', require('./controller/ad_showPageTrademark.js'));
app.post('/admin/trademark_update', require('./controller/ad_trademark_update.js'));
app.post('/admin/trademark_add', require('./controller/ad_trademark_add.js'));
app.post('/admin/trademark_del_all', require('./controller/ad_trademark_del_all.js'));

// Revenue page
app.get('/admin/revenue', require('./controller/ad_showPageRevenue.js'));
app.post('/admin/export_file_revenue_csv', require('./controller/ad_export_file_revenue_csv.js'));
app.get('/revenue/dowloadfile', (req, res) => {
  res.download('./public/revenue-epxort.csv','revenueYunStore.csv');
});

// Users page
app.get('/admin/users', require('./controller/ad_showPageUsers.js'));
app.get('/admin/user_profile/:id', require('./controller/ad_showPageUserProfile.js'));
app.post('/admin/user_profile_update', require('./controller/ad_user_profile_update.js'));
app.post('/admin/user_profile_changepasswd', require('./controller/ad_user_profile_changepasswd.js'));
app.post('/admin/user_profile_add', require('./controller/ad_user_profile_add.js'));
app.post('/admin/check_new_email', require('./controller/ad_check_new_email.js'));
app.post('/admin/user_profile_delete', require('./controller/ad_user_profile_del.js'));

// profile Account
app.get('/admin/account_profile', require('./controller/ad_showPageAccProfile.js'));
app.post('/admin/account_profile_update', require('./controller/ad_acc_profile_update.js'));
app.post('/admin/account_profile_changepasswd', require('./controller/ad_acc_profile_changepasswd.js'));

// Export file json Product name listen
app.get('/admin/update_data_search', require('./controller/ad_update_data_search.js'));

// Handle 404
app.use(function (req, res, next) {
    res.render('404_page', {
      user: req.user
    });
})

app.listen(process.env.PORT || 8000, () => console.log('Server Start'));
