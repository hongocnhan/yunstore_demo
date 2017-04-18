let {findEmailUser} = require('../model/db.js');

module.exports =  async (req, res) => {
  try {
    let {email} = req.body;
    let kq = await findEmailUser(email);
    if (kq.rowCount) {
      res.status(200).send("false");
    } else {
      res.status(200).send("true");
    }
  } catch (e) {
    console.log("Loi ajax check_new_email: " + e);
  }
};
