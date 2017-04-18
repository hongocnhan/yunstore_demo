let CryptoJS = require('crypto-js');
let Crypto = require('crypto');
let secretKey = "YunKaze_2017";

// Mã hóa
let encrypt_pass = (password) => {
  let obj = CryptoJS.AES.encrypt(password, secretKey);
  return obj.toString();
};

// Giả mã
let decrypt_pass = (encode_string) => {
  let bytes  = CryptoJS.AES.decrypt(encode_string, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

let randomValueBase64 = (len) => {
  return new Promise((resolve,reject) => {
    let key_random = Crypto.randomBytes(Math.ceil(len * 3 / 4))
                            .toString('base64')   // convert to base64 format
                            .slice(0, len)        // return required number of characters
                            .replace(/\+/g, '0')  // replace '+' with '0'
                            .replace(/\//g, '0'); // replace '/' with '0'
    resolve(key_random);
  })
};


module.exports = {encrypt_pass,decrypt_pass,randomValueBase64};
