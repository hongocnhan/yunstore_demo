let fs = require('fs');
let moment = require('moment');


function getOrder_Code() {
  let p_time = new Date();
  return p_time.getTime();
}

module.exports = {getOrder_Code};
