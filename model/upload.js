let multer = require('multer');

let storage = multer.diskStorage(
  {

    destination(req,file,cb){
      cb(null,'./public/images');
    },
    filename(req,file,cb){
      //cb(null,'abc.png');
      cb(null, file.originalname);
    }
  }
);

function fileFilter(req,file,cb){
  if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg')
    return cb(null,true);
  cb(new Error('Khong dung dinh dang file'));
}

var limits = {
  fileSize: 1000000
}

function getUpload(fieldname){
  return multer({storage, fileFilter, limits}).single(fieldname);
}

function getArrayUpload(fieldname){
  return multer({storage, fileFilter, limits}).array(fieldname);
}

function getManyFieldnameUpload(fieldname_01,fieldname_02,fieldname_03,fieldname_04){
  return multer({storage, fileFilter, limits}).fields([
            {name: fieldname_01, maxCount: 1},
            {name: fieldname_02, maxCount: 1},
            {name: fieldname_03, maxCount: 1},
            {name: fieldname_04, maxCount: 1}
        ]);
}

function getBannerFieldnameUpload(fieldname_01,fieldname_02,fieldname_03,fieldname_04,fieldname_05){
  return multer({storage, fileFilter, limits}).fields([
            {name: fieldname_01, maxCount: 1},
            {name: fieldname_02, maxCount: 1},
            {name: fieldname_03, maxCount: 1},
            {name: fieldname_04, maxCount: 1},
            {name: fieldname_05, maxCount: 1}
        ]);
}

module.exports = { getUpload,getArrayUpload,getManyFieldnameUpload,getBannerFieldnameUpload };
