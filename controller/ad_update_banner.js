let {bannerAds} = require('../model/classObj.js');
let {updateBannerAds} = require('../model/db.js');
let {getBannerFieldnameUpload} = require('../model/upload.js')

let upload = getBannerFieldnameUpload('anh01_upload','anh02_upload','anh03_upload','anh04_upload','anh05_upload');
module.exports = (req, res) => {
    try {
      if (req.user && req.user.level < 3) {
        upload(req, res, err => {
          if (err) return res.send("Loi uploadFileBanner: " +err);
          let {id_banner_01, id_banner_02, id_banner_03, id_banner_04, id_banner_05,
              anh_01_old, anh_02_old, anh_03_old, anh_04_old, anh_05_old,
              tieude_anh01, tieude_anh02, tieude_anh03, tieude_anh04, tieude_anh05,
              noidung_anh01, noidung_anh02, noidung_anh03, noidung_anh04, noidung_anh05,
              lienket_anh01, lienket_anh02, lienket_anh03, lienket_anh04, lienket_anh05} = req.body;
          let anhbanner_01 = req.files['anh01_upload'] ? req.files['anh01_upload'][0].filename : anh_01_old;
          let anhbanner_02 = req.files['anh02_upload'] ? req.files['anh02_upload'][0].filename : anh_02_old;
          let anhbanner_03 = req.files['anh03_upload'] ? req.files['anh03_upload'][0].filename : anh_03_old;
          let anhbanner_04 = req.files['anh04_upload'] ? req.files['anh04_upload'][0].filename : anh_04_old;
          let anhbanner_05 = req.files['anh05_upload'] ? req.files['anh05_upload'][0].filename : anh_05_old;

          let item_bander_01 = new bannerAds(id_banner_01, tieude_anh01, noidung_anh01, anhbanner_01, lienket_anh01);
          let item_bander_02 = new bannerAds(id_banner_02, tieude_anh02, noidung_anh02, anhbanner_02, lienket_anh02);
          let item_bander_03 = new bannerAds(id_banner_03, tieude_anh03, noidung_anh03, anhbanner_03, lienket_anh03);
          let item_bander_04 = new bannerAds(id_banner_04, tieude_anh04, noidung_anh04, anhbanner_04, lienket_anh04);
          let item_bander_05 = new bannerAds(id_banner_05, tieude_anh05, noidung_anh05, anhbanner_05, lienket_anh05);
          updateBannerAds(item_bander_01)
          .then(result => updateBannerAds(item_bander_02))
          .then(result => updateBannerAds(item_bander_03))
          .then(result => updateBannerAds(item_bander_04))
          .then(result => updateBannerAds(item_bander_05))
          .then(result => res.redirect('/admin/bannerads'))
          .catch(err => console.log("Loi updateBannerAds: " + err));
        })
      } else {
        res.redirect('/admin/login');
      }
    } catch (e) {
      console.log("Loi ad_update_banner: " + e);
    }
};
