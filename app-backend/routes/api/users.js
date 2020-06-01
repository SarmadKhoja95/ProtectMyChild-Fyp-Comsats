const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config');
const ObjectID = require("bson-objectid");
//Item model
const User = require('../../models/user');
const auth = require('../../middleware/auth');

// @route  POST api/users
//@desc  Register a new user
//@access public

router.post('/', async (req, res) => {

  const { name, email, password } = req.body;

  //Simple Validation
  if (!name || !email || !password) {
    return res.status(404).json({ msg: "Please Enter All Fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(404).json({ status: false, msg: "User Already Registered " });
    const newUser = new User({ name, email, password });
    //create salt and has
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ status: false, msg: err.message });
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(500).json({ status: false, msg: err.message });
        newUser.password = hash;
        newUser.save()
          .then((user) => {
            jwt.sign(
              { id: user.id, name: user.name, email: user.email },
              config.get("jwtSecret"),
              { expiresIn: 700000 },
              (err, token) => {
                if (err) return res.status(500).json({ status: false, msg: err.message });
                res.status(200).json({
                  status: true,
                  token: token,
                  user
                });
              }
            );
          })
          .catch(err => {
            return res.status(500).json({ status: false, msg: err.message });
          });
      });
    });
  }
  catch (e) {
    console.log(e.message);
    return res.status(500).json({ status: false, msg: e.message });
  }
});



module.exports = router;