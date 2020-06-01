const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth');


//Item model
const User = require('../../models/user');


// @route  POST api/auth
//@desc  Auth User
//@access public

router.post('/userlogin', async (req, res) => {

  const { email, password } = req.body;

  //Simple Validation
  if (!email || !password) {
    return res.status(404).json({ msg: "Please Enter All Fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ status: false, msg: "User Not Registered " });
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).json({ status: false, msg: "Invalid Credentials " });
        jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          config.get("jwtSecret"),
          { expiresIn: 700000 },
          (err, token) => {
            if (err) throw err;
            res.json({
              status: 200,
              token: token,
              user
            });
          }
        );
      })
      .catch(e => {
        return res.status(500).json({ status: false, msg: e.message });
      });
  }
  catch (e) {
    return res.status(500).json({ status: false, msg: e.message });
  }
});



module.exports = router;